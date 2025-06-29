import { OOPConcept } from '../types';

export const designPatterns: OOPConcept[] = [
  {
    id: 'singleton-pattern',
    title: 'Singleton Pattern',
    slug: 'singleton-pattern',
    description: 'Ensures a class has only one instance and provides a global point of access to it',
    icon: '🔒',
    sections: [
      {
        id: 'singleton-definition',
        title: 'What is Singleton Pattern?',
        content: `The **Singleton pattern** ensures a class has only one instance and provides a global point of access to it.

**When to use Singleton:**
- **Database connections**: Only one connection pool needed
- **Logging**: Single logger instance across the application
- **Configuration settings**: Global application settings
- **Caches**: Shared cache instance

**Key characteristics:**
- **Private constructor**: Prevents direct instantiation
- **Static instance**: Holds the single instance
- **Global access**: Public method to get the instance
- **Lazy initialization**: Create instance only when needed

**Benefits**: Memory efficiency, global access, controlled instantiation
**Drawbacks**: Can make testing difficult, violates Single Responsibility Principle`,
        codeExample: {
          id: 'singleton-basic',
          title: 'Basic Singleton Implementation',
          language: 'java',
          code: `// Basic Singleton Pattern Implementation
public class DatabaseConnection {
  // Static instance - holds the single instance
  private static DatabaseConnection instance;
  
  // Private constructor prevents external instantiation
  private DatabaseConnection() {
    System.out.println("Creating database connection...");
    // Initialize database connection here
  }
  
  // Public method to get the instance
  public static DatabaseConnection getInstance() {
    if (instance == null) {
      instance = new DatabaseConnection();
    }
    return instance;
  }
  
  public void connect() {
    System.out.println("Connected to database");
  }
  
  public void disconnect() {
    System.out.println("Disconnected from database");
  }
}

// Usage
public class Main {
  public static void main(String[] args) {
    // Both calls return the same instance
    DatabaseConnection db1 = DatabaseConnection.getInstance();
    DatabaseConnection db2 = DatabaseConnection.getInstance();
    
    System.out.println(db1 == db2); // true - same instance
    
    db1.connect();
    db2.disconnect(); // Same connection
  }
}`,
          explanation: 'This basic singleton ensures only one DatabaseConnection instance exists. The private constructor prevents direct instantiation, and getInstance() creates the instance only when first requested.',
          highlightLines: [4, 7, 12, 13, 14, 29, 30, 32]
        }
      },
      {
        id: 'singleton-thread-safe',
        title: 'Thread-Safe Singleton',
        content: `The basic singleton has a problem in multi-threaded environments - multiple threads could create multiple instances. Here are thread-safe implementations:

**Problems with basic singleton:**
- **Race condition**: Two threads could both check \`instance == null\` and both create instances
- **Memory visibility**: Changes might not be visible across threads

**Solutions:**
1. **Synchronized method**: Simple but performance overhead
2. **Double-checked locking**: Better performance
3. **Eager initialization**: Thread-safe by default
4. **Enum singleton**: Best practice in Java`,
        codeExample: {
          id: 'singleton-thread-safe',
          title: 'Thread-Safe Singleton Implementations',
          language: 'java',
          code: `// 1. ✅ Synchronized Method (Simple but slower)
public class Logger {
  private static Logger instance;
  
  private Logger() {}
  
  // Synchronized method - thread-safe but performance overhead
  public static synchronized Logger getInstance() {
    if (instance == null) {
      instance = new Logger();
    }
    return instance;
  }
  
  public void log(String message) {
    System.out.println("[LOG] " + message);
  }
}

// 2. ✅ Double-Checked Locking (Better performance)
public class ConfigManager {
  private static volatile ConfigManager instance;
  
  private ConfigManager() {}
  
  public static ConfigManager getInstance() {
    if (instance == null) {
      synchronized (ConfigManager.class) {
        if (instance == null) {
          instance = new ConfigManager();
        }
      }
    }
    return instance;
  }
  
  public String getConfig(String key) {
    return "Config value for " + key;
  }
}

// 3. ✅ Eager Initialization (Thread-safe by default)
public class Cache {
  // Instance created at class loading time
  private static final Cache INSTANCE = new Cache();
  
  private Cache() {}
  
  public static Cache getInstance() {
    return INSTANCE;
  }
  
  public void put(String key, Object value) {
    System.out.println("Cached: " + key);
  }
}

// 4. ✅ Enum Singleton (Best practice in Java)
public enum ApplicationSettings {
  INSTANCE;
  
  public void setSetting(String key, String value) {
    System.out.println("Setting " + key + " = " + value);
  }
  
  public String getSetting(String key) {
    return "Value for " + key;
  }
}

// Usage
ApplicationSettings.INSTANCE.setSetting("theme", "dark");`,
          explanation: 'These implementations solve thread-safety issues. Synchronized method is simple but slow, double-checked locking offers better performance, eager initialization is safe by default, and enum singleton is the recommended approach.',
          highlightLines: [7, 21, 24, 26, 27, 42, 55]
        }
      }
    ],
    quiz: [
      {
        id: 'singleton-quiz-1',
        question: 'What does the Singleton pattern ensure?',
        options: [
          'A class has multiple instances',
          'A class has only one instance',
          'A class has no instances',
          'A class can be instantiated freely'
        ],
        correctAnswer: 1,
        explanation: 'The Singleton pattern ensures a class has only one instance and provides a global point of access to it.'
      },
      {
        id: 'singleton-quiz-2',
        question: 'What is the main problem with basic singleton in multi-threaded environments?',
        options: [
          'Memory leaks',
          'Race conditions that could create multiple instances',
          'Poor performance',
          'Compilation errors'
        ],
        correctAnswer: 1,
        explanation: 'In multi-threaded environments, multiple threads could simultaneously check if instance is null and both create instances, violating the singleton principle.'
             }
     ]
   },
   {
    id: 'factory-method-pattern',
    title: 'Factory Method Pattern',
    slug: 'factory-method-pattern',
    description: 'Creates objects without specifying the exact class to create',
    icon: '🏭',
    sections: [
      {
        id: 'factory-definition',
        title: 'What is Factory Method Pattern?',
        content: `The **Factory Method pattern** creates objects without specifying the exact class to create. Instead of calling constructors directly, you call a factory method that returns the appropriate object.

**When to use Factory Method:**
- **Complex object creation**: When object creation involves complex logic
- **Multiple implementations**: When you have multiple classes implementing the same interface
- **Runtime decisions**: When the type of object depends on runtime conditions
- **Decoupling**: When you want to decouple object creation from usage

**Key components:**
- **Product interface**: Common interface for all products
- **Concrete products**: Specific implementations
- **Factory method**: Method that creates objects
- **Client code**: Uses factory method instead of constructors

**Benefits**: Loose coupling, extensibility, centralized creation logic
**Drawbacks**: Additional complexity, more classes to maintain`,
        codeExample: {
          id: 'factory-violation',
          title: 'Without Factory Pattern',
          language: 'java',
          code: `// ❌ PROBLEM: Client code tightly coupled to concrete classes
public interface Vehicle {
  void start();
  void stop();
}

public class Car implements Vehicle {
  @Override
  public void start() {
    System.out.println("Car engine started");
  }
  
  @Override
  public void stop() {
    System.out.println("Car engine stopped");
  }
}

public class Motorcycle implements Vehicle {
  @Override
  public void start() {
    System.out.println("Motorcycle engine started");
  }
  
  @Override
  public void stop() {
    System.out.println("Motorcycle engine stopped");
  }
}

// Client code is tightly coupled to concrete classes
public class TransportationService {
  public Vehicle getVehicle(String type) {
    // 😱 Client must know about all concrete classes
    if (type.equals("car")) {
      return new Car();
    } else if (type.equals("motorcycle")) {
      return new Motorcycle();
    }
    // 😱 To add new vehicle, must modify this method
    return null;
  }
}

// Usage
TransportationService service = new TransportationService();
Vehicle vehicle = service.getVehicle("car");
vehicle.start();`,
          explanation: 'Without factory pattern, client code is tightly coupled to concrete classes. Adding new vehicle types requires modifying existing code, violating the Open/Closed Principle.',
          highlightLines: [28, 31, 32, 34, 35, 37]
        }
      },
      {
        id: 'factory-solution',
        title: 'Factory Method Solution',
        content: `Let's implement the Factory Method pattern to solve the coupling problem:

**Key improvements:**
- **VehicleFactory**: Centralized object creation
- **Loose coupling**: Client doesn't know about concrete classes
- **Extensible**: Easy to add new vehicle types
- **Single responsibility**: Factory handles creation, client handles usage

Now adding new vehicles doesn't require changing existing client code!`,
        codeExample: {
          id: 'factory-solution',
          title: 'Factory Method Implementation',
          language: 'java',
          code: `// ✅ SOLUTION: Using Factory Method Pattern

// Product interface remains the same
public interface Vehicle {
  void start();
  void stop();
}

// Concrete products
public class Car implements Vehicle {
  @Override
  public void start() {
    System.out.println("Car engine started");
  }
  
  @Override
  public void stop() {
    System.out.println("Car engine stopped");
  }
}

public class Motorcycle implements Vehicle {
  @Override
  public void start() {
    System.out.println("Motorcycle engine started");
  }
  
  @Override
  public void stop() {
    System.out.println("Motorcycle engine stopped");
  }
}

// NEW: Truck can be added without modifying existing code
public class Truck implements Vehicle {
  @Override
  public void start() {
    System.out.println("Truck engine started");
  }
  
  @Override
  public void stop() {
    System.out.println("Truck engine stopped");
  }
}

// Factory class handles object creation
public class VehicleFactory {
  public static Vehicle createVehicle(String type) {
    switch (type.toLowerCase()) {
      case "car":
        return new Car();
      case "motorcycle":
        return new Motorcycle();
      case "truck":
        return new Truck(); // New vehicle added easily
      default:
        throw new IllegalArgumentException("Unknown vehicle type: " + type);
    }
  }
}

// Client code is now decoupled from concrete classes
public class TransportationService {
  public void useVehicle(String type) {
    Vehicle vehicle = VehicleFactory.createVehicle(type);
    vehicle.start();
    vehicle.stop();
  }
}

// Usage
TransportationService service = new TransportationService();
service.useVehicle("car");
service.useVehicle("motorcycle");
service.useVehicle("truck");`,
          explanation: 'Factory Method pattern decouples client code from concrete classes. The VehicleFactory handles object creation, making it easy to add new vehicle types without modifying client code.',
          highlightLines: [40, 41, 42, 46, 47, 56, 57, 58]
        }
      },
      {
        id: 'factory-advanced',
        title: 'Advanced Factory Patterns',
        content: `For more complex scenarios, consider these advanced factory patterns:

**1. Abstract Factory**: Creates families of related objects
**2. Factory Registry**: Dynamic factory selection using registration
**3. Parameterized Factory**: Factory with configuration parameters
**4. Builder Pattern**: For complex object construction

These patterns provide even more flexibility and are useful in enterprise applications.`,
        codeExample: {
          id: 'factory-advanced',
          title: 'Abstract Factory Example',
          language: 'java',
          code: `// Abstract Factory for creating families of UI components
public interface UIFactory {
  Button createButton();
  TextField createTextField();
}

public interface Button {
  void click();
}

public interface TextField {
  void setText(String text);
}

// Windows implementation family
public class WindowsFactory implements UIFactory {
  @Override
  public Button createButton() {
    return new WindowsButton();
  }
  
  @Override
  public TextField createTextField() {
    return new WindowsTextField();
  }
}

public class WindowsButton implements Button {
  @Override
  public void click() {
    System.out.println("Windows button clicked");
  }
}

public class WindowsTextField implements TextField {
  @Override
  public void setText(String text) {
    System.out.println("Windows text field: " + text);
  }
}

// Mac implementation family
public class MacFactory implements UIFactory {
  @Override
  public Button createButton() {
    return new MacButton();
  }
  
  @Override
  public TextField createTextField() {
    return new MacTextField();
  }
}

public class MacButton implements Button {
  @Override
  public void click() {
    System.out.println("Mac button clicked");
  }
}

public class MacTextField implements TextField {
  @Override
  public void setText(String text) {
    System.out.println("Mac text field: " + text);
  }
}

// Usage
public class Application {
  private UIFactory factory;
  
  public Application(UIFactory factory) {
    this.factory = factory;
  }
  
  public void createUI() {
    Button button = factory.createButton();
    TextField textField = factory.createTextField();
    
    button.click();
    textField.setText("Hello World");
  }
}

// Usage
UIFactory windowsFactory = new WindowsFactory();
Application app = new Application(windowsFactory);
app.createUI();`,
          explanation: 'Abstract Factory creates families of related objects. This example shows how to create platform-specific UI components (Windows/Mac) while keeping the client code platform-independent.',
          highlightLines: [2, 14, 38, 59, 62, 67, 69, 70]
        }
      }
    ],
    quiz: [
      {
        id: 'factory-quiz-1',
        question: 'What does the Factory Method pattern do?',
        options: [
          'Creates objects without specifying the exact class',
          'Destroys objects automatically',
          'Manages object lifecycle',
          'Provides object caching'
        ],
        correctAnswer: 0,
        explanation: 'The Factory Method pattern creates objects without specifying the exact class to create, providing flexibility and decoupling.'
      },
      {
        id: 'factory-quiz-2',
        question: 'What is the main benefit of using Factory Method pattern?',
        options: [
          'Faster object creation',
          'Reduced memory usage',
          'Loose coupling between client and concrete classes',
          'Automatic garbage collection'
        ],
        correctAnswer: 2,
        explanation: 'The main benefit is loose coupling - client code doesn\'t need to know about concrete classes, making it easier to add new types without modifying existing code.'
             }
     ]
   },
   {
    id: 'observer-pattern',
    title: 'Observer Pattern',
    slug: 'observer-pattern',
    description: 'Defines a one-to-many dependency between objects so that when one object changes state, all dependents are notified',
    icon: '👁️',
    sections: [
      {
        id: 'observer-definition',
        title: 'What is Observer Pattern?',
        content: `The **Observer pattern** defines a one-to-many dependency between objects so that when one object changes state, all dependents are notified and updated automatically.

**When to use Observer:**
- **Event systems**: GUI events, user interactions
- **Model-View architectures**: When views need to update when model changes
- **Real-time applications**: Chat apps, live feeds, notifications
- **State monitoring**: When multiple objects need to track changes

**Key components:**
- **Subject (Observable)**: The object being observed
- **Observer**: Objects that want to be notified of changes
- **Notification mechanism**: How subjects notify observers
- **Update method**: How observers handle notifications

**Benefits**: Loose coupling, dynamic relationships, broadcast communication
**Drawbacks**: Can cause memory leaks if not properly managed, notification order not guaranteed`,
        codeExample: {
          id: 'observer-basic',
          title: 'Basic Observer Implementation',
          language: 'java',
          code: `// Observer interface
public interface Observer {
  void update(String message);
}

// Subject interface
public interface Subject {
  void addObserver(Observer observer);
  void removeObserver(Observer observer);
  void notifyObservers();
}

// Concrete subject - News Agency
public class NewsAgency implements Subject {
  private List<Observer> observers = new ArrayList<>();
  private String news;
  
  @Override
  public void addObserver(Observer observer) {
    observers.add(observer);
  }
  
  @Override
  public void removeObserver(Observer observer) {
    observers.remove(observer);
  }
  
  @Override
  public void notifyObservers() {
    for (Observer observer : observers) {
      observer.update(news);
    }
  }
  
  public void setNews(String news) {
    this.news = news;
    notifyObservers(); // Notify all observers when news changes
  }
  
  public String getNews() {
    return news;
  }
}

// Concrete observers
public class NewsChannel implements Observer {
  private String name;
  
  public NewsChannel(String name) {
    this.name = name;
  }
  
  @Override
  public void update(String news) {
    System.out.println(name + " received news: " + news);
  }
}

public class MobileApp implements Observer {
  private String appName;
  
  public MobileApp(String appName) {
    this.appName = appName;
  }
  
  @Override
  public void update(String news) {
    System.out.println(appName + " app notification: " + news);
  }
}

// Usage
public class Main {
  public static void main(String[] args) {
    NewsAgency agency = new NewsAgency();
    
    // Create observers
    NewsChannel cnn = new NewsChannel("CNN");
    NewsChannel bbc = new NewsChannel("BBC");
    MobileApp newsApp = new MobileApp("NewsApp");
    
    // Subscribe observers
    agency.addObserver(cnn);
    agency.addObserver(bbc);
    agency.addObserver(newsApp);
    
    // Publish news - all observers get notified
    agency.setNews("Breaking: Important event happened!");
    
    // Remove an observer
    agency.removeObserver(bbc);
    
    // Publish again - only remaining observers get notified
    agency.setNews("Update: More details available");
  }
}`,
          explanation: 'This Observer pattern implementation shows how NewsAgency (subject) notifies multiple observers (news channels and mobile apps) when news changes. Observers can be added or removed dynamically.',
          highlightLines: [32, 33, 26, 27, 71, 72, 73, 76, 81]
        }
      },
      {
        id: 'observer-modern',
        title: 'Modern Observer Implementations',
        content: `Modern applications often use more sophisticated observer patterns:

**Modern approaches:**
- **Event-driven architecture**: Using event buses and publishers
- **Reactive programming**: RxJS, Observables, Streams
- **Property observers**: Automatic UI updates
- **Async observers**: Non-blocking notifications

**Best practices:**
- **Weak references**: Prevent memory leaks
- **Error handling**: Handle observer failures gracefully
- **Threading**: Consider thread safety
- **Filtering**: Allow observers to filter what they receive`,
        codeExample: {
          id: 'observer-modern',
          title: 'Modern Event-Driven Observer',
          language: 'java',
          code: `// Modern event-driven approach with typed events
public class EventBus {
  private Map<Class<?>, List<Object>> subscribers = new HashMap<>();
  
  public <T> void subscribe(Class<T> eventType, Consumer<T> handler) {
    subscribers.computeIfAbsent(eventType, k -> new ArrayList<>()).add(handler);
  }
  
  public <T> void publish(T event) {
    List<Object> handlers = subscribers.get(event.getClass());
    if (handlers != null) {
      for (Object handler : handlers) {
        ((Consumer<T>) handler).accept(event);
      }
    }
  }
}

// Event classes
public class UserLoginEvent {
  private String username;
  private Date timestamp;
  
  public UserLoginEvent(String username) {
    this.username = username;
    this.timestamp = new Date();
  }
  
  public String getUsername() { return username; }
  public Date getTimestamp() { return timestamp; }
}

public class OrderPlacedEvent {
  private String orderId;
  private double amount;
  
  public OrderPlacedEvent(String orderId, double amount) {
    this.orderId = orderId;
    this.amount = amount;
  }
  
  public String getOrderId() { return orderId; }
  public double getAmount() { return amount; }
}

// Observers (Event Handlers)
public class EmailService {
  public void handleUserLogin(UserLoginEvent event) {
    System.out.println("Sending welcome email to " + event.getUsername());
  }
  
  public void handleOrderPlaced(OrderPlacedEvent event) {
    System.out.println("Sending order confirmation for " + event.getOrderId());
  }
}

public class AnalyticsService {
  public void handleUserLogin(UserLoginEvent event) {
    System.out.println("Recording login analytics for " + event.getUsername());
  }
  
  public void handleOrderPlaced(OrderPlacedEvent event) {
    System.out.println("Recording sales analytics: $" + event.getAmount());
  }
}

// Usage
public class Application {
  public static void main(String[] args) {
    EventBus eventBus = new EventBus();
    EmailService emailService = new EmailService();
    AnalyticsService analytics = new AnalyticsService();
    
    // Subscribe to events
    eventBus.subscribe(UserLoginEvent.class, emailService::handleUserLogin);
    eventBus.subscribe(UserLoginEvent.class, analytics::handleUserLogin);
    eventBus.subscribe(OrderPlacedEvent.class, emailService::handleOrderPlaced);
    eventBus.subscribe(OrderPlacedEvent.class, analytics::handleOrderPlaced);
    
    // Publish events
    eventBus.publish(new UserLoginEvent("john_doe"));
    eventBus.publish(new OrderPlacedEvent("ORDER-123", 99.99));
  }
}`,
          explanation: 'This modern event-driven approach uses an EventBus with typed events and lambda expressions. Multiple services can subscribe to the same event type, and the system is type-safe and flexible.',
          highlightLines: [5, 9, 10, 11, 62, 63, 64, 65, 67, 68]
        }
      }
    ],
    quiz: [
      {
        id: 'observer-quiz-1',
        question: 'What does the Observer pattern define?',
        options: [
          'A one-to-one dependency between objects',
          'A one-to-many dependency between objects',
          'A many-to-many dependency between objects',
          'No dependency between objects'
        ],
        correctAnswer: 1,
        explanation: 'The Observer pattern defines a one-to-many dependency between objects so that when one object changes state, all dependents are notified.'
      },
      {
        id: 'observer-quiz-2',
        question: 'What is a potential drawback of the Observer pattern?',
        options: [
          'Poor performance',
          'Memory leaks if observers are not properly removed',
          'Compilation errors',
          'Limited functionality'
        ],
        correctAnswer: 1,
        explanation: 'Memory leaks can occur if observers are not properly removed from the subject, as the subject will hold references to observers preventing garbage collection.'
      }
    ]
   }
];