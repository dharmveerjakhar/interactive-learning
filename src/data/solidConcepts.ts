import { OOPConcept } from '../types';

export const solidConcepts: OOPConcept[] = [
  {
    id: 'single-responsibility',
    title: 'Single Responsibility Principle',
    slug: 'single-responsibility',
    description: 'A class should have only one reason to change - it should have only one responsibility',
    icon: '🎯',
    sections: [
      {
        id: 'srp-definition',
        title: 'What is Single Responsibility?',
        content: `The **Single Responsibility Principle (SRP)** states that a class should have only one reason to change. In other words, a class should have only one job or responsibility.

**Why is this important?**

If a class has multiple responsibilities, it increases the possibility of bugs because making changes to one responsibility could affect other unrelated responsibilities without you knowing.

**Real-world analogy**: Think of a chef in a restaurant. A chef's responsibility is to cook food. They shouldn't also be responsible for taking orders, cleaning tables, or managing finances. Each person has one clear responsibility.

**Goal**: This principle aims to separate behaviors so that if bugs arise as a result of your change, it won't affect other unrelated behaviors.`,
        codeExample: {
          id: 'srp-violation',
          title: 'SRP Violation Example',
          language: 'java',
          code: `// ❌ BAD: This class has multiple responsibilities
public class Employee {
  private String name;
  private double salary;

  public Employee(String name, double salary) {
    this.name = name;
    this.salary = salary;
}

// Responsibility 1: Employee data management
  public String getName() {
    return this.name;
}

  public void setSalary(double salary) {
    this.salary = salary;
}

// Responsibility 2: Salary calculation
  public double calculatePay() {
    return this.salary * 12; // Annual salary
}

// Responsibility 3: Database operations
  public void saveToDatabase() {
    System.out.println("Saving " + this.name + " to database...");
	// Database logic here
}

// Responsibility 4: Report generation
  public String generateReport() {
    return "Employee: " + this.name + ", Annual Salary: " + this.calculatePay();
    }
}`,
          explanation: 'This Employee class violates SRP because it handles employee data, calculates pay, saves to database, AND generates reports. If the database structure changes, or report format changes, or salary calculation logic changes - this class needs to be modified.',
          highlightLines: [14, 19, 24, 29]
        }
      },
      {
        id: 'srp-solution',
        title: 'SRP Solution: Separate Responsibilities',
        content: `Let's refactor to follow the Single Responsibility Principle by separating each responsibility into its own class:

**Key improvements:**
- **Employee class**: Only manages employee data
- **PayrollCalculator class**: Only handles salary calculations  
- **EmployeeRepository class**: Only handles database operations
- **ReportGenerator class**: Only handles report generation

Now each class has a single, well-defined responsibility and a single reason to change.`,
        codeExample: {
          id: 'srp-solution',
          title: 'SRP Compliant Solution',
          language: 'java',
          code: `// ✅ GOOD: Following SRP with separated responsibilities

// Responsibility 1: Employee data management ONLY
public class Employee {
  private String name;
  private double salary;

  public Employee(String name, double salary) {
    this.name = name;
    this.salary = salary;
  }

  public String getName() {
    return this.name;
  }

  public void setSalary(double salary) {
    this.salary = salary;
  }

  public double getSalary() {
    return this.salary;
  }
}

// Responsibility 2: Salary calculation ONLY
public class PayrollCalculator {
  public double calculateAnnualPay(Employee employee) {
        return employee.getSalary() * 12;
    }

  public double calculateMonthlyDeductions(Employee employee) {
    return employee.getSalary() * 0.2; // 20% deductions
  }
}

// Responsibility 3: Database operations ONLY
public class EmployeeRepository {
  public void save(Employee employee) {
    System.out.println("Saving " + employee.getName() + " to database...");
	// Database logic here
}

  public Employee findByName(String name) {
    System.out.println("Finding employee: " + name);
    // Database query logic here
    return null;
  }
}

// Responsibility 4: Report generation ONLY
public class ReportGenerator {
  private PayrollCalculator payrollCalculator;

  public ReportGenerator(PayrollCalculator payrollCalculator) {
    this.payrollCalculator = payrollCalculator;
  }

  public String generateEmployeeReport(Employee employee) {
        double annualPay = payrollCalculator.calculateAnnualPay(employee);
    return "Employee: " + employee.getName() + ", Annual Salary: " + annualPay;
  }
}

// Usage
Employee employee = new Employee("John Doe", 5000);
PayrollCalculator calculator = new PayrollCalculator();
EmployeeRepository repository = new EmployeeRepository();
ReportGenerator reportGenerator = new ReportGenerator(calculator);

repository.save(employee);
String report = reportGenerator.generateEmployeeReport(employee);
System.out.println(report);`,
          explanation: 'Now each class has a single responsibility. Employee manages data, PayrollCalculator handles calculations, EmployeeRepository manages database operations, and ReportGenerator creates reports. Changes to one area won\'t affect others.',
          highlightLines: [4, 26, 37, 49]
        }
      }
    ],
    quiz: [
      {
        id: 'srp-quiz-1',
        question: 'What does the Single Responsibility Principle state?',
        options: [
          'A class should have only one method',
          'A class should have only one reason to change',
          'A class should have only one property',
          'A class should have only one constructor'
        ],
        correctAnswer: 1,
        explanation: 'The Single Responsibility Principle states that a class should have only one reason to change, meaning it should have only one job or responsibility.'
      },
      {
        id: 'srp-quiz-2',
        question: 'Which of the following violates SRP?',
        options: [
          'A User class that only manages user data',
          'A Calculator class that only performs calculations',
          'A FileManager class that reads files, writes files, AND sends emails',
          'A Logger class that only writes log messages'
        ],
        correctAnswer: 2,
        explanation: 'A FileManager class that handles file operations AND email sending violates SRP because it has multiple responsibilities and multiple reasons to change.'
      }
    ]
  },
  {
    id: 'open-closed',
    title: 'Open/Closed Principle',
    slug: 'open-closed',
    description: 'Software entities should be open for extension, but closed for modification',
    icon: '🔒',
    sections: [
      {
        id: 'ocp-definition',
        title: 'What is Open/Closed Principle?',
        content: `The **Open/Closed Principle (OCP)** states that software entities (classes, modules, functions, etc.) should be **open for extension**, but **closed for modification**.

**What does this mean?**
- **Open for extension**: You should be able to add new functionality
- **Closed for modification**: You shouldn't need to change existing code

**Why is this important?**
- Prevents introducing bugs in working code
- Makes code more maintainable and flexible
- Supports the addition of new features without breaking existing ones

**How to achieve this**: Use abstractions (interfaces, abstract classes) and polymorphism to allow new implementations without changing existing code.`,
        codeExample: {
          id: 'ocp-violation',
          title: 'OCP Violation Example',
          language: 'java',
          code: `// ❌ BAD: Violates OCP - need to modify class to add new shapes
public class AreaCalculator {
  public double calculateArea(Object shape, String type) {
    if (type.equals("rectangle")) {
      Rectangle rect = (Rectangle) shape;
      return rect.width * rect.height;
    } else if (type.equals("circle")) {
      Circle circle = (Circle) shape;
      return Math.PI * circle.radius * circle.radius;
    }
    // 😱 To add triangle, we need to modify this method!
    // else if (type.equals("triangle")) {
    //   Triangle triangle = (Triangle) shape;
    //   return 0.5 * triangle.base * triangle.height;
    // }
    return 0;
  }
}

class Rectangle {
  public double width, height;
  public Rectangle(double width, double height) {
    this.width = width;
    this.height = height;
  }
}

class Circle {
  public double radius;
  public Circle(double radius) {
    this.radius = radius;
  }
}`,
          explanation: 'This violates OCP because every time we want to add a new shape, we need to modify the AreaCalculator class. This can introduce bugs and makes the code harder to maintain.',
          highlightLines: [3, 11, 12, 13, 14, 15]
        }
      },
      {
        id: 'ocp-solution',
        title: 'OCP Solution: Use Abstraction',
        content: `Let's refactor to follow the Open/Closed Principle using abstraction:

**Key improvements:**
- **Shape interface**: Defines a contract for all shapes
- **Polymorphism**: Each shape knows how to calculate its own area
- **Extensible**: New shapes can be added without modifying existing code
- **Calculator simplified**: No need for type checking or modifications

Now we can add new shapes without touching the AreaCalculator!`,
        codeExample: {
          id: 'ocp-solution',
          title: 'OCP Compliant Solution',
          language: 'java',
          code: `// ✅ GOOD: Following OCP with abstraction

// Shape interface - abstraction
public interface Shape {
  double calculateArea();
}

// Existing shapes implement the interface
public class Rectangle implements Shape {
  private double width, height;

  public Rectangle(double width, double height) {
    this.width = width;
    this.height = height;
  }

  @Override
  public double calculateArea() {
    return width * height;
  }
}

public class Circle implements Shape {
  private double radius;

  public Circle(double radius) {
    this.radius = radius;
  }

  @Override
  public double calculateArea() {
    return Math.PI * radius * radius;
  }
}

// ✨ NEW: Triangle added without modifying existing code!
public class Triangle implements Shape {
  private double base, height;

  public Triangle(double base, double height) {
    this.base = base;
    this.height = height;
  }

  @Override
  public double calculateArea() {
    return 0.5 * base * height;
  }
}

// Calculator is now closed for modification, open for extension
public class AreaCalculator {
  public double calculateArea(Shape shape) {
    return shape.calculateArea(); // Polymorphism in action!
  }

  public double calculateTotalArea(Shape[] shapes) {
    double total = 0;
    for (Shape shape : shapes) {
      total += shape.calculateArea();
    }
    return total;
  }
}

// Usage - works with any shape!
Shape[] shapes = {
  new Rectangle(5, 10),
  new Circle(3),
  new Triangle(4, 6)  // New shape works without any changes!
};

AreaCalculator calculator = new AreaCalculator();
System.out.println("Total area: " + calculator.calculateTotalArea(shapes));`,
          explanation: 'Now we can add new shapes (like Triangle) without modifying the AreaCalculator. Each shape knows how to calculate its own area, and the calculator just calls the method polymorphically.',
          highlightLines: [4, 17, 28, 34, 42, 51, 52]
        }
      }
    ],
    quiz: [
      {
        id: 'ocp-quiz-1',
        question: 'What does the Open/Closed Principle state?',
        options: [
          'Classes should be open for modification',
          'Classes should be closed for extension',
          'Classes should be open for extension, but closed for modification',
          'Classes should be both open and closed'
        ],
        correctAnswer: 2,
        explanation: 'The Open/Closed Principle states that software entities should be open for extension, but closed for modification.'
      },
      {
        id: 'ocp-quiz-2',
        question: 'How can you achieve the Open/Closed Principle?',
        options: [
          'By using if-else statements for different types',
          'By using abstractions and polymorphism',
          'By modifying existing classes for new features',
          'By making all methods static'
        ],
        correctAnswer: 1,
        explanation: 'The Open/Closed Principle is achieved by using abstractions (interfaces, abstract classes) and polymorphism to allow extension without modification.'
             }
     ]
   },
   {
    id: 'liskov-substitution',
    title: 'Liskov Substitution Principle',
    slug: 'liskov-substitution',
    description: 'Objects of a superclass should be replaceable with objects of its subclasses without breaking the application',
    icon: '🔄',
    sections: [
      {
        id: 'lsp-definition',
        title: 'What is Liskov Substitution Principle?',
        content: `The **Liskov Substitution Principle (LSP)** states that objects of a superclass should be replaceable with objects of its subclasses without breaking the application.

**In simple terms**: If you have a function that works with a parent class, it should also work correctly with any of its child classes.

**Key requirements:**
- **Behavioral compatibility**: Subclasses must behave in a way that doesn't surprise users of the parent class
- **Contract preservation**: Subclasses shouldn't strengthen preconditions or weaken postconditions
- **No broken promises**: If parent promises certain behavior, child must fulfill it

**Real-world analogy**: If you can drive any car (parent class), you should be able to drive a sports car or SUV (child classes) without learning completely different controls.`,
        codeExample: {
          id: 'lsp-violation',
          title: 'LSP Violation Example',
          language: 'java',
          code: `// ❌ BAD: Violates LSP - Penguin can't fly but extends Bird
public class Bird {
  public void fly() {
    System.out.println("Bird is flying");
  }

  public void makeSound() {
    System.out.println("Bird makes a sound");
  }
}

public class Sparrow extends Bird {
  @Override
  public void fly() {
    System.out.println("Sparrow flying fast!");
  }

  @Override
  public void makeSound() {
    System.out.println("Chirp chirp!");
  }
}

public class Penguin extends Bird {
  @Override
  public void fly() {
    // 😱 Problem: Penguins can't fly!
    throw new UnsupportedOperationException("Penguins can't fly!");
  }

  @Override
  public void makeSound() {
    System.out.println("Penguin sound!");
  }
}

// This function expects all birds to be able to fly
public class BirdTest {
  public static void makeBirdFly(Bird bird) {
    bird.fly(); // ❌ Will crash if bird is a Penguin!
  }

  public static void main(String[] args) {
    Bird sparrow = new Sparrow();
    Bird penguin = new Penguin();

    makeBirdFly(sparrow); // ✅ Works fine
    makeBirdFly(penguin); // 💥 Throws exception - violates LSP!
  }
}`,
          explanation: 'This violates LSP because Penguin cannot be substituted for Bird without breaking the application. The makeBirdFly function expects all birds to fly, but Penguin throws an exception.',
          highlightLines: [23, 25, 26, 37, 44]
        }
      },
      {
        id: 'lsp-solution',
        title: 'LSP Solution: Proper Inheritance Hierarchy',
        content: `Let's refactor to follow the Liskov Substitution Principle by creating a better inheritance hierarchy:

**Key improvements:**
- **Separate concerns**: Flying and non-flying birds are different
- **Common interface**: All birds can make sounds
- **Proper substitution**: FlyingBirds can substitute Bird, and non-flying birds have their own hierarchy
- **No broken contracts**: Each subclass can properly fulfill the parent's contract`,
        codeExample: {
          id: 'lsp-solution',
          title: 'LSP Compliant Solution',
          language: 'java',
          code: `// ✅ GOOD: Following LSP with proper hierarchy

// Base class with common behavior
public abstract class Bird {
  public abstract void makeSound();

  public void eat() {
    System.out.println("Bird is eating");
  }
}

// Flying birds have flying capability
public abstract class FlyingBird extends Bird {
  public abstract void fly();
}

// Water birds have swimming capability
public abstract class WaterBird extends Bird {
  public abstract void swim();
}

// Specific flying birds
public class Sparrow extends FlyingBird {
  @Override
  public void fly() {
    System.out.println("Sparrow flying fast!");
  }

  @Override
  public void makeSound() {
    System.out.println("Chirp chirp!");
  }
}

public class Eagle extends FlyingBird {
  @Override
  public void fly() {
    System.out.println("Eagle soaring high!");
  }

  @Override
  public void makeSound() {
    System.out.println("Eagle cry!");
  }
}

// Specific water birds
public class Penguin extends WaterBird {
  @Override
  public void swim() {
    System.out.println("Penguin swimming gracefully!");
  }

  @Override
  public void makeSound() {
    System.out.println("Penguin sound!");
  }
}

// Now we can have specific functions for specific capabilities
public class BirdTest {
  public static void makeFlyingBirdFly(FlyingBird bird) {
    bird.fly(); // Only accepts FlyingBird and its subclasses
}

  public static void makeBirdSound(Bird bird) {
    bird.makeSound(); // Accepts any Bird
}

  public static void main(String[] args) {
    Sparrow sparrow = new Sparrow();
    Eagle eagle = new Eagle();
    Penguin penguin = new Penguin();

    makeFlyingBirdFly(sparrow); // ✅ Works
    makeFlyingBirdFly(eagle);   // ✅ Works
    // makeFlyingBirdFly(penguin); // Won't compile - penguin is not a FlyingBird

    makeBirdSound(sparrow); // ✅ Works
    makeBirdSound(eagle);   // ✅ Works
    makeBirdSound(penguin); // ✅ Works
  }
}`,
          explanation: 'Now each subclass can properly substitute its parent. FlyingBirds can always fly, WaterBirds can swim, and all Birds can make sounds. No broken contracts!',
          highlightLines: [13, 17, 55, 59, 67, 68, 69]
        }
      }
    ],
    quiz: [
      {
        id: 'lsp-quiz-1',
        question: 'What does the Liskov Substitution Principle state?',
        options: [
          'Subclasses should be replaceable with their parent classes',
          'Objects of a superclass should be replaceable with objects of its subclasses',
          'Classes should never be substituted',
          'Only concrete classes can be substituted'
        ],
        correctAnswer: 1,
        explanation: 'The Liskov Substitution Principle states that objects of a superclass should be replaceable with objects of its subclasses without breaking the application.'
      },
      {
        id: 'lsp-quiz-2',
        question: 'Which violates the Liskov Substitution Principle?',
        options: [
          'A Square class that properly implements Rectangle behavior',
          'A Dog class that overrides Animal.makeSound() to bark',
          'A ReadOnlyList that throws exceptions on write operations inherited from List',
          'A SportsCar that extends Car and adds turbo functionality'
        ],
        correctAnswer: 2,
        explanation: 'A ReadOnlyList that throws exceptions on inherited write operations violates LSP because it cannot be substituted for a List without breaking the application.'
             }
     ]
   },
   {
    id: 'interface-segregation',
    title: 'Interface Segregation Principle',
    slug: 'interface-segregation',
    description: 'Clients should not be forced to depend on methods they do not use',
    icon: '🔗',
    sections: [
      {
        id: 'isp-definition',
        title: 'What is Interface Segregation Principle?',
        content: `The **Interface Segregation Principle (ISP)** states that clients should not be forced to depend on methods they do not use.

**In simple terms**: Create smaller, more specific interfaces rather than large, monolithic ones.

**Key benefits:**
- **Reduced coupling**: Classes only depend on methods they actually use
- **Easier maintenance**: Changes to unused methods don't affect clients
- **Better flexibility**: Implementations can focus on specific capabilities
- **Cleaner code**: No empty or dummy implementations

**Real-world analogy**: A TV remote has many buttons, but you don't need to know about volume controls when you only want to change channels. Similarly, interfaces should be focused on specific needs.`,
        codeExample: {
          id: 'isp-violation',
          title: 'ISP Violation Example',
          language: 'java',
          code: `// ❌ BAD: Violates ISP - fat interface forces unnecessary dependencies
public interface WorkerInterface {
  void work();
  void eat();
  void sleep();
  void attendMeeting();
  void writeCode();
  void manageTeam();
  void designSystem();
}

// Robot worker doesn't need eat, sleep, attend meetings
public class RobotWorker implements WorkerInterface {
  @Override
  public void work() {
    System.out.println("Robot is working");
  }

  @Override
  public void eat() {
    // 😱 Robots don't eat! Forced to implement anyway
    throw new UnsupportedOperationException("Robots don't eat!");
  }

  @Override
  public void sleep() {
    // 😱 Robots don't sleep! Forced to implement anyway
    throw new UnsupportedOperationException("Robots don't sleep!");
  }

  @Override
  public void attendMeeting() {
    // 😱 Robots don't attend meetings! Forced to implement anyway
    throw new UnsupportedOperationException("Robots don't attend meetings!");
  }

  @Override
  public void writeCode() {
    System.out.println("Robot writing code");
  }

  @Override
  public void manageTeam() {
    // 😱 Robots don't manage teams! Forced to implement anyway
    throw new UnsupportedOperationException("Robots don't manage teams!");
  }

  @Override
  public void designSystem() {
    System.out.println("Robot designing system");
  }
}`,
          explanation: 'This violates ISP because RobotWorker is forced to implement methods it doesn\'t need (eat, sleep, attendMeeting, manageTeam), leading to dummy implementations that throw exceptions.',
          highlightLines: [19, 20, 21, 24, 25, 26, 29, 30, 31, 39, 40, 41]
        }
      },
      {
        id: 'isp-solution',
        title: 'ISP Solution: Segregated Interfaces',
        content: `Let's refactor to follow the Interface Segregation Principle by creating smaller, focused interfaces:

**Key improvements:**
- **Separate interfaces**: Each interface focuses on one capability
- **Implement only what's needed**: Classes only implement relevant interfaces
- **Composition over inheritance**: Combine interfaces as needed
- **No unused methods**: No class is forced to implement methods it doesn't use`,
        codeExample: {
          id: 'isp-solution',
          title: 'ISP Compliant Solution',
          language: 'java',
          code: `// ✅ GOOD: Segregated interfaces following ISP

// Separate interfaces for different capabilities
public interface Workable {
  void work();
}

public interface Eatable {
  void eat();
}

public interface Sleepable {
  void sleep();
}

public interface Meetable {
  void attendMeeting();
}

public interface Codeable {
  void writeCode();
}

public interface Manageable {
  void manageTeam();
}

public interface Designable {
  void designSystem();
}

// Robot only implements interfaces it needs
public class RobotWorker implements Workable, Codeable, Designable {
  @Override
  public void work() {
    System.out.println("Robot is working");
  }

  @Override
  public void writeCode() {
    System.out.println("Robot writing code");
  }

  @Override
  public void designSystem() {
    System.out.println("Robot designing system");
  }
}

// Human worker implements all interfaces
public class HumanWorker implements Workable, Eatable, Sleepable, Meetable, Codeable {
  @Override
  public void work() {
    System.out.println("Human is working");
  }

  @Override
  public void eat() {
    System.out.println("Human is eating");
  }

  @Override
  public void sleep() {
    System.out.println("Human is sleeping");
  }

  @Override
  public void attendMeeting() {
    System.out.println("Human attending meeting");
  }

  @Override
  public void writeCode() {
    System.out.println("Human writing code");
  }
}

// Manager implements management-specific interfaces
public class Manager implements Workable, Eatable, Sleepable, Meetable, Manageable {
  @Override
  public void work() {
    System.out.println("Manager is working");
  }

  @Override
  public void eat() {
    System.out.println("Manager is eating");
  }

  @Override
  public void sleep() {
    System.out.println("Manager is sleeping");
  }

  @Override
  public void attendMeeting() {
    System.out.println("Manager attending meeting");
  }

  @Override
  public void manageTeam() {
    System.out.println("Manager managing team");
  }
}

// Usage functions can work with specific interfaces
public class WorkManager {
  public void manageWork(Workable worker) {
    worker.work();
  }

  public void organizeMeeting(Meetable participant) {
    participant.attendMeeting();
  }

  public void assignCoding(Codeable coder) {
    coder.writeCode();
  }
}`,
          explanation: 'Now each class only implements the methods it actually needs. RobotWorker only handles work/code/design, HumanWorker handles personal needs + coding, and Manager handles leadership tasks.',
          highlightLines: [30, 46, 69, 94, 95, 99, 103]
        }
      }
    ],
    quiz: [
      {
        id: 'isp-quiz-1',
        question: 'What does the Interface Segregation Principle state?',
        options: [
          'Interfaces should be as large as possible',
          'Clients should not be forced to depend on methods they do not use',
          'All methods should be in one interface',
          'Interfaces should never be separated'
        ],
        correctAnswer: 1,
        explanation: 'The Interface Segregation Principle states that clients should not be forced to depend on methods they do not use.'
      },
      {
        id: 'isp-quiz-2',
        question: 'Which approach follows the Interface Segregation Principle?',
        options: [
          'Creating one large interface with all possible methods',
          'Creating smaller, focused interfaces for specific capabilities',
          'Avoiding interfaces altogether',
          'Making all methods optional with default implementations'
        ],
        correctAnswer: 1,
        explanation: 'ISP is followed by creating smaller, focused interfaces that group related methods together, allowing classes to implement only what they need.'
             }
     ]
    },
    {
    id: 'dependency-inversion',
    title: 'Dependency Inversion Principle',
    slug: 'dependency-inversion',
    description: 'High-level modules should not depend on low-level modules. Both should depend on abstractions',
    icon: '🔄',
    sections: [
      {
        id: 'dip-definition',
        title: 'What is Dependency Inversion Principle?',
        content: `The **Dependency Inversion Principle (DIP)** states that:
1. **High-level modules should not depend on low-level modules**. Both should depend on abstractions.
2. **Abstractions should not depend on details**. Details should depend on abstractions.

**What does this mean?**
- **High-level modules**: Classes that implement business logic
- **Low-level modules**: Classes that handle specific details (database, file system, external APIs)
- **Abstractions**: Interfaces or abstract classes that define contracts

**Why is this important?**
- **Loose coupling**: Changes in implementation details don't affect business logic
- **Testability**: Easy to mock dependencies for testing
- **Flexibility**: Can swap implementations without changing high-level code

**Real-world analogy**: A light switch (high-level) doesn't need to know about the specific wiring or bulb type (low-level). It just knows there's an interface to turn lights on/off.`,
        codeExample: {
          id: 'dip-violation',
          title: 'DIP Violation Example',
          language: 'java',
          code: `// ❌ BAD: Violates DIP - high-level class depends on low-level classes
public class EmailService {
  public void sendEmail(String message) {
    System.out.println("Sending email: " + message);
	// Email sending logic
  }
}

public class SMSService {
  public void sendSMS(String message) {
    System.out.println("Sending SMS: " + message);
	// SMS sending logic
}
}

// High-level class depends directly on low-level classes
public class NotificationManager {
  private EmailService emailService;
  private SMSService smsService;

  public NotificationManager() {
    // 😱 Tightly coupled to concrete implementations!
    this.emailService = new EmailService();
    this.smsService = new SMSService();
  }

  public void sendNotification(String message, String type) {
    if (type.equals("email")) {
      this.emailService.sendEmail(message);
    } else if (type.equals("sms")) {
      this.smsService.sendSMS(message);
    }
    // 😱 To add push notifications, we need to modify this class!
  }
}

    // Usage
NotificationManager manager = new NotificationManager();
manager.sendNotification("Hello!", "email");`,
          explanation: 'This violates DIP because NotificationManager (high-level) directly depends on EmailService and SMSService (low-level). Adding new notification types requires modifying the high-level class.',
          highlightLines: [17, 18, 22, 23, 32]
        }
      },
      {
        id: 'dip-solution',
        title: 'DIP Solution: Depend on Abstractions',
        content: `Let's refactor to follow the Dependency Inversion Principle by introducing abstractions:

**Key improvements:**
- **Interface abstraction**: Define a common interface for all notification services
- **Dependency injection**: Inject dependencies rather than creating them internally
- **Loose coupling**: High-level class depends only on the interface, not concrete implementations
- **Easy extension**: New notification types can be added without modifying existing code`,
        codeExample: {
          id: 'dip-solution',
          title: 'DIP Compliant Solution',
          language: 'java',
          code: `// ✅ GOOD: Following DIP with abstractions and dependency injection

// Abstraction - interface that all notification services must implement
public interface NotificationService {
  void send(String message);
}

// Low-level modules implementing the abstraction
public class EmailService implements NotificationService {
  @Override
  public void send(String message) {
    System.out.println("Sending email: " + message);
	// Email sending logic
  }
}

public class SMSService implements NotificationService {
  @Override
  public void send(String message) {
    System.out.println("Sending SMS: " + message);
	// SMS sending logic
  }
}

// NEW: Adding push notifications without modifying existing code!
public class PushNotificationService implements NotificationService {
  @Override
  public void send(String message) {
    System.out.println("Sending push notification: " + message);
	// Push notification logic
}
}

// High-level module now depends on abstraction, not concrete classes
public class NotificationManager {
  private Map<String, NotificationService> services = new HashMap<>();

    // Dependency injection - inject services from outside
  public void addService(String type, NotificationService service) {
    this.services.put(type, service);
  }

  public void sendNotification(String message, String type) {
    NotificationService service = this.services.get(type);
    if (service != null) {
      service.send(message); // ✅ Uses abstraction
        } else {
      System.out.println("No service registered for type: " + type);
        }
    }

    // Send to multiple channels
  public void broadcast(String message, List<String> types) {
    for (String type : types) {
            sendNotification(message, type);
        }
    }
}

    // Usage with dependency injection
public class Main {
  public static void main(String[] args) {
    NotificationManager notificationManager = new NotificationManager();

    // Inject dependencies (could come from configuration, dependency container, etc.)
    notificationManager.addService("email", new EmailService());
    notificationManager.addService("sms", new SMSService());
    notificationManager.addService("push", new PushNotificationService());

    // Usage
    notificationManager.sendNotification("Hello!", "email");
    notificationManager.sendNotification("Urgent alert!", "sms");
    notificationManager.broadcast("System maintenance tonight", 
        Arrays.asList("email", "push"));
  }
}`,
          explanation: 'Now NotificationManager depends only on the NotificationService abstraction. We can add new notification types without modifying the high-level class. Dependencies are injected from outside.',
          highlightLines: [4, 34, 37, 43, 59, 60, 61]
        }
      }
    ],
    quiz: [
      {
        id: 'dip-quiz-1',
        question: 'What does the Dependency Inversion Principle state?',
        options: [
          'Low-level modules should depend on high-level modules',
          'High-level modules should not depend on low-level modules; both should depend on abstractions',
          'All dependencies should be inverted',
          'Dependencies should never be used'
        ],
        correctAnswer: 1,
        explanation: 'The Dependency Inversion Principle states that high-level modules should not depend on low-level modules. Both should depend on abstractions.'
      },
      {
        id: 'dip-quiz-2',
        question: 'What is the main benefit of the Dependency Inversion Principle?',
        options: [
          'Faster code execution',
          'Reduced memory usage',
          'Loose coupling and easier testing/mocking',
          'Shorter code files'
        ],
        correctAnswer: 2,
        explanation: 'The main benefit of DIP is loose coupling between classes, which makes code more flexible, easier to test (you can inject mocks), and easier to maintain.'
      }
    ]
  }
];