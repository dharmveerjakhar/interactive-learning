import { OOPConcept } from '../types';

export const oopConcepts: OOPConcept[] = [
  {
    id: 'abstraction',
    title: 'Abstraction',
    slug: 'abstraction',
    description: 'Understanding the essence of objects by hiding complex details',
    icon: '🎯',
    sections: [
      {
        id: 'abstraction-definition',
        title: 'What is Abstraction?',
        content: `**Abstraction** is the process of hiding the complex implementation details and showing only the essential features of an object.

**Key benefits:**
- **Reduces complexity**: Focus on what an object does, not how it does it
- **Increases modularity**: Changes to implementation don't affect users
- **Improves maintainability**: Easier to modify and extend code
- **Enables polymorphism**: Different implementations of the same interface

**Two types of abstraction:**
1. **Data abstraction**: Hiding internal data representation
2. **Control abstraction**: Hiding implementation details of operations

**Real-world example**: When you drive a car, you use the steering wheel, pedals, and gear shift without knowing how the engine, transmission, or brakes work internally.`,
        codeExample: {
          id: 'abstraction-example',
          title: 'Abstraction with Abstract Classes',
          language: 'java',
          code: `// Abstract class defines the interface but hides implementation details
public abstract class Vehicle {
  protected String brand;
  protected int year;
  
  public Vehicle(String brand, int year) {
    this.brand = brand;
    this.year = year;
  }
  
  // Abstract method - must be implemented by subclasses
  public abstract void start();
  public abstract void stop();
  public abstract double calculateFuelEfficiency();
  
  // Concrete method - shared implementation
  public void displayInfo() {
    System.out.println(year + " " + brand);
  }
  
  // Protected method - available to subclasses
  protected void performMaintenance() {
    System.out.println("Performing routine maintenance");
  }
}

// Concrete implementation - hides specific details
public class Car extends Vehicle {
  private boolean isElectric;
  
  public Car(String brand, int year, boolean isElectric) {
    super(brand, year);
    this.isElectric = isElectric;
  }
  
  @Override
  public void start() {
    if (isElectric) {
      System.out.println(brand + " car starting silently (electric)");
    } else {
      System.out.println(brand + " car engine starting");
    }
  }
  
  @Override
  public void stop() {
    System.out.println(brand + " car stopping");
  }
  
  @Override
  public double calculateFuelEfficiency() {
    return isElectric ? 120.0 : 30.0; // MPG equivalent
  }
}

// Usage - client code doesn't need to know implementation details
public class VehicleManager {
  public void operateVehicle(Vehicle vehicle) {
    vehicle.displayInfo();
    vehicle.start();
    System.out.println("Fuel efficiency: " + vehicle.calculateFuelEfficiency() + " MPG");
    vehicle.stop();
  }
}`,
          explanation: 'This example shows abstraction through an abstract Vehicle class. The complex implementation details of how different cars start, stop, and calculate efficiency are hidden behind a common interface.',
          highlightLines: [1, 12, 13, 14, 24, 33, 52, 53, 54]
        }
      }
    ],
    quiz: [
      {
        id: 'abstraction-quiz-1',
        question: 'What is abstraction in OOP?',
        options: [
          'Hiding complex implementation details',
          'Creating multiple instances',
          'Inheriting from other classes',
          'Making all methods public'
        ],
        correctAnswer: 0,
        explanation: 'Abstraction is the process of hiding the complex implementation details and showing only the essential features of an object.'
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
        id: 'encapsulation-definition',
        title: 'What is Encapsulation?',
        content: 'Encapsulation is the bundling of data and methods that operate on that data within a single unit, while controlling access to the internal state.',
        codeExample: {
          id: 'encapsulation-example',
          title: 'Encapsulation Example',
          language: 'java',
          code: `// Example will be added back later
public class BankAccount {
  private double balance;
  
  public double getBalance() {
            return balance;
    }

  public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
    }
  }
}`,
          explanation: 'This is a placeholder example.',
          highlightLines: [1, 2]
        }
      }
    ],
    quiz: [
      {
        id: 'encapsulation-quiz-1',
        question: 'What is encapsulation in OOP?',
        options: [
          'Bundling data and methods together while controlling access',
          'Creating multiple classes',
          'Inheriting from parent classes',
          'Making all variables public'
        ],
        correctAnswer: 0,
        explanation: 'Encapsulation is the bundling of data and methods that operate on that data within a single unit, while controlling access to the internal state.'
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
        id: 'inheritance-definition',
        title: 'What is Inheritance?',
        content: 'Inheritance is a mechanism that allows a class to inherit properties and methods from another class.',
        codeExample: {
          id: 'inheritance-example',
          title: 'Inheritance Example',
          language: 'java',
          code: `// Example will be added back later
public class Vehicle {
  protected String brand;
  
  public void start() {
    System.out.println("Vehicle is starting");
  }
}

public class Car extends Vehicle {
  public void honk() {
    System.out.println("Car is honking");
  }
}`,
          explanation: 'This is a placeholder example.',
          highlightLines: [1, 2]
        }
      }
    ],
    quiz: [
      {
        id: 'inheritance-quiz-1',
        question: 'What is inheritance in OOP?',
        options: [
          'A mechanism to inherit properties and methods from another class',
          'A way to hide implementation details',
          'A method to create multiple instances',
          'A technique to bundle data and methods'
        ],
        correctAnswer: 0,
        explanation: 'Inheritance is a mechanism that allows a class to inherit properties and methods from another class.'
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
        id: 'polymorphism-definition',
        title: 'What is Polymorphism?',
        content: 'Polymorphism allows objects of different types to be treated as instances of the same type through a common interface.',
        codeExample: {
          id: 'polymorphism-example',
          title: 'Polymorphism Example',
          language: 'java',
          code: `// Example will be added back later
public class Animal {
  public void makeSound() {
    System.out.println("Animal makes a sound");
  }
}

public class Dog extends Animal {
  public void makeSound() {
    System.out.println("Woof!");
  }
}

public class Cat extends Animal {
  public void makeSound() {
    System.out.println("Meow!");
  }
}`,
          explanation: 'This is a placeholder example.',
          highlightLines: [1, 2]
        }
      }
    ],
    quiz: [
      {
        id: 'polymorphism-quiz-1',
        question: 'What is polymorphism in OOP?',
        options: [
          'Objects can take many forms and behave differently',
          'Classes can only have one form',
          'Methods cannot be overridden',
          'Objects are always of the same type'
        ],
        correctAnswer: 0,
        explanation: 'Polymorphism allows objects of different types to be treated as instances of the same type through a common interface.'
      }
    ]
  }
];