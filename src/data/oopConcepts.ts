import { OOPConcept } from '../types';

export const oopConcepts: OOPConcept[] = [
  {
    id: 'classes-objects',
    title: 'Classes & Objects',
    slug: 'classes-objects',
    description: 'Learn the fundamental building blocks of OOP - Classes as blueprints and Objects as instances',
    icon: '🏗️',
    sections: [
      {
        id: 'intro',
        title: 'What are Classes and Objects?',
        content: `A class is like a blueprint or template that defines the structure and behavior of objects. An object is a specific instance created from that class blueprint.

Think of it like this: A class is like an architectural blueprint for a house, while objects are the actual houses built from that blueprint. Each house (object) has the same structure defined by the blueprint (class), but can have different property values like color, size, or location.`,
        visualType: 'interactive',
      },
      {
        id: 'class-structure',
        title: 'Class Structure',
        content: `A class typically contains:
- **Properties (Attributes)**: Data that describes the object
- **Methods (Functions)**: Actions that the object can perform
- **Constructor**: Special method that initializes new objects`,
        codeExample: {
          id: 'class-example',
          title: 'Basic Class Definition',
          language: 'javascript',
          code: `class Car {
  // Properties
  constructor(brand, model, year) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.isRunning = false;
  }
  
  // Methods
  start() {
    this.isRunning = true;
    console.log(\`The \${this.brand} \${this.model} is now running.\`);
  }
  
  stop() {
    this.isRunning = false;
    console.log(\`The \${this.brand} \${this.model} has stopped.\`);
  }
  
  getInfo() {
    return \`\${this.year} \${this.brand} \${this.model}\`;
  }
}`,
          explanation: 'This Car class defines properties (brand, model, year, isRunning) and methods (start, stop, getInfo) that all car objects will have.',
          highlightLines: [3, 4, 5, 6, 11, 16, 21]
        }
      },
      {
        id: 'creating-objects',
        title: 'Creating Objects',
        content: 'Once you have a class defined, you can create multiple objects (instances) from it. Each object has its own set of property values.',
        codeExample: {
          id: 'object-creation',
          title: 'Creating and Using Objects',
          language: 'javascript',
          code: `// Creating objects from the Car class
const myCar = new Car('Toyota', 'Camry', 2022);
const friendsCar = new Car('Honda', 'Civic', 2021);

// Using object methods
myCar.start();  // Output: The Toyota Camry is now running.
friendsCar.start();  // Output: The Honda Civic is now running.

// Accessing object properties
console.log(myCar.brand);  // Output: Toyota
console.log(friendsCar.getInfo());  // Output: 2021 Honda Civic

// Objects are independent
myCar.stop();  // Only affects myCar
console.log(myCar.isRunning);  // false
console.log(friendsCar.isRunning);  // true (still running)`,
          explanation: 'Each object (myCar and friendsCar) is an independent instance with its own property values and state.',
          highlightLines: [2, 3, 6, 7, 10, 11]
        }
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What is the relationship between a class and an object?',
        options: [
          'A class is an instance of an object',
          'An object is a blueprint for a class',
          'A class is a blueprint and an object is an instance of that class',
          'There is no relationship between classes and objects'
        ],
        correctAnswer: 2,
        explanation: 'A class serves as a blueprint or template that defines the structure and behavior, while an object is a specific instance created from that class.'
      },
      {
        id: 'q2',
        question: 'In the Car class example, which of the following is a method?',
        options: [
          'brand',
          'model',
          'year',
          'start()'
        ],
        correctAnswer: 3,
        explanation: 'start() is a method because it\'s a function defined within the class that performs an action. brand, model, and year are properties.'
      },
      {
        id: 'q3',
        question: 'What happens when you create two objects from the same class?',
        options: [
          'They share the same property values',
          'They are completely independent with their own property values',
          'The second object overwrites the first one',
          'You cannot create two objects from the same class'
        ],
        correctAnswer: 1,
        explanation: 'Each object created from a class is independent and has its own set of property values, even though they share the same structure defined by the class.'
      }
    ]
  },
  {
    id: 'encapsulation',
    title: 'Encapsulation',
    slug: 'encapsulation',
    description: 'Understand how to bundle data and methods together while controlling access',
    icon: '🔒',
    sections: [
      {
        id: 'intro',
        title: 'What is Encapsulation?',
        content: `Encapsulation is one of the fundamental principles of object-oriented programming. It's the practice of bundling data (properties) and methods that operate on that data within a single unit (class), while restricting direct access to some of the object's components.

Think of encapsulation like a **medicine capsule**. The medicine (data) is contained within the capsule (class), and you can only access it through the intended way - by taking the whole capsule. You can't directly touch the medicine inside.

**Key Benefits:**
- **Data Protection**: Prevents unauthorized access and modification
- **Controlled Access**: Provides a controlled interface to interact with data
- **Maintainability**: Changes to internal implementation don't affect external code
- **Data Validation**: Can validate data before setting values`,
        visualType: 'interactive',
      },
      {
        id: 'access-modifiers',
        title: 'Access Modifiers',
        content: `Access modifiers control the visibility and accessibility of class members:

- **Public**: Accessible from anywhere (default in JavaScript)
- **Private**: Only accessible within the same class (using # in modern JS or _ convention)
- **Protected**: Accessible within the class and its subclasses

These modifiers help implement the principle of "information hiding" - exposing only what's necessary and keeping implementation details private.`,
        codeExample: {
          id: 'access-modifiers-example',
          title: 'Access Modifiers in JavaScript',
          language: 'javascript',
          code: `class BankAccount {
  // Public property
  accountNumber;
  
  // Private properties (using # for true privacy)
  #balance = 0;
  #pin = '';
  
  constructor(accountNumber, initialBalance, pin) {
    this.accountNumber = accountNumber;
    this.#balance = initialBalance;
    this.#pin = pin;
  }
  
  // Public method - controlled access to private data
  getBalance(enteredPin) {
    if (this.#validatePin(enteredPin)) {
      return this.#balance;
    }
    throw new Error('Invalid PIN');
  }
  
  // Public method with validation
  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      return \`Deposited $\${amount}. New balance: $\${this.#balance}\`;
    }
    throw new Error('Deposit amount must be positive');
  }
  
  // Private method - internal implementation
  #validatePin(enteredPin) {
    return enteredPin === this.#pin;
  }
}`,
          explanation: 'Private fields (#balance, #pin) can only be accessed within the class, while public methods provide controlled access to this data.',
          highlightLines: [5, 6, 11, 12, 13, 30]
        }
      },
      {
        id: 'getters-setters',
        title: 'Getters and Setters',
        content: `Getters and setters are special methods that provide controlled access to private properties. They allow you to:

- **Validate data** before setting values
- **Compute values** dynamically when getting
- **Log access** for debugging or analytics
- **Transform data** when reading or writing

This creates a clean interface while maintaining control over how data is accessed and modified.`,
        codeExample: {
          id: 'getters-setters-example',
          title: 'Using Getters and Setters',
          language: 'javascript',
          code: `class Temperature {
  #celsius = 0;
  
  constructor(celsius = 0) {
    this.celsius = celsius; // Uses the setter
  }
  
  // Getter for celsius
  get celsius() {
    return this.#celsius;
  }
  
  // Setter for celsius with validation
  set celsius(value) {
    if (typeof value !== 'number') {
      throw new Error('Temperature must be a number');
    }
    if (value < -273.15) {
      throw new Error('Temperature cannot be below absolute zero');
    }
    this.#celsius = value;
  }
  
  // Getter for fahrenheit (computed property)
  get fahrenheit() {
    return (this.#celsius * 9/5) + 32;
  }
  
  // Setter for fahrenheit (converts to celsius)
  set fahrenheit(value) {
    this.celsius = (value - 32) * 5/9; // Uses celsius setter
  }
  
  toString() {
    return \`\${this.celsius}°C (\${this.fahrenheit.toFixed(1)}°F)\`;
  }
}

// Usage
const temp = new Temperature(25);
console.log(temp.celsius);    // 25
console.log(temp.fahrenheit); // 77
temp.fahrenheit = 100;        // Converts and sets celsius
console.log(temp.celsius);    // 37.8`,
          explanation: 'Getters and setters provide a clean interface while validating data and performing conversions automatically.',
          highlightLines: [9, 10, 11, 15, 16, 17, 18, 19, 20, 21, 25, 26, 27, 31, 32, 33]
        }
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What is the primary purpose of encapsulation?',
        options: [
          'To make code run faster',
          'To bundle data and methods together while controlling access',
          'To create multiple objects from a class',
          'To inherit properties from parent classes'
        ],
        correctAnswer: 1,
        explanation: 'Encapsulation bundles data and methods together in a class while providing controlled access through public interfaces, protecting internal implementation details.'
      },
      {
        id: 'q2',
        question: 'In the BankAccount example, why is the balance field private?',
        options: [
          'To save memory',
          'To improve performance',
          'To prevent unauthorized direct access and ensure validation',
          'To make the code shorter'
        ],
        correctAnswer: 2,
        explanation: 'The balance is private to prevent direct access that could bypass validation rules, ensuring all balance changes go through controlled methods like deposit() and withdraw().'
      },
      {
        id: 'q3',
        question: 'What advantage do getters and setters provide over direct property access?',
        options: [
          'They are faster to execute',
          'They allow validation, computation, and controlled access',
          'They use less memory',
          'They make properties private automatically'
        ],
        correctAnswer: 1,
        explanation: 'Getters and setters allow you to add validation logic, perform computations, log access, and maintain control over how properties are read and written while providing a clean interface.'
      }
    ]
  },
  {
    id: 'inheritance',
    title: 'Inheritance',
    slug: 'inheritance',
    description: 'Learn how classes can inherit properties and methods from other classes',
    icon: '🧬',
    sections: [
      {
        id: 'intro',
        title: 'What is Inheritance?',
        content: `Inheritance is a fundamental principle of object-oriented programming that allows a new class (child/subclass) to inherit properties and methods from an existing class (parent/superclass).

Think of inheritance like a **family tree**. Children inherit traits from their parents - eye color, height, talents - but they can also have their own unique characteristics. Similarly, in programming, a child class inherits features from its parent class but can add its own specific features.

**Key Benefits:**
- **Code Reusability**: Avoid duplicating code by inheriting common functionality
- **Hierarchical Organization**: Create logical relationships between classes
- **Extensibility**: Add new features to existing classes without modifying them
- **Polymorphism**: Use child objects where parent objects are expected

**Key Terms:**
- **Parent Class (Superclass)**: The class being inherited from
- **Child Class (Subclass)**: The class that inherits from another class
- **"extends" keyword**: Used to create inheritance relationships`,
        visualType: 'interactive',
      },
      {
        id: 'basic-inheritance',
        title: 'Basic Inheritance',
        content: `The simplest form of inheritance involves creating a child class that extends a parent class. The child class automatically gets all public properties and methods from the parent class.

The **extends** keyword is used to establish the inheritance relationship, and **super()** is used to call the parent class constructor.`,
        codeExample: {
          id: 'basic-inheritance-example',
          title: 'Basic Inheritance Example',
          language: 'javascript',
          code: `// Parent class (Superclass)
class Animal {
  constructor(name, species) {
    this.name = name;
    this.species = species;
    this.isAlive = true;
  }
  
  // Method available to all animals
  makeSound() {
    console.log(\`\${this.name} makes a sound\`);
  }
  
  eat(food) {
    console.log(\`\${this.name} is eating \${food}\`);
  }
  
  sleep() {
    console.log(\`\${this.name} is sleeping\`);
  }
}

// Child class (Subclass) extending Animal
class Dog extends Animal {
  constructor(name, breed) {
    super(name, 'Canine'); // Call parent constructor
    this.breed = breed;
    this.isLoyal = true;
  }
  
  // Override parent method
  makeSound() {
    console.log(\`\${this.name} barks: Woof! Woof!\`);
  }
  
  // New method specific to Dog
  wagTail() {
    console.log(\`\${this.name} is wagging its tail happily!\`);
  }
  
  fetch(item) {
    console.log(\`\${this.name} is fetching the \${item}\`);
  }
}

// Usage
const myDog = new Dog('Buddy', 'Golden Retriever');
myDog.makeSound(); // "Buddy barks: Woof! Woof!" (overridden)
myDog.eat('kibble'); // "Buddy is eating kibble" (inherited)
myDog.wagTail(); // "Buddy is wagging its tail happily!" (dog-specific)`,
          explanation: 'Dog inherits from Animal, getting all Animal properties and methods, while adding its own specific features and overriding some behaviors.',
          highlightLines: [24, 26, 31, 32, 37, 38, 47, 48, 49]
        }
      },
      {
        id: 'method-overriding',
        title: 'Method Overriding and Super',
        content: `Method overriding allows child classes to provide their own implementation of methods inherited from the parent class. The **super** keyword can be used to:

- **super()**: Call the parent constructor
- **super.methodName()**: Call a parent method from within an overridden method

This allows you to extend or completely replace parent functionality while still having access to the original implementation when needed.`,
        codeExample: {
          id: 'method-overriding-example',
          title: 'Method Overriding with Super',
          language: 'javascript',
          code: `class Vehicle {
  constructor(brand, year) {
    this.brand = brand;
    this.year = year;
    this.mileage = 0;
  }
  
  start() {
    console.log(\`\${this.brand} is starting...\`);
  }
  
  getInfo() {
    return \`\${this.year} \${this.brand} with \${this.mileage} miles\`;
  }
}

class ElectricCar extends Vehicle {
  constructor(brand, year, batteryCapacity) {
    super(brand, year); // Call parent constructor
    this.batteryCapacity = batteryCapacity;
    this.batteryLevel = 100;
  }
  
  // Override start method but use parent functionality
  start() {
    if (this.batteryLevel > 0) {
      super.start(); // Call parent start method
      console.log('Electric motor is humming quietly...');
    } else {
      console.log('Battery is dead. Cannot start.');
    }
  }
  
  // Override getInfo to include battery information
  getInfo() {
    const basicInfo = super.getInfo(); // Get parent info
    return \`\${basicInfo}, Battery: \${this.batteryLevel}%\`;
  }
  
  // New method specific to electric cars
  charge() {
    this.batteryLevel = 100;
    console.log(\`\${this.brand} is fully charged!\`);
  }
}

// Usage
const tesla = new ElectricCar('Tesla Model S', 2023, 100);
tesla.start(); // Uses overridden method with super call
console.log(tesla.getInfo()); // Uses overridden method with super call
tesla.charge(); // Electric car specific method`,
          explanation: 'ElectricCar overrides start() and getInfo() methods while using super to call parent functionality, combining inherited behavior with new features.',
          highlightLines: [18, 19, 25, 26, 27, 35, 36, 40, 41, 42]
        }
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What is the main purpose of inheritance in OOP?',
        options: [
          'To make programs run faster',
          'To allow classes to inherit properties and methods from other classes for code reusability',
          'To hide data from other classes',
          'To create multiple instances of the same class'
        ],
        correctAnswer: 1,
        explanation: 'Inheritance allows new classes to inherit properties and methods from existing classes, promoting code reusability and creating logical hierarchical relationships between classes.'
      },
      {
        id: 'q2',
        question: 'In the Dog example, what does super(name, "Canine") do?',
        options: [
          'Creates a new Animal object',
          'Calls the parent class (Animal) constructor with the provided arguments',
          'Overrides the Animal constructor',
          'Deletes the parent class'
        ],
        correctAnswer: 1,
        explanation: 'super(name, "Canine") calls the parent class (Animal) constructor, passing "name" and "Canine" as arguments to properly initialize the inherited properties.'
      },
      {
        id: 'q3',
        question: 'What happens when a child class overrides a parent method?',
        options: [
          'The parent method is deleted permanently',
          'Both methods run simultaneously',
          'The child class method replaces the parent method for that class',
          'An error occurs'
        ],
        correctAnswer: 2,
        explanation: 'When a child class overrides a parent method, the child\'s version is used when called on child class instances, while the parent method remains unchanged for parent class instances.'
      }
    ]
  },
  {
    id: 'polymorphism',
    title: 'Polymorphism',
    slug: 'polymorphism',
    description: 'Discover how objects can take many forms and behave differently',
    icon: '🎭',
    sections: [
      {
        id: 'intro',
        title: 'What is Polymorphism?',
        content: `Polymorphism comes from Greek words meaning "many forms." It's the ability of objects of different classes to be treated as objects of a common base class, while still maintaining their own specific behavior.

Think of polymorphism like **actors playing different roles**. Different actors can play the same character (like Sherlock Holmes), but each brings their own interpretation and style to the role. Similarly, different objects can implement the same method, but each provides its own specific behavior.

**Real-world analogy**: 
A **remote control** is a great example. Whether you're controlling a TV, air conditioner, or stereo, you press the "power" button. The same action (pressing power) produces different results depending on the device - that's polymorphism!

**Key Benefits:**
- **Flexibility**: Write code that works with multiple types of objects
- **Extensibility**: Add new types without changing existing code
- **Maintainability**: Reduce code duplication and complexity
- **Interface Consistency**: Same method names for related operations

**Types of Polymorphism:**
- **Method Overriding**: Child classes provide different implementations of parent methods
- **Interface Implementation**: Different classes implement the same interface differently`,
        visualType: 'interactive',
      },
      {
        id: 'method-polymorphism',
        title: 'Method Overriding Polymorphism',
        content: `The most common form of polymorphism occurs when child classes override parent class methods. Each child class can provide its own specific implementation of the same method.

This allows you to write code that works with the parent class type, but automatically calls the appropriate child class method at runtime.`,
        codeExample: {
          id: 'method-polymorphism-example',
          title: 'Polymorphism Through Method Overriding',
          language: 'javascript',
          code: `// Base class
class Shape {
  constructor(name) {
    this.name = name;
  }
  
  // This method will be overridden by child classes
  calculateArea() {
    throw new Error('calculateArea must be implemented by subclass');
  }
  
  // This method will be overridden by child classes
  draw() {
    console.log(\`Drawing a \${this.name}\`);
  }
  
  // Common method used by all shapes
  getInfo() {
    return \`\${this.name} with area: \${this.calculateArea()}\`;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super('Rectangle');
    this.width = width;
    this.height = height;
  }
  
  calculateArea() {
    return this.width * this.height;
  }
  
  draw() {
    console.log(\`Drawing a \${this.width}x\${this.height} rectangle\`);
  }
}

class Circle extends Shape {
  constructor(radius) {
    super('Circle');
    this.radius = radius;
  }
  
  calculateArea() {
    return Math.PI * this.radius * this.radius;
  }
  
  draw() {
    console.log(\`Drawing a circle with radius \${this.radius}\`);
  }
}

// Polymorphism in action!
function processShapes(shapes) {
  shapes.forEach(shape => {
    // Same method calls, different behaviors
    shape.draw();           // Calls the appropriate draw method
    console.log(shape.getInfo()); // Uses the appropriate calculateArea
    console.log('---');
  });
}

// Usage - treating different objects the same way
const shapes = [
  new Rectangle(5, 3),
  new Circle(4),
  new Rectangle(2, 8)
];

processShapes(shapes); // Each shape behaves differently!`,
          explanation: 'Each shape class overrides calculateArea() and draw() methods, but they can all be treated as Shape objects. The correct method is called based on the actual object type.',
          highlightLines: [8, 9, 10, 13, 14, 15, 28, 29, 30, 33, 34, 35, 42, 43, 44, 47, 48, 49, 54, 55, 56, 57, 58]
        }
      },
      {
        id: 'interface-polymorphism',
        title: 'Interface-based Polymorphism',
        content: `Another powerful form of polymorphism involves different classes implementing the same interface or contract. This allows completely different objects to be used interchangeably as long as they provide the same methods.

While JavaScript doesn't have formal interfaces like some languages, we can achieve this by ensuring different classes implement the same method signatures.`,
        codeExample: {
          id: 'interface-polymorphism-example',
          title: 'Interface-based Polymorphism',
          language: 'javascript',
          code: `// Different classes implementing the same "Playable" interface

class MusicPlayer {
  constructor(songs) {
    this.songs = songs;
    this.currentSong = 0;
  }
  
  play() {
    console.log(\`♪ Playing: \${this.songs[this.currentSong]}\`);
  }
  
  pause() {
    console.log('⏸ Music paused');
  }
  
  stop() {
    console.log('⏹ Music stopped');
    this.currentSong = 0;
  }
}

class VideoPlayer {
  constructor(videos) {
    this.videos = videos;
    this.currentVideo = 0;
  }
  
  play() {
    console.log(\`📺 Playing video: \${this.videos[this.currentVideo]}\`);
  }
  
  pause() {
    console.log('⏸ Video paused');
  }
  
  stop() {
    console.log('⏹ Video stopped');
    this.currentVideo = 0;
  }
}

class GameConsole {
  constructor(games) {
    this.games = games;
    this.currentGame = 0;
  }
  
  play() {
    console.log(\`🎮 Starting game: \${this.games[this.currentGame]}\`);
  }
  
  pause() {
    console.log('⏸ Game paused');
  }
  
  stop() {
    console.log('⏹ Game stopped');
    this.currentGame = 0;
  }
}

// Universal remote control using polymorphism
class UniversalRemote {
  constructor() {
    this.devices = [];
  }
  
  addDevice(device) {
    this.devices.push(device);
  }
  
  playAll() {
    console.log('🔘 Playing all devices:');
    this.devices.forEach((device, index) => {
      console.log(\`Device \${index + 1}:\`);
      device.play(); // Polymorphic call - each device behaves differently
    });
  }
  
  pauseAll() {
    console.log('⏸ Pausing all devices:');
    this.devices.forEach(device => {
      device.pause(); // Same method name, different behavior
    });
  }
}

// Usage
const remote = new UniversalRemote();
remote.addDevice(new MusicPlayer(['Song A', 'Song B']));
remote.addDevice(new VideoPlayer(['Movie 1', 'Movie 2']));
remote.addDevice(new GameConsole(['Game X', 'Game Y']));

remote.playAll();  // Each device plays differently
remote.pauseAll(); // Each device pauses differently`,
          explanation: 'Different device types (MusicPlayer, VideoPlayer, GameConsole) all implement the same methods (play, pause, stop), allowing the UniversalRemote to control them uniformly despite their different behaviors.',
          highlightLines: [8, 9, 12, 13, 16, 17, 28, 29, 32, 33, 36, 37, 46, 47, 50, 51, 54, 55, 70, 71, 72, 73, 74, 75, 77, 78, 79, 80, 81]
        }
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What is polymorphism in object-oriented programming?',
        options: [
          'Creating multiple copies of the same object',
          'The ability of objects of different classes to be treated as objects of a common type while maintaining their specific behavior',
          'Hiding implementation details from other classes',
          'Inheriting properties from a parent class'
        ],
        correctAnswer: 1,
        explanation: 'Polymorphism allows different objects to be treated uniformly through a common interface while each maintains its own specific behavior implementation.'
      },
      {
        id: 'q2',
        question: 'In the Shape example, how does polymorphism work?',
        options: [
          'All shapes calculate area the same way',
          'Each shape class overrides the calculateArea method with its own implementation, but they can all be treated as Shape objects',
          'Only Rectangle objects can calculate area',
          'Polymorphism is not used in the Shape example'
        ],
        correctAnswer: 1,
        explanation: 'Each shape (Rectangle, Circle) provides its own calculateArea implementation, but they can all be stored in a shapes array and processed uniformly, with the correct method being called for each object type.'
      },
      {
        id: 'q3',
        question: 'What advantage does the UniversalRemote example demonstrate?',
        options: [
          'It can only control one type of device',
          'It shows how different classes implementing the same interface can be controlled uniformly',
          'It proves that polymorphism makes code slower',
          'It demonstrates that all devices must be identical'
        ],
        correctAnswer: 1,
        explanation: 'The UniversalRemote can control different device types (music player, video player, game console) through the same interface (play, pause, stop methods), demonstrating how polymorphism enables flexible, extensible design.'
      }
    ]
  }
]; 