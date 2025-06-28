import { OOPConcept } from '../types';

export const designPatterns: OOPConcept[] = [
  {
    id: 'singleton-pattern',
    title: 'Singleton Pattern',
    slug: 'singleton-pattern',
    description: 'Ensures a class has only one instance and provides global access to that instance',
    icon: '👑',
    sections: [
      {
        id: 'singleton-definition',
        title: 'What is the Singleton Pattern?',
        content: `The **Singleton Pattern** is a creational design pattern that ensures a class has only one instance and provides a global point of access to that instance.

**Key Characteristics:**
- Only one instance of the class can exist
- Global access point to that instance
- Lazy or eager initialization options
- Thread-safe implementation considerations

**When to Use Singleton:**
- Database connections
- Logging services
- Configuration settings
- Caching mechanisms
- Hardware interface access (printers, etc.)

**Real-world analogy**: Think of a country's president. There can only be one president at a time, and everyone in the country knows who the current president is. Similarly, a Singleton ensures only one instance exists and everyone can access it.

**Benefits:**
- Controlled access to sole instance
- Reduced memory footprint
- Global access point
- Lazy initialization possible

**Drawbacks:**
- Can be difficult to test
- Violates Single Responsibility Principle
- Can create tight coupling
- Threading issues in multi-threaded environments`,
        codeExample: {
          id: 'singleton-basic',
          title: 'Basic Singleton Implementation',
          language: 'javascript',
          code: `// ❌ WRONG: Without Singleton, multiple instances can be created
class DatabaseConnection {
  constructor() {
    this.host = 'localhost';
    this.port = 5432;
    console.log('Creating new database connection...');
  }
  
  connect() {
    console.log(\`Connecting to \${this.host}:\${this.port}\`);
  }
}

// Problem: Multiple instances created
const db1 = new DatabaseConnection(); // "Creating new database connection..."
const db2 = new DatabaseConnection(); // "Creating new database connection..."
const db3 = new DatabaseConnection(); // "Creating new database connection..."

console.log(db1 === db2); // false - Different instances!

// ✅ CORRECT: Singleton ensures only one instance
class DatabaseConnectionSingleton {
  constructor() {
    // Prevent direct construction
    if (DatabaseConnectionSingleton.instance) {
      return DatabaseConnectionSingleton.instance;
    }
    
    this.host = 'localhost';
    this.port = 5432;
    console.log('Creating database connection singleton...');
    
    // Store the instance
    DatabaseConnectionSingleton.instance = this;
    return this;
  }
  
  connect() {
    console.log(\`Connecting to \${this.host}:\${this.port}\`);
  }
  
  // Static method to get instance
  static getInstance() {
    if (!DatabaseConnectionSingleton.instance) {
      DatabaseConnectionSingleton.instance = new DatabaseConnectionSingleton();
    }
    return DatabaseConnectionSingleton.instance;
  }
}

// Usage: Only one instance created
const dbSingleton1 = new DatabaseConnectionSingleton(); // "Creating database connection singleton..."
const dbSingleton2 = new DatabaseConnectionSingleton(); // No new instance created
const dbSingleton3 = DatabaseConnectionSingleton.getInstance(); // Same instance

console.log(dbSingleton1 === dbSingleton2); // true - Same instance!
console.log(dbSingleton2 === dbSingleton3); // true - Same instance!`,
          explanation: 'The Singleton pattern prevents multiple instances by storing a reference to the single instance and returning it when requested, rather than creating new instances.',
          highlightLines: [17, 24, 30, 35, 45]
        }
      },
      {
        id: 'singleton-advanced',
        title: 'Advanced Singleton Implementations',
        content: `Let's explore different ways to implement the Singleton pattern, each with their own trade-offs:

**1. Lazy Initialization**: Instance created only when first needed
**2. Eager Initialization**: Instance created immediately when class is loaded
**3. Thread-Safe**: Handles concurrent access safely
**4. Modern ES6+**: Using modules and closures

**Implementation Considerations:**
- **Memory usage**: Lazy vs eager initialization
- **Thread safety**: Important in multi-threaded environments
- **Performance**: Static vs instance method access
- **Testing**: Dependency injection for better testability`,
        codeExample: {
          id: 'singleton-advanced-implementations',
          title: 'Various Singleton Implementations',
          language: 'javascript',
          code: `// 1. ✅ Lazy Initialization Singleton
class LazyLogger {
  constructor() {
    if (LazyLogger.instance) {
      return LazyLogger.instance;
    }
    
    this.logs = [];
    console.log('Logger initialized lazily');
    LazyLogger.instance = this;
  }
  
  static getInstance() {
    if (!LazyLogger.instance) {
      LazyLogger.instance = new LazyLogger();
    }
    return LazyLogger.instance;
  }
  
  log(message) {
    this.logs.push({ message, timestamp: new Date() });
    console.log(\`[LOG] \${message}\`);
  }
}

// 2. ✅ Eager Initialization Singleton
class EagerConfigManager {
  static instance = new EagerConfigManager();
  
  constructor() {
    if (EagerConfigManager.instance) {
      return EagerConfigManager.instance;
    }
    
    this.config = {
      apiUrl: 'https://api.example.com',
      timeout: 5000,
      retries: 3
    };
    console.log('Config manager initialized eagerly');
  }
  
  static getInstance() {
    return EagerConfigManager.instance;
  }
  
  getConfig(key) {
    return this.config[key];
  }
  
  setConfig(key, value) {
    this.config[key] = value;
  }
}

// 3. ✅ Module-based Singleton (Modern approach)
const createCacheManager = () => {
  let instance;
  let cache = new Map();
  
  return {
    getInstance() {
      if (!instance) {
        instance = {
          set(key, value, ttl = 3600000) { // 1 hour default TTL
            const expiry = Date.now() + ttl;
            cache.set(key, { value, expiry });
            console.log(\`Cached: \${key}\`);
          },
          
          get(key) {
            const item = cache.get(key);
            if (!item) return null;
            
            if (Date.now() > item.expiry) {
              cache.delete(key);
              return null;
            }
            
            return item.value;
          },
          
          clear() {
            cache.clear();
            console.log('Cache cleared');
          },
          
          size() {
            return cache.size;
          }
        };
        console.log('Cache manager created');
      }
      return instance;
    }
  };
};

const CacheManager = createCacheManager();

// 4. ✅ Class with private constructor (TypeScript-style)
class ConnectionPool {
  static #instance = null;
  #connections = [];
  #maxConnections = 10;
  
  constructor() {
    if (ConnectionPool.#instance) {
      return ConnectionPool.#instance;
    }
    
    // Initialize connection pool
    for (let i = 0; i < this.#maxConnections; i++) {
      this.#connections.push({
        id: i,
        inUse: false,
        created: new Date()
      });
    }
    
    ConnectionPool.#instance = this;
    console.log(\`Connection pool created with \${this.#maxConnections} connections\`);
  }
  
  static getInstance() {
    if (!ConnectionPool.#instance) {
      ConnectionPool.#instance = new ConnectionPool();
    }
    return ConnectionPool.#instance;
  }
  
  getConnection() {
    const available = this.#connections.find(conn => !conn.inUse);
    if (available) {
      available.inUse = true;
      console.log(\`Acquired connection \${available.id}\`);
      return available;
    }
    throw new Error('No connections available');
  }
  
  releaseConnection(connection) {
    connection.inUse = false;
    console.log(\`Released connection \${connection.id}\`);
  }
}

// Usage examples
const logger1 = LazyLogger.getInstance();
const logger2 = LazyLogger.getInstance();
console.log(logger1 === logger2); // true

const config1 = EagerConfigManager.getInstance();
const config2 = EagerConfigManager.getInstance();
console.log(config1 === config2); // true

const cache1 = CacheManager.getInstance();
const cache2 = CacheManager.getInstance();
console.log(cache1 === cache2); // true

const pool1 = ConnectionPool.getInstance();
const pool2 = ConnectionPool.getInstance();
console.log(pool1 === pool2); // true`,
          explanation: 'Different Singleton implementations serve different needs: lazy for memory efficiency, eager for thread safety, module-based for modern JavaScript, and private constructor for better encapsulation.',
          highlightLines: [14, 26, 52, 76, 86]
        }
      },
      {
        id: 'singleton-real-world',
        title: 'Real-World Singleton Examples',
        content: `Let's implement practical Singleton examples that you might encounter in real applications:

**Common Real-World Use Cases:**
1. **Application Settings**: Global configuration management
2. **Event Bus**: Central event handling system
3. **API Client**: Shared HTTP client with connection pooling
4. **Analytics Tracker**: Single point for tracking events

**Best Practices:**
- Use dependency injection for better testability
- Consider using modules instead of classes for simpler singletons
- Be careful with global state
- Ensure thread safety in multi-threaded environments
- Provide clear initialization and cleanup methods`,
        codeExample: {
          id: 'singleton-real-world-examples',
          title: 'Practical Singleton Examples',
          language: 'javascript',
          code: `// 1. ✅ Application Settings Manager
class AppSettings {
  static instance = null;
  
  constructor() {
    if (AppSettings.instance) {
      return AppSettings.instance;
    }
    
    this.settings = new Map();
    this.listeners = new Set();
    this.loadDefaultSettings();
    AppSettings.instance = this;
  }
  
  static getInstance() {
    if (!AppSettings.instance) {
      AppSettings.instance = new AppSettings();
    }
    return AppSettings.instance;
  }
  
  loadDefaultSettings() {
    this.settings.set('theme', 'light');
    this.settings.set('language', 'en');
    this.settings.set('notifications', true);
    this.settings.set('autoSave', true);
  }
  
  get(key) {
    return this.settings.get(key);
  }
  
  set(key, value) {
    const oldValue = this.settings.get(key);
    this.settings.set(key, value);
    
    // Notify listeners of change
    this.notifyListeners(key, value, oldValue);
  }
  
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener); // Return unsubscribe function
  }
  
  notifyListeners(key, newValue, oldValue) {
    this.listeners.forEach(listener => {
      listener({ key, newValue, oldValue });
    });
  }
}

// 2. ✅ Event Bus for Global Communication
class EventBus {
  static instance = null;
  
  constructor() {
    if (EventBus.instance) {
      return EventBus.instance;
    }
    
    this.events = new Map();
    EventBus.instance = this;
  }
  
  static getInstance() {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }
  
  on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(callback);
  }
  
  off(event, callback) {
    if (this.events.has(event)) {
      this.events.get(event).delete(callback);
    }
  }
  
  emit(event, data) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(\`Error in event handler for \${event}:\`, error);
        }
      });
    }
  }
  
  clear() {
    this.events.clear();
  }
}

// 3. ✅ API Client with Connection Management
class APIClient {
  static instance = null;
  
  constructor() {
    if (APIClient.instance) {
      return APIClient.instance;
    }
    
    this.baseURL = 'https://api.example.com';
    this.timeout = 10000;
    this.headers = {
      'Content-Type': 'application/json'
    };
    this.requestInterceptors = [];
    this.responseInterceptors = [];
    
    APIClient.instance = this;
  }
  
  static getInstance() {
    if (!APIClient.instance) {
      APIClient.instance = new APIClient();
    }
    return APIClient.instance;
  }
  
  setAuthToken(token) {
    this.headers['Authorization'] = \`Bearer \${token}\`;
  }
  
  addRequestInterceptor(interceptor) {
    this.requestInterceptors.push(interceptor);
  }
  
  addResponseInterceptor(interceptor) {
    this.responseInterceptors.push(interceptor);
  }
  
  async request(method, endpoint, data = null) {
    let config = {
      method,
      headers: { ...this.headers },
      timeout: this.timeout
    };
    
    if (data) {
      config.body = JSON.stringify(data);
    }
    
    // Apply request interceptors
    config = this.requestInterceptors.reduce((config, interceptor) => {
      return interceptor(config);
    }, config);
    
    try {
      let response = await fetch(\`\${this.baseURL}\${endpoint}\`, config);
      
      // Apply response interceptors
      response = this.responseInterceptors.reduce((response, interceptor) => {
        return interceptor(response);
      }, response);
      
      return response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }
  
  get(endpoint) { return this.request('GET', endpoint); }
  post(endpoint, data) { return this.request('POST', endpoint, data); }
  put(endpoint, data) { return this.request('PUT', endpoint, data); }
  delete(endpoint) { return this.request('DELETE', endpoint); }
}

// Usage Examples
const settings = AppSettings.getInstance();
settings.set('theme', 'dark');

// Subscribe to setting changes
const unsubscribe = settings.subscribe(({ key, newValue, oldValue }) => {
  console.log(\`Setting \${key} changed from \${oldValue} to \${newValue}\`);
});

const eventBus = EventBus.getInstance();
eventBus.on('user-login', (user) => {
  console.log(\`User logged in: \${user.name}\`);
});

const api = APIClient.getInstance();
api.setAuthToken('your-token-here');

// All instances are the same
console.log(AppSettings.getInstance() === settings); // true
console.log(EventBus.getInstance() === eventBus); // true
console.log(APIClient.getInstance() === api); // true`,
          explanation: 'These real-world examples show how Singletons manage global state, provide centralized services, and ensure consistent behavior across an application.',
          highlightLines: [14, 57, 100, 148, 165]
        }
      }
    ],
    quiz: [
      {
        id: 'singleton-quiz-1',
        question: 'What is the main purpose of the Singleton pattern?',
        options: [
          'To create multiple instances of a class efficiently',
          'To ensure a class has only one instance and provide global access to it',
          'To improve the performance of object creation',
          'To implement inheritance between classes'
        ],
        correctAnswer: 1,
        explanation: 'The Singleton pattern ensures that a class has only one instance and provides a global point of access to that instance.'
      },
      {
        id: 'singleton-quiz-2',
        question: 'Which of the following is NOT a good use case for the Singleton pattern?',
        options: [
          'Database connection manager',
          'Application configuration settings',
          'User profile objects in a social media app',
          'Logging service'
        ],
        correctAnswer: 2,
        explanation: 'User profile objects should NOT be singletons because each user should have their own profile instance. Singletons are for services that should have only one instance globally.'
      },
      {
        id: 'singleton-quiz-3',
        question: 'What is a potential drawback of the Singleton pattern?',
        options: [
          'It uses too much memory',
          'It makes the code run slower',
          'It can make unit testing difficult and create tight coupling',
          'It prevents inheritance'
        ],
        correctAnswer: 2,
        explanation: 'Singletons can make unit testing difficult because they maintain global state, and they can create tight coupling between classes that depend on the singleton instance.'
      }
    ]
  }
]; 