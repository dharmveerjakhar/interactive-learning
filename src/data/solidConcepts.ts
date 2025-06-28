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
          language: 'javascript',
          code: `// ❌ BAD: This class has multiple responsibilities
class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }
  
  // Responsibility 1: Employee data management
  getName() {
    return this.name;
  }
  
  setSalary(salary) {
    this.salary = salary;
  }
  
  // Responsibility 2: Salary calculation
  calculatePay() {
    return this.salary * 12; // Annual salary
  }
  
  // Responsibility 3: Database operations
  saveToDatabase() {
    console.log(\`Saving \${this.name} to database...\`);
    // Database logic here
  }
  
  // Responsibility 4: Report generation
  generateReport() {
    return \`Employee: \${this.name}, Annual Salary: $\${this.calculatePay()}\`;
  }
}`,
          explanation: 'This Employee class violates SRP because it handles employee data, calculates pay, saves to database, AND generates reports. If the database structure changes, or report format changes, or salary calculation logic changes - this class needs to be modified.',
          highlightLines: [14, 19, 24]
        }
      },
      {
        id: 'srp-solution',
        title: 'SRP Solution: Separate Responsibilities',
        content: `Let's refactor the previous example to follow the Single Responsibility Principle by separating each responsibility into its own class:

**Benefits of this approach:**
- Each class has a single, clear purpose
- Changes to one responsibility don't affect others
- Code is more maintainable and testable
- Classes are easier to understand and reuse`,
        codeExample: {
          id: 'srp-solution',
          title: 'SRP Compliant Solution',
          language: 'javascript',
          code: `// ✅ GOOD: Each class has a single responsibility

// Responsibility 1: Employee data management
class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }
  
  getName() {
    return this.name;
  }
  
  setSalary(salary) {
    this.salary = salary;
  }
  
  getSalary() {
    return this.salary;
  }
}

// Responsibility 2: Salary calculations
class PayrollCalculator {
  calculateAnnualPay(employee) {
    return employee.getSalary() * 12;
  }
  
  calculateMonthlyDeductions(employee) {
    return employee.getSalary() * 0.1; // 10% deductions
  }
}

// Responsibility 3: Database operations
class EmployeeRepository {
  save(employee) {
    console.log(\`Saving \${employee.getName()} to database...\`);
    // Database logic here
  }
  
  findByName(name) {
    console.log(\`Finding employee: \${name}\`);
    // Database query logic
  }
}

// Responsibility 4: Report generation
class EmployeeReportGenerator {
  generatePayrollReport(employee, payrollCalculator) {
    const annualPay = payrollCalculator.calculateAnnualPay(employee);
    return \`Employee: \${employee.getName()}, Annual Salary: $\${annualPay}\`;
  }
}`,
          explanation: 'Now each class has a single responsibility. Employee manages data, PayrollCalculator handles calculations, EmployeeRepository manages database operations, and EmployeeReportGenerator creates reports.',
          highlightLines: [3, 23, 35, 46]
        }
      },
      {
        id: 'srp-benefits',
        title: 'Benefits and Best Practices',
        content: `**Key Benefits of Single Responsibility Principle:**

1. **Maintainability**: Changes to one feature don't break unrelated features
2. **Testability**: Smaller classes with single purposes are easier to test
3. **Reusability**: Classes with focused responsibilities can be reused in different contexts
4. **Readability**: Code intent is clearer when classes have single purposes

**How to identify SRP violations:**
- Look for classes with multiple reasons to change
- Check for classes doing multiple unrelated tasks
- Watch for classes with many public methods serving different purposes
- Notice if class names contain "and" or "or" (like "UserAndPayment")

**Best Practices:**
- Keep classes small and focused
- Use descriptive names that reflect the single responsibility
- If you can't describe a class purpose in one sentence, it might be doing too much
- Regular refactoring to maintain single responsibilities`,
        codeExample: {
          id: 'srp-practice',
          title: 'Real-world Example: Online Shopping',
          language: 'javascript',
          code: `// ✅ GOOD: Each class has one clear responsibility

class Product {
  constructor(name, price, stock) {
    this.name = name;
    this.price = price;
    this.stock = stock;
  }
  
  isInStock() {
    return this.stock > 0;
  }
}

class InventoryManager {
  updateStock(product, quantity) {
    product.stock += quantity;
  }
  
  checkAvailability(product, requestedQuantity) {
    return product.stock >= requestedQuantity;
  }
}

class PriceCalculator {
  calculateTotal(products) {
    return products.reduce((total, product) => total + product.price, 0);
  }
  
  applyDiscount(total, discountPercentage) {
    return total * (1 - discountPercentage / 100);
  }
}

class OrderProcessor {
  processOrder(products, customer) {
    console.log(\`Processing order for \${customer.name}\`);
    // Order processing logic
  }
}`,
          explanation: 'Each class has a clear, single responsibility: Product manages product data, InventoryManager handles stock, PriceCalculator manages pricing, and OrderProcessor handles orders.',
          highlightLines: [1, 15, 24, 33]
        }
      }
    ],
    quiz: [
      {
        id: 'srp-quiz-1',
        question: 'Which of the following best describes the Single Responsibility Principle?',
        options: [
          'A class should have only one method',
          'A class should have only one reason to change',
          'A class should only be used once in the application',
          'A class should only inherit from one parent class'
        ],
        correctAnswer: 1,
        explanation: 'The Single Responsibility Principle states that a class should have only one reason to change, meaning it should have only one responsibility or job.'
      },
      {
        id: 'srp-quiz-2',
        question: 'What is a major benefit of following the Single Responsibility Principle?',
        options: [
          'Faster code execution',
          'Reduced memory usage',
          'Easier maintenance and fewer bugs',
          'Smaller file sizes'
        ],
        correctAnswer: 2,
        explanation: 'The main benefit is easier maintenance and fewer bugs because changes to one responsibility won\'t accidentally affect other unrelated responsibilities.'
      },
      {
        id: 'srp-quiz-3',
        question: 'Which class violates the Single Responsibility Principle?',
        options: [
          'A User class that manages user data only',
          'A Calculator class that performs mathematical operations',
          'A FileManager class that reads files, validates data, sends emails, and generates reports',
          'A Database class that handles database connections'
        ],
        correctAnswer: 2,
        explanation: 'The FileManager class violates SRP because it has multiple responsibilities: file operations, data validation, email sending, and report generation. Each should be a separate class.'
      }
    ]
  },
  {
    id: 'open-closed',
    title: 'Open-Closed Principle',
    slug: 'open-closed',
    description: 'Classes should be open for extension but closed for modification',
    icon: '🔓',
    sections: [
      {
        id: 'ocp-definition',
        title: 'What is Open-Closed Principle?',
        content: `The **Open-Closed Principle (OCP)** states that classes should be **open for extension** but **closed for modification**.

**What does this mean?**

- **Open for extension**: You can add new functionality to a class
- **Closed for modification**: You should not change the existing code of a class

**Why is this important?**

Changing the current behavior of a class will affect all the systems using that class. If you want the class to perform more functions, the ideal approach is to add to the functions that already exist, NOT change them.

**Real-world analogy**: Think of a smartphone. When you want new functionality, you install apps (extension) rather than modifying the phone's internal hardware (modification).

**Goal**: This principle aims to extend a class's behavior without changing the existing behavior of that class. This is to avoid causing bugs wherever the class is being used.`,
        codeExample: {
          id: 'ocp-violation',
          title: 'OCP Violation Example',
          language: 'javascript',
          code: `// ❌ BAD: This violates OCP - we need to modify existing code for new shapes
class AreaCalculator {
  calculateArea(shapes) {
    let totalArea = 0;
    
    for (let shape of shapes) {
      if (shape.type === 'rectangle') {
        totalArea += shape.width * shape.height;
      } else if (shape.type === 'circle') {
        totalArea += Math.PI * shape.radius * shape.radius;
      }
      // What if we want to add triangle? We need to modify this method!
      // else if (shape.type === 'triangle') {
      //   totalArea += 0.5 * shape.base * shape.height;
      // }
    }
    
    return totalArea;
  }
}

class Rectangle {
  constructor(width, height) {
    this.type = 'rectangle';
    this.width = width;
    this.height = height;
  }
}

class Circle {
  constructor(radius) {
    this.type = 'circle';
    this.radius = radius;
  }
}`,
          explanation: 'This violates OCP because every time we want to add a new shape, we must modify the AreaCalculator class, potentially introducing bugs to existing functionality.',
          highlightLines: [6, 8, 10, 12]
        }
      },
      {
        id: 'ocp-solution',
        title: 'OCP Solution: Use Inheritance and Polymorphism',
        content: `Let's refactor to follow the Open-Closed Principle using inheritance and polymorphism:

**Key concepts used:**
- **Abstract base class**: Defines the contract that all shapes must follow
- **Inheritance**: Each shape extends the base class
- **Polymorphism**: Each shape implements its own area calculation
- **Extension without modification**: New shapes can be added without changing existing code`,
        codeExample: {
          id: 'ocp-solution',
          title: 'OCP Compliant Solution',
          language: 'javascript',
          code: `// ✅ GOOD: Following OCP using inheritance and polymorphism

// Base class - defines the contract
class Shape {
  calculateArea() {
    throw new Error('calculateArea method must be implemented');
  }
}

// Existing shapes
class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  
  calculateArea() {
    return this.width * this.height;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  
  calculateArea() {
    return Math.PI * this.radius * this.radius;
  }
}

// NEW: Adding triangle without modifying existing code!
class Triangle extends Shape {
  constructor(base, height) {
    super();
    this.base = base;
    this.height = height;
  }
  
  calculateArea() {
    return 0.5 * this.base * this.height;
  }
}

// Calculator is now closed for modification, open for extension
class AreaCalculator {
  calculateTotalArea(shapes) {
    return shapes.reduce((total, shape) => total + shape.calculateArea(), 0);
  }
}`,
          explanation: 'Now we can add new shapes without modifying the AreaCalculator. Each shape knows how to calculate its own area. The calculator just calls the calculateArea method.',
          highlightLines: [31, 40, 45]
        }
      },
      {
        id: 'ocp-strategy-pattern',
        title: 'Alternative: Strategy Pattern',
        content: `Another way to implement OCP is using the **Strategy Pattern**. This is useful when you want to change behavior without inheritance:

**When to use Strategy Pattern:**
- When you have different algorithms for the same task
- When you want to switch behaviors at runtime
- When inheritance doesn't make sense for your use case

**Benefits:**
- High flexibility and extensibility
- Easy to add new strategies without modifying existing code
- Can switch strategies at runtime`,
        codeExample: {
          id: 'ocp-strategy',
          title: 'OCP with Strategy Pattern',
          language: 'javascript',
          code: `// ✅ GOOD: OCP using Strategy Pattern for payment processing

// Payment strategies
class CreditCardPayment {
  processPayment(amount) {
    console.log(\`Processing $\${amount} via Credit Card\`);
    // Credit card processing logic
    return { success: true, transactionId: 'CC_' + Date.now() };
  }
}

class PayPalPayment {
  processPayment(amount) {
    console.log(\`Processing $\${amount} via PayPal\`);
    // PayPal processing logic
    return { success: true, transactionId: 'PP_' + Date.now() };
  }
}

// NEW: Adding cryptocurrency without modifying existing code
class CryptocurrencyPayment {
  processPayment(amount) {
    console.log(\`Processing $\${amount} via Cryptocurrency\`);
    // Crypto processing logic
    return { success: true, transactionId: 'CR_' + Date.now() };
  }
}

// Payment processor - closed for modification, open for extension
class PaymentProcessor {
  constructor(paymentStrategy) {
    this.paymentStrategy = paymentStrategy;
  }
  
  setPaymentStrategy(strategy) {
    this.paymentStrategy = strategy;
  }
  
  processPayment(amount) {
    return this.paymentStrategy.processPayment(amount);
  }
}

// Usage example
const processor = new PaymentProcessor(new CreditCardPayment());
processor.processPayment(100);

// Switch strategy at runtime
processor.setPaymentStrategy(new CryptocurrencyPayment());
processor.processPayment(50);`,
          explanation: 'Using the Strategy Pattern, we can add new payment methods without modifying the PaymentProcessor class. We can even switch payment strategies at runtime.',
          highlightLines: [18, 28, 33, 43]
        }
      }
    ],
    quiz: [
      {
        id: 'ocp-quiz-1',
        question: 'What does the Open-Closed Principle state?',
        options: [
          'Classes should always be public and never private',
          'Classes should be open for extension but closed for modification',
          'Classes should have open and closed methods',
          'Classes should be either completely open or completely closed'
        ],
        correctAnswer: 1,
        explanation: 'The Open-Closed Principle states that classes should be open for extension (you can add new functionality) but closed for modification (you shouldn\'t change existing code).'
      },
      {
        id: 'ocp-quiz-2',
        question: 'Which approach best follows the Open-Closed Principle?',
        options: [
          'Modifying existing classes whenever new requirements arise',
          'Creating new classes that inherit from existing ones',
          'Making all class properties public',
          'Never adding new functionality to any class'
        ],
        correctAnswer: 1,
        explanation: 'Creating new classes that inherit from existing ones allows you to extend functionality without modifying the original class, which follows OCP.'
      },
      {
        id: 'ocp-quiz-3',
        question: 'Why is the Open-Closed Principle important?',
        options: [
          'It makes code run faster',
          'It reduces memory usage',
          'It prevents bugs in existing functionality when adding new features',
          'It makes classes smaller'
        ],
        correctAnswer: 2,
        explanation: 'OCP is important because it prevents bugs in existing functionality. By not modifying existing code, you avoid the risk of breaking systems that already work.'
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
        title: 'What is Liskov Substitution?',
        content: `The **Liskov Substitution Principle (LSP)** states that if S is a subtype of T, then objects of type T in a program may be replaced with objects of type S without altering any of the desirable properties of that program.

**In simpler terms**: A child class should be able to do everything its parent class can do, in the same way.

**Why is this important?**

When a child class cannot perform the same actions as its parent class, this can cause bugs. The child class should be able to process the same requests and deliver the same result as the parent class, or a result of the same type.

**Real-world analogy**: Think of a coffee machine (parent) and an espresso machine (child). If someone asks for coffee, both machines should be able to deliver coffee. The espresso machine can deliver espresso (a specific type of coffee), but it would be wrong if it delivered water instead.

**Goal**: This principle aims to enforce consistency so that the parent class or its child class can be used in the same way without any errors.`,
        codeExample: {
          id: 'lsp-violation',
          title: 'LSP Violation Example',
          language: 'javascript',
          code: `// ❌ BAD: This violates LSP
class Bird {
  fly() {
    console.log('Flying in the sky!');
  }
  
  makeSound() {
    console.log('Bird sound');
  }
}

class Sparrow extends Bird {
  fly() {
    console.log('Sparrow flying fast!');
  }
  
  makeSound() {
    console.log('Chirp chirp!');
  }
}

class Penguin extends Bird {
  fly() {
    // ❌ Problem: Penguins can't fly!
    throw new Error('Penguins cannot fly!');
  }
  
  makeSound() {
    console.log('Penguin sound!');
  }
}

// This code will break with Penguin
function makeBirdFly(bird) {
  bird.fly(); // This will throw an error if bird is a Penguin
}

const sparrow = new Sparrow();
const penguin = new Penguin();

makeBirdFly(sparrow); // Works fine
makeBirdFly(penguin); // ❌ Throws error - violates LSP`,
          explanation: 'This violates LSP because Penguin cannot substitute Bird without changing the program behavior. The makeBirdFly function expects all Birds to be able to fly, but Penguin breaks this assumption.',
          highlightLines: [22, 25, 36, 41]
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
          language: 'javascript',
          code: `// ✅ GOOD: Following LSP with proper hierarchy

// Base class with common behavior
class Bird {
  makeSound() {
    console.log('Bird sound');
  }
  
  eat() {
    console.log('Bird is eating');
  }
}

// Flying birds have flying capability
class FlyingBird extends Bird {
  fly() {
    console.log('Flying in the sky!');
  }
}

// Water birds have swimming capability
class WaterBird extends Bird {
  swim() {
    console.log('Swimming in water');
  }
}

// Specific flying birds
class Sparrow extends FlyingBird {
  fly() {
    console.log('Sparrow flying fast!');
  }
  
  makeSound() {
    console.log('Chirp chirp!');
  }
}

class Eagle extends FlyingBird {
  fly() {
    console.log('Eagle soaring high!');
  }
  
  makeSound() {
    console.log('Eagle cry!');
  }
}

// Specific water birds
class Penguin extends WaterBird {
  swim() {
    console.log('Penguin swimming gracefully!');
  }
  
  makeSound() {
    console.log('Penguin sound!');
  }
}

// Now we can have specific functions for specific capabilities
function makeFlyingBirdFly(bird) {
  bird.fly(); // Only accepts FlyingBird and its subclasses
}

function makeBirdSound(bird) {
  bird.makeSound(); // Accepts any Bird
}

// Usage - all substitutions work correctly
const sparrow = new Sparrow();
const eagle = new Eagle();
const penguin = new Penguin();

makeFlyingBirdFly(sparrow); // ✅ Works
makeFlyingBirdFly(eagle);   // ✅ Works
// makeFlyingBirdFly(penguin); // Won't compile - penguin is not a FlyingBird

makeBirdSound(sparrow); // ✅ Works
makeBirdSound(eagle);   // ✅ Works
makeBirdSound(penguin); // ✅ Works`,
          explanation: 'Now each subclass can properly substitute its parent. FlyingBirds can always fly, WaterBirds can swim, and all Birds can make sounds. No broken contracts!',
          highlightLines: [14, 20, 45, 57, 61]
        }
      },
      {
        id: 'lsp-real-world',
        title: 'Real-world Example: Rectangle vs Square',
        content: `A classic example of LSP violation is the Rectangle-Square problem. Let's see how to handle this correctly:

**The Problem**: Mathematically, a square IS a rectangle (with equal sides), but in programming, this relationship can violate LSP if not designed carefully.

**The Solution**: Design the hierarchy based on behavior, not just mathematical relationships.`,
        codeExample: {
          id: 'lsp-rectangle-solution',
          title: 'Rectangle-Square LSP Solution',
          language: 'javascript',
          code: `// ✅ GOOD: LSP compliant design for shapes

// Base class defines the contract
class Shape {
  area() {
    throw new Error('area method must be implemented');
  }
}

// Rectangle that can have different width and height
class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this._width = width;
    this._height = height;
  }
  
  get width() { return this._width; }
  get height() { return this._height; }
  
  setWidth(width) { this._width = width; }
  setHeight(height) { this._height = height; }
  
  area() {
    return this._width * this._height;
  }
}

// Square maintains equal sides but doesn't violate parent contract
class Square extends Shape {
  constructor(side) {
    super();
    this._side = side;
  }
  
  get side() { return this._side; }
  
  setSide(side) { this._side = side; }
  
  // For compatibility, provide width/height that return side
  get width() { return this._side; }
  get height() { return this._side; }
  
  area() {
    return this._side * this._side;
  }
}

// Alternative: If you need square to extend rectangle
class FlexibleSquare extends Rectangle {
  constructor(side) {
    super(side, side);
  }
  
  setWidth(width) {
    super.setWidth(width);
    super.setHeight(width); // Keep it square
  }
  
  setHeight(height) {
    super.setHeight(height);
    super.setWidth(height); // Keep it square
  }
}

// Functions that work with any shape
function printArea(shape) {
  console.log(\`Area: \${shape.area()}\`);
}

function enlargeRectangle(rectangle) {
  const originalArea = rectangle.area();
  rectangle.setWidth(rectangle.width + 1);
  rectangle.setHeight(rectangle.height + 1);
  console.log(\`Area changed from \${originalArea} to \${rectangle.area()}\`);
}

// Usage examples
const rect = new Rectangle(3, 4);
const square = new Square(5);
const flexSquare = new FlexibleSquare(3);

printArea(rect);      // Works with rectangle
printArea(square);    // Works with square
printArea(flexSquare); // Works with flexible square

enlargeRectangle(rect);      // ✅ Changes to 4x5
enlargeRectangle(flexSquare); // ✅ Changes to 4x4 (stays square)`,
          explanation: 'This design respects LSP by ensuring that any subclass can substitute the parent class without breaking expected behavior. Square has its own clear contract while still being usable as a Shape.',
          highlightLines: [47, 51, 55, 67, 80]
        }
      }
    ],
    quiz: [
      {
        id: 'lsp-quiz-1',
        question: 'What does the Liskov Substitution Principle require?',
        options: [
          'Child classes must have fewer methods than parent classes',
          'Child classes should be substitutable for their parent classes without breaking functionality',
          'Child classes must always override all parent methods',
          'Child classes should never inherit from parent classes'
        ],
        correctAnswer: 1,
        explanation: 'LSP requires that child classes should be substitutable for their parent classes without altering the correctness of the program.'
      },
      {
        id: 'lsp-quiz-2',
        question: 'Which of the following violates the Liskov Substitution Principle?',
        options: [
          'A Square class that extends Rectangle and maintains equal sides',
          'A Penguin class that extends Bird but throws an error when fly() is called',
          'A SportsCar class that extends Car and drives faster',
          'A Manager class that extends Employee and has additional responsibilities'
        ],
        correctAnswer: 1,
        explanation: 'The Penguin example violates LSP because it cannot substitute Bird without breaking the program (fly() throws an error instead of working).'
      },
      {
        id: 'lsp-quiz-3',
        question: 'What is the main goal of the Liskov Substitution Principle?',
        options: [
          'To make inheritance hierarchies more complex',
          'To ensure behavioral consistency in inheritance relationships',
          'To prevent the use of inheritance altogether',
          'To make all classes abstract'
        ],
        correctAnswer: 1,
        explanation: 'The main goal of LSP is to ensure behavioral consistency so that objects of parent and child classes can be used interchangeably without breaking the application.'
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
        title: 'What is Interface Segregation?',
        content: `The **Interface Segregation Principle (ISP)** states that clients should not be forced to depend on methods that they do not use.

**In simpler terms**: Break large interfaces into smaller, specific ones so that classes only need to implement what they actually use.

**Why is this important?**

When a class is required to perform actions that are not useful, it is wasteful and may produce unexpected bugs if the class does not have the ability to perform those actions.

**Real-world analogy**: Think of a multi-function printer vs separate devices. Some users only need printing, others only scanning. Instead of forcing everyone to have a complex multi-function device, provide separate interfaces for printing, scanning, and faxing.

**Goal**: This principle aims at splitting a set of actions into smaller sets so that a class executes ONLY the set of actions it requires.`,
        codeExample: {
          id: 'isp-violation',
          title: 'ISP Violation Example',
          language: 'javascript',
          code: `// ❌ BAD: Fat interface forces classes to implement unused methods
class MultiFunctionDevice {
  print(document) {
    throw new Error('Method must be implemented');
  }
  
  scan(document) {
    throw new Error('Method must be implemented');
  }
  
  fax(document) {
    throw new Error('Method must be implemented');
  }
  
  copy(document) {
    throw new Error('Method must be implemented');
  }
}

// Printer only needs printing but is forced to implement everything
class SimplePrinter extends MultiFunctionDevice {
  print(document) {
    console.log(\`Printing: \${document}\`);
  }
  
  // ❌ Forced to implement methods it doesn't need/support
  scan(document) {
    throw new Error('SimplePrinter cannot scan');
  }
  
  fax(document) {
    throw new Error('SimplePrinter cannot fax');
  }
  
  copy(document) {
    throw new Error('SimplePrinter cannot copy');
  }
}

// Scanner only needs scanning but must implement printing methods too
class Scanner extends MultiFunctionDevice {
  scan(document) {
    console.log(\`Scanning: \${document}\`);
  }
  
  // ❌ Forced to implement methods it doesn't support
  print(document) {
    throw new Error('Scanner cannot print');
  }
  
  fax(document) {
    throw new Error('Scanner cannot fax');
  }
  
  copy(document) {
    throw new Error('Scanner cannot copy');
  }
}`,
          explanation: 'This violates ISP because SimplePrinter and Scanner are forced to implement methods they don\'t need or support, leading to error-throwing stub methods.',
          highlightLines: [27, 31, 35, 45, 49, 53]
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
          language: 'javascript',
          code: `// ✅ GOOD: Segregated interfaces following ISP

// Separate interfaces for different capabilities
class Printer {
  print(document) {
    throw new Error('print method must be implemented');
  }
}

class Scanner {
  scan(document) {
    throw new Error('scan method must be implemented');
  }
}

class FaxMachine {
  fax(document) {
    throw new Error('fax method must be implemented');
  }
}

class Copier {
  copy(document) {
    throw new Error('copy method must be implemented');
  }
}

// Simple implementations only implement what they need
class SimplePrinter extends Printer {
  print(document) {
    console.log(\`Printing: \${document}\`);
  }
}

class DocumentScanner extends Scanner {
  scan(document) {
    console.log(\`Scanning: \${document}\`);
  }
}

class NetworkFax extends FaxMachine {
  fax(document) {
    console.log(\`Faxing: \${document}\`);
  }
}

// Multi-function device implements multiple interfaces
class MultiFunctionPrinter extends Printer {
  constructor() {
    super();
    this.scanner = new DocumentScanner();
    this.faxMachine = new NetworkFax();
  }
  
  print(document) {
    console.log(\`Multi-function printing: \${document}\`);
  }
  
  scan(document) {
    return this.scanner.scan(document);
  }
  
  fax(document) {
    return this.faxMachine.fax(document);
  }
  
  copy(document) {
    console.log('Copying document...');
    this.scan(document);
    this.print(document);
  }
}

// Usage functions can work with specific interfaces
function printDocuments(printer, documents) {
  documents.forEach(doc => printer.print(doc));
}

function scanDocuments(scanner, documents) {
  return documents.map(doc => scanner.scan(doc));
}

// Usage examples
const simplePrinter = new SimplePrinter();
const scanner = new DocumentScanner();
const multiFunctionDevice = new MultiFunctionPrinter();

printDocuments(simplePrinter, ['Resume', 'Cover Letter']);
scanDocuments(scanner, ['Contract', 'Invoice']);
printDocuments(multiFunctionDevice, ['Report']); // Also works!`,
          explanation: 'Now each class only implements the methods it actually needs. SimplePrinter only handles printing, Scanner only handles scanning, and MultiFunctionPrinter composes multiple capabilities.',
          highlightLines: [28, 34, 40, 46, 75, 79]
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
          'All classes must implement all available interfaces',
          'Interfaces should never be split into smaller parts'
        ],
        correctAnswer: 1,
        explanation: 'ISP states that clients should not be forced to depend on methods they do not use. This means interfaces should be small and focused.'
      },
      {
        id: 'isp-quiz-2',
        question: 'Which scenario violates the Interface Segregation Principle?',
        options: [
          'A Printer interface with only print() method',
          'A Scanner interface with only scan() method',
          'A Device interface with print(), scan(), fax(), and email() methods that all devices must implement',
          'Separate interfaces for different device capabilities'
        ],
        correctAnswer: 2,
        explanation: 'The Device interface violates ISP because it forces all implementing classes to provide methods they might not need or support.'
      },
      {
        id: 'isp-quiz-3',
        question: 'What is the main benefit of following the Interface Segregation Principle?',
        options: [
          'Faster execution speed',
          'Reduced memory usage',
          'Classes only implement methods they actually need',
          'Fewer total lines of code'
        ],
        correctAnswer: 2,
        explanation: 'The main benefit of ISP is that classes only implement methods they actually need, avoiding unused dependencies and potential error-throwing stub methods.'
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
        title: 'What is Dependency Inversion?',
        content: `The **Dependency Inversion Principle (DIP)** has two parts:

1. **High-level modules should not depend on low-level modules. Both should depend on abstractions.**
2. **Abstractions should not depend on details. Details should depend on abstractions.**

**Let's define the terms:**
- **High-level module**: A class that executes an action with a tool
- **Low-level module**: The tool that is needed to execute the action  
- **Abstraction**: An interface that connects the two classes
- **Details**: How the tool works internally

**Why is this important?**

This principle says a class should not be fused with the tool it uses to execute an action. Rather, it should be fused to an interface that allows the tool to connect to the class.

**Real-world analogy**: Think of a light switch (high-level) and a light bulb (low-level). The switch doesn't need to know if it's controlling an LED, incandescent, or fluorescent bulb. It just needs a standard electrical interface.

**Goal**: This principle aims at reducing the dependency of a high-level class on the low-level class by introducing an interface.`,
        codeExample: {
          id: 'dip-violation',
          title: 'DIP Violation Example',
          language: 'javascript',
          code: `// ❌ BAD: High-level class directly depends on low-level classes
class EmailService {
  sendEmail(message) {
    console.log(\`Sending email: \${message}\`);
    // Email sending logic
  }
}

class SMSService {
  sendSMS(message) {
    console.log(\`Sending SMS: \${message}\`);
    // SMS sending logic
  }
}

// High-level class directly depends on concrete implementations
class NotificationManager {
  constructor() {
    this.emailService = new EmailService(); // ❌ Direct dependency
    this.smsService = new SMSService();     // ❌ Direct dependency
  }
  
  sendNotification(message, type) {
    if (type === 'email') {
      this.emailService.sendEmail(message);
    } else if (type === 'sms') {
      this.smsService.sendSMS(message);
    }
    // ❌ Adding new notification types requires modifying this class
  }
}

// Usage
const notificationManager = new NotificationManager();
notificationManager.sendNotification('Hello!', 'email');`,
          explanation: 'This violates DIP because NotificationManager (high-level) directly depends on EmailService and SMSService (low-level). Adding new notification types requires modifying the high-level class.',
          highlightLines: [18, 19, 22, 25]
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
          language: 'javascript',
          code: `// ✅ GOOD: Following DIP with abstractions and dependency injection

// Abstraction - interface that all notification services must implement
class NotificationService {
  send(message) {
    throw new Error('send method must be implemented');
  }
}

// Low-level modules implementing the abstraction
class EmailService extends NotificationService {
  send(message) {
    console.log(\`Sending email: \${message}\`);
    // Email sending logic
  }
}

class SMSService extends NotificationService {
  send(message) {
    console.log(\`Sending SMS: \${message}\`);
    // SMS sending logic
  }
}

// NEW: Adding push notifications without modifying existing code
class PushNotificationService extends NotificationService {
  send(message) {
    console.log(\`Sending push notification: \${message}\`);
    // Push notification logic
  }
}

class SlackService extends NotificationService {
  send(message) {
    console.log(\`Sending Slack message: \${message}\`);
    // Slack API logic
  }
}

// High-level module now depends on abstraction, not concrete classes
class NotificationManager {
  constructor() {
    this.services = new Map();
  }
  
  // Dependency injection - inject services from outside
  addService(type, service) {
    this.services.set(type, service);
  }
  
  sendNotification(message, type) {
    const service = this.services.get(type);
    if (service) {
      service.send(message); // ✅ Uses abstraction
    } else {
      console.log(\`No service registered for type: \${type}\`);
    }
  }
  
  // Send to multiple channels
  broadcast(message, types) {
    types.forEach(type => this.sendNotification(message, type));
  }
}

// Usage with dependency injection
const notificationManager = new NotificationManager();

// Inject dependencies (could come from configuration, dependency container, etc.)
notificationManager.addService('email', new EmailService());
notificationManager.addService('sms', new SMSService());
notificationManager.addService('push', new PushNotificationService());
notificationManager.addService('slack', new SlackService());

// Usage
notificationManager.sendNotification('Hello!', 'email');
notificationManager.sendNotification('Urgent alert!', 'sms');
notificationManager.broadcast('System maintenance tonight', ['email', 'slack']);`,
          explanation: 'Now NotificationManager depends only on the NotificationService abstraction. We can add new notification types without modifying the high-level class. Dependencies are injected from outside.',
          highlightLines: [6, 40, 44, 63, 64, 65, 66]
        }
      },
      {
        id: 'dip-advanced',
        title: 'Advanced: Dependency Injection Container',
        content: `For more complex applications, you can use a **Dependency Injection Container** to manage dependencies automatically:

**Benefits of DI Container:**
- **Automatic wiring**: Container resolves dependencies automatically
- **Lifecycle management**: Control when objects are created and destroyed  
- **Configuration**: Define dependencies in configuration rather than code
- **Testing**: Easy to inject mock dependencies for testing`,
        codeExample: {
          id: 'dip-di-container',
          title: 'DIP with Dependency Injection Container',
          language: 'javascript',
          code: `// ✅ ADVANCED: Using Dependency Injection Container

// Simple DI Container implementation
class DIContainer {
  constructor() {
    this.services = new Map();
    this.instances = new Map();
  }
  
  register(name, definition, singleton = false) {
    this.services.set(name, { definition, singleton });
  }
  
  resolve(name) {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(\`Service \${name} not found\`);
    }
    
    if (service.singleton) {
      if (!this.instances.has(name)) {
        this.instances.set(name, this.createInstance(service.definition));
      }
      return this.instances.get(name);
    }
    
    return this.createInstance(service.definition);
  }
  
  createInstance(definition) {
    if (typeof definition === 'function') {
      return new definition();
    }
    return definition;
  }
}

// Database abstraction
class Database {
  connect() { throw new Error('Must implement connect'); }
  query(sql) { throw new Error('Must implement query'); }
}

class MySQLDatabase extends Database {
  connect() { return 'Connected to MySQL'; }
  query(sql) { return \`MySQL query: \${sql}\`; }
}

class PostgreSQLDatabase extends Database {
  connect() { return 'Connected to PostgreSQL'; }
  query(sql) { return \`PostgreSQL query: \${sql}\`; }
}

// Logger abstraction
class Logger {
  log(message) { throw new Error('Must implement log'); }
}

class ConsoleLogger extends Logger {
  log(message) { console.log(\`[LOG] \${message}\`); }
}

class FileLogger extends Logger {
  log(message) { console.log(\`[FILE] \${message}\`); }
}

// High-level service that depends on abstractions
class UserService {
  constructor(database, logger) {
    this.database = database;
    this.logger = logger;
  }
  
  createUser(userData) {
    this.logger.log('Creating new user');
    this.database.connect();
    const result = this.database.query(\`INSERT INTO users ...\`);
    this.logger.log('User created successfully');
    return result;
  }
}

// Setup DI Container
const container = new DIContainer();

// Register dependencies
container.register('database', MySQLDatabase, true); // Singleton
container.register('logger', ConsoleLogger, true);   // Singleton

// Factory function for UserService with automatic dependency injection
container.register('userService', () => {
  return new UserService(
    container.resolve('database'),
    container.resolve('logger')
  );
});

// Usage - dependencies are automatically resolved
const userService = container.resolve('userService');
userService.createUser({ name: 'John', email: 'john@example.com' });

// Easy to switch implementations for testing
container.register('database', PostgreSQLDatabase, true);
const testUserService = container.resolve('userService');
testUserService.createUser({ name: 'Test User', email: 'test@example.com' });`,
          explanation: 'Using a DI Container, we can automatically resolve dependencies and easily switch implementations. This makes the code highly flexible and testable.',
          highlightLines: [62, 75, 81, 84, 93]
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
          'All dependencies should be inverted in the code',
          'Classes should never have any dependencies'
        ],
        correctAnswer: 1,
        explanation: 'DIP states that high-level modules should not depend on low-level modules. Both should depend on abstractions (interfaces), not concrete implementations.'
      },
      {
        id: 'dip-quiz-2',
        question: 'Which approach follows the Dependency Inversion Principle?',
        options: [
          'Creating objects directly inside the class that needs them',
          'Using interfaces and injecting dependencies from outside',
          'Making all class properties public',
          'Avoiding the use of interfaces altogether'
        ],
        correctAnswer: 1,
        explanation: 'DIP is followed by using interfaces (abstractions) and injecting dependencies from outside rather than creating them internally.'
      },
      {
        id: 'dip-quiz-3',
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