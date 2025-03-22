export interface ChapterContent {
  title: string;
  description: string;
  content: string;
  resources: {
    title: string;
    url: string;
    type: 'video' | 'article' | 'tutorial';
  }[];
  exercises: {
    title: string;
    description: string;
  }[];
}

export const chapterContent: Record<string, Record<string, ChapterContent>> = {
  'software-dev': {
    'programming-fundamentals': {
      title: 'Programming Fundamentals',
      description: 'Master the basics of programming',
      content: `**What are Programming Fundamentals?**

Programming fundamentals refer to the **essential concepts and principles** that form the foundation of writing and understanding computer programs. These fundamentals help in developing **efficient and functional software** by following structured techniques and logic.

**Importance of Programming Fundamentals**
Understanding programming fundamentals is crucial for:

- Writing **clear and efficient code**.
- Solving problems effectively using **algorithms**.
- Developing **software, websites, and applications**.
- Enhancing **logical thinking and computational skills**.
- Debugging and optimizing code for **better performance**.

**Core Concepts of Programming Fundamentals**
**1. Variables and Data Types**
Variables are used to store data, and data types define the type of data stored in a variable. Common data types include:

- **Integer (int)** – Whole numbers.
- **Float (decimal numbers)** – Numbers with decimal points.
- **String (str)** – Textual data.
- **Boolean (bool)** – True or False values.

**2. Operators and Expressions**
Operators are symbols used to perform operations on variables and values. They are categorized as:

- **Arithmetic Operators** – Perform mathematical operations (addition, subtraction, multiplication, etc.).
- **Relational Operators** – Compare values (greater than, less than, equal to, etc.).
- **Logical Operators** – Perform logical operations (AND, OR, NOT).
- **Assignment Operators** – Assign values to variables.

**3. Control Structures**
Control structures define the flow of execution in a program.

- **Conditional Statements (if-else)**: Allow decision-making based on conditions.
- **Loops (for, while)**: Execute a block of code multiple times until a condition is met.

**4. Functions and Modularity**
Functions help break code into smaller, reusable blocks. They:

- Improve **code organization and readability**.
- Allow **reusability**, reducing redundancy.
- Help in **debugging** by isolating specific tasks.

**5. Data Structures**
Data structures are ways of organizing and storing data efficiently. Common types include:

- **Arrays/Lists** – Store multiple values in a single variable.
- **Dictionaries/Hash Maps** – Store data in key-value pairs.
- **Stacks and Queues** – Follow LIFO (Last In, First Out) or FIFO (First In, First Out) principles.

**6. Object-Oriented Programming (OOP)**
OOP is a paradigm that models real-world entities using objects and classes. Key concepts include:

- **Encapsulation** – Restricts direct access to certain data.
- **Inheritance** – Allows new classes to inherit properties from existing classes.
- **Polymorphism** – Enables a single function to work with different data types.
- **Abstraction** – Hides complex details and exposes only essential parts.

**7. Algorithms and Problem Solving**
An algorithm is a step-by-step procedure to solve a problem. Common algorithms include:

- Sorting algorithms (Bubble Sort, Quick Sort, Merge Sort).
- Searching algorithms (Linear Search, Binary Search).
- Pathfinding and optimization algorithms.

**8. Exception Handling**
Exception handling is the process of managing errors and unexpected inputs gracefully to prevent program crashes.

**9. File Handling**
File handling allows reading from and writing to external files, enabling data storage and retrieval.

**10. Debugging and Best Practices**
Debugging involves identifying and fixing errors in code. Best practices include:

- Writing **clean and readable code**.
- Using **meaningful variable names**.
- Following **proper indentation and documentation**.
- Testing and debugging code **regularly**.

**Applications of Programming Fundamentals**
Programming fundamentals are used in:

- **Software Development** – Creating desktop, mobile, and web applications.
- **Web Development** – Designing websites and web applications.
- **Artificial Intelligence and Machine Learning** – Building intelligent systems.
- **Cybersecurity** – Developing secure systems and preventing cyber threats.
- **Game Development** – Designing and coding video games.

**Conclusion**
Mastering programming fundamentals is essential for becoming a skilled programmer. Whether you're a beginner or an experienced developer, understanding these concepts will help you build efficient, scalable, and maintainable software.`,
      resources: [
        {
          title: 'Khan Academy - Computer Programming',
          url: 'https://www.khanacademy.org/computing/computer-programming',
          type: 'tutorial'
        },
        {
          title: 'MDN Web Docs - JavaScript Fundamentals',
          url: 'https://developer.mozilla.org/en-US/curriculum/core/javascript-fundamentals/',
          type: 'tutorial'
        }
      ],
      exercises: [
        {
          title: 'Basic Calculator',
          description: 'Create a calculator that can perform basic arithmetic operations'
        },
        {
          title: 'Temperature Converter',
          description: 'Build a program that converts between Celsius and Fahrenheit'
        }
      ]
    },
    'version-control-git-': {
      title: 'Version Control (Git)',
      description: 'Master Git for effective code management',
      content: `**Understanding version control with Git is crucial for your development journey** as it allows for **efficient collaboration, tracking changes, and managing code history**. Whether you’re working on a solo project or contributing to a large team, Git helps keep your codebase organized, recoverable, and scalable.

**What is Version Control?**
Version control is a system that records changes to a file or set of files over time, allowing developers to:
- ✔️ **Track changes and revert to previous versions.**
- ✔️ **Collaborate efficiently with teams.**
- ✔️ **Manage multiple versions of code (branching).**
- ✔️ **Avoid conflicts when multiple developers work on the same project.**

**Types of Version Control:**
- Local Version Control – Stores file versions on a single computer.
- Centralized Version Control (CVCS) – Uses a central server (e.g., SVN).
- Distributed Version Control (DVCS) – Every developer has a local copy of the repository (e.g., Git).

**Why Git?**
Git is a distributed version control system (DVCS) that is widely used due to:
- ✅ **Speed & Efficiency** – Fast operations with local repositories.
- ✅ **Branching & Merging** – Work on different features independently.
- ✅ **Distributed Development** – Every user has a complete code history.
- ✅ **Collaboration & Open Source** – Used in platforms like GitHub, GitLab, and Bitbucket.

**Key Concepts of Git**
**1. Repositories (Repo)**
A repository is a storage location for your project. It contains all your project files and history.

- Local Repository: Stored on your computer.
- Remote Repository: Hosted on platforms like GitHub or GitLab.

**2. Commits**
A commit is a snapshot of your project at a specific point in time. Each commit has a unique hash (SHA) for identification.

**3. Branching**
A branch allows developers to work on features independently without affecting the main code.

- main (or master) – The default branch.
- Feature branches – Created for new features or bug fixes.

**4. Merging & Pull Requests**
Merging combines changes from one branch into another.

Pull Requests (PRs) allow code review before merging changes in GitHub/GitLab.

**5. Remote Repositories**
- Push – Send local changes to a remote repository.
- Pull – Fetch and merge changes from a remote repo to your local repo.
- Clone – Copy a repository from a remote source to your local system.

**Basic Git Workflow**
**1️⃣ Initialize a Repository:**
\`\`\`sh
git init
\`\`\`
**2️⃣ Clone a Repository:**
\`\`\`sh
git clone <repository-url>
\`\`\`
**3️⃣ Check Repository Status:**
\`\`\`sh
git status
\`\`\`
**4️⃣ Stage & Commit Changes:**
\`\`\`sh
git add .
git commit -m "Commit message"
\`\`\`
**5️⃣ Push Changes to Remote:**
\`\`\`sh
git push origin main
\`\`\`
**6️⃣ Pull Latest Changes:**
\`\`\`sh
git pull origin main
\`\`\`

**Best Practices for Using Git**
- ✔️ Write Clear Commit Messages – Describe what changed (git commit -m "Fixed login bug")
- ✔️ Use Feature Branches – Avoid working directly on main
- ✔️ Pull Changes Regularly – Prevent merge conflicts (git pull)
- ✔️ Use .gitignore – Exclude unnecessary files
- ✔️ Backup & Sync Frequently – Use GitHub, GitLab, or Bitbucket

**Conclusion**
Git is an essential tool for modern software development. It helps developers collaborate, track progress, and manage code efficiently. Mastering Git will streamline your workflow and make software development more productive and organized.`,
      resources: [
        {
          title: 'Git & GitHub Crash Course',
          url: 'https://www.youtube.com/watch?v=RGOj5yH7evk',
          type: 'video'
        },
        {
          title: 'Learn Git Branching',
          url: 'https://learngitbranching.js.org/',
          type: 'tutorial'
        }
      ],
      exercises: [
        {
          title: 'Initialize Repository',
          description: 'Create a new Git repository and make your first commit'
        },
        {
          title: 'Branch Management',
          description: 'Create and merge feature branches'
        }
      ]
    },
    'data-structures': {
      title: 'Data Structures',
      description: 'Overview',
      content: `**Data Structures – Overview**

Understanding data structures is crucial for your development journey as they are the foundation of efficient programming. Data structures help in organizing, storing, and managing data efficiently, enabling faster processing and optimized resource usage.

**What are Data Structures?**
A data structure is a specialized format for organizing, storing, and managing data to perform operations efficiently. They are essential in software development, databases, and algorithms.

✅ **Why are Data Structures Important?**
✔️ Efficient data management and retrieval
✔️ Optimized memory usage
✔️ Faster algorithm performance
✔️ Essential for solving complex problems

**Types of Data Structures**
Data structures are broadly classified into two categories:

**1. Linear Data Structures**
In linear data structures, elements are arranged sequentially.

**a) Arrays**
An array is a collection of elements stored at contiguous memory locations.
✅ **Operations**: Accessing, Insertion, Deletion
✅ **Example**:
\`\`\`c
int numbers[5] = {1, 2, 3, 4, 5};
\`\`\`
✔️ **Use Case**: Used in searching & sorting algorithms.

**b) Linked Lists**
A linked list is a collection of nodes, where each node contains data and a reference (pointer) to the next node.
✔️ **Types**: Singly Linked List, Doubly Linked List, Circular Linked List
✔️ **Use Case**: Dynamic memory allocation, undo operations in applications.

**c) Stacks**
A stack follows the LIFO (Last In, First Out) principle.
✔️ **Operations**: push(), pop(), peek()
✔️ **Use Case**: Browser history, undo operations in text editors.

**d) Queues**
A queue follows the FIFO (First In, First Out) principle.
✔️ **Types**: Simple Queue, Circular Queue, Priority Queue
✔️ **Use Case**: Printer job scheduling, task management.

**2. Non-Linear Data Structures**
In non-linear data structures, elements are not arranged sequentially.

**a) Trees**
A tree is a hierarchical structure with nodes connected by edges.
✔️ **Types**: Binary Tree, Binary Search Tree (BST), AVL Tree
✔️ **Use Case**: Database indexing, file system hierarchy.

**b) Graphs**
A graph consists of nodes (vertices) and edges (connections between nodes).
✔️ **Types**: Directed, Undirected, Weighted, Unweighted
✔️ **Use Case**: Social networks, navigation systems.

**c) Hash Tables**
A hash table stores key-value pairs for fast data retrieval using a hash function.
✔️ **Use Case**: Caching, database indexing, password storage.

**Choosing the Right Data Structure**
Choosing the right data structure depends on the problem you are solving.

Use Case	Recommended Data Structure
Searching data	Binary Search Tree (BST)
Undo/Redo functionality	Stack
Managing a task queue	Queue
Social networks	Graph
Fast lookups	Hash Table

**Conclusion**
Mastering data structures is essential for efficient coding. They help in optimizing performance, reducing complexity, and improving memory usage. Understanding their use cases allows developers to build scalable and high-performance applications.`,
      resources: [
        {
          title: 'Khan Academy - Data Structures',
          url: 'https://www.khanacademy.org/computing/computer-science/algorithms',
          type: 'tutorial'
        },
        {
          title: 'Coursera - Data Structures and Algorithms Specialization',
          url: 'https://www.coursera.org/specializations/data-structures-algorithms',
          type: 'course'
        }
      ],
      exercises: [
        {
          title: 'Implement a Stack',
          description: 'Create a stack data structure with push, pop, and peek operations'
        },
        {
          title: 'Implement a Queue',
          description: 'Create a queue data structure with enqueue and dequeue operations'
        }
      ]
    },
    'basic-algorithms': {
      title: 'Basic Algorithms',
      description: 'Master the basics of algorithms',
      content: `**Understanding basic algorithms is crucial for your development journey**, as they form the foundation of problem-solving in programming. Algorithms help in **efficient data processing, optimization, and automation**, making them essential for software development and system design.

**What is an Algorithm?**
An algorithm is a step-by-step procedure or set of rules for solving a specific problem. It takes an input, processes it, and produces an output.

✅ **Why are Algorithms Important?**
✔️ **Efficient problem-solving**
✔️ **Optimized performance and resource management**
✔️ **Essential for competitive programming & coding interviews**
✔️ **Used in real-world applications like search engines, AI, and databases**

**Types of Basic Algorithms**
**1. Searching Algorithms**
Searching algorithms are used to find an element in a collection of data.

**a) Linear Search**
A simple method that sequentially checks each element until a match is found.
✔️ **Time Complexity**: O(n)
✔️ **Use Case**: Small datasets, unsorted lists

**b) Binary Search**
A divide-and-conquer algorithm that repeatedly divides a sorted list in half to find an element.
✔️ **Time Complexity**: O(log n)
✔️ **Use Case**: Large, sorted datasets (e.g., searching in dictionaries)

**2. Sorting Algorithms**
Sorting algorithms are used to arrange elements in ascending or descending order.

**a) Bubble Sort**
Repeatedly swaps adjacent elements if they are in the wrong order.
✔️ **Time Complexity**: O(n²)
✔️ **Use Case**: Small datasets, educational purposes

**b) Selection Sort**
Finds the smallest element and swaps it with the first position, then repeats.
✔️ **Time Complexity**: O(n²)
✔️ **Use Case**: Small datasets, simple applications

**c) Insertion Sort**
Builds the sorted list one element at a time by inserting elements into their correct positions.
✔️ **Time Complexity**: O(n²)
✔️ **Use Case**: Small datasets, nearly sorted lists

**d) Merge Sort**
A divide-and-conquer algorithm that splits an array into smaller parts, sorts them, and merges them back.
✔️ **Time Complexity**: O(n log n)
✔️ **Use Case**: Large datasets, external sorting

**e) Quick Sort**
Selects a pivot element and partitions the array into two parts before sorting them recursively.
✔️ **Time Complexity**: O(n log n) (Best/Average), O(n²) (Worst)
✔️ **Use Case**: Large datasets, fast sorting

**3. Recursion**
Recursion is a technique where a function calls itself to solve a problem.

✔️ **Use Case**:

- Factorial Calculation
- Fibonacci Sequence
- Tower of Hanoi

**4. Greedy Algorithms**
A greedy algorithm makes the locally optimal choice at each step to achieve a global optimum.

✔️ **Use Case**:

- Huffman Coding (Data Compression)
- Dijkstra’s Shortest Path Algorithm
- Activity Selection Problem

**5. Dynamic Programming (DP)**
A technique that breaks down problems into smaller overlapping subproblems and stores their solutions to avoid redundant calculations.

✔️ **Use Case**:

- Fibonacci Series Optimization
- Knapsack Problem
- Longest Common Subsequence (LCS)

**Choosing the Right Algorithm**
Use Case	Recommended Algorithm
Searching in a sorted list	Binary Search
Sorting large datasets	Quick Sort, Merge Sort
Optimizing repetitive calculations	Dynamic Programming
Finding the shortest path	Dijkstra’s Algorithm

**Conclusion**
Mastering basic algorithms is essential for efficient coding. They help in solving complex problems by improving performance, scalability, and efficiency. Understanding these fundamental algorithms will make you a better problem solver and a more effective developer.`,
      resources: [
        {
          title: 'Khan Academy - Algorithms',
          url: 'https://www.khanacademy.org/computing/computer-science/algorithms',
          type: 'tutorial'
        },
        {
          title: 'Coursera - Algorithms Specialization',
          url: 'https://www.coursera.org/specializations/algorithms',
          type: 'course'
        }
      ],
      exercises: [
        {
          title: 'Implement Linear Search',
          description: 'Create a function that performs linear search on an array'
        },
        {
          title: 'Implement Bubble Sort',
          description: 'Create a function that sorts an array using bubble sort'
        }
      ]
    },
    'object-oriented-programming': {
      title: 'Object-Oriented Programming (OOP)',
      description: 'Master the principles of OOP',
      content: `**Understanding Object-Oriented Programming (OOP) is crucial for your development journey**, as it provides a structured way to design and build software. OOP allows developers to write **scalable, maintainable, and reusable code**, making it an essential paradigm for modern software development.

**What is Object-Oriented Programming?**
Object-Oriented Programming (OOP) is a programming paradigm based on the concept of objects, which encapsulate data (attributes) and behavior (methods). It promotes modular and reusable code, making development more efficient and manageable.

✅ **Why is OOP Important?**
✔️ **Modularity** – Code is structured into objects and classes.
✔️ **Reusability** – Objects and classes can be reused in different programs.
✔️ **Scalability** – Easier to manage and expand large codebases.
✔️ **Security** – Data hiding and encapsulation protect sensitive information.

**Key Principles of OOP (4 Pillars of OOP)**
**1. Encapsulation**
Encapsulation means hiding the internal state of an object and requiring all interactions to be performed through methods.
✔️ **Use Case**: Protects sensitive data and prevents unintended modifications.

**2. Abstraction**
Abstraction means hiding unnecessary details and exposing only the essential features of an object.
✔️ **Use Case**: Simplifies complex systems (e.g., using an ATM without knowing internal banking processes).

**3. Inheritance**
Inheritance allows a new class (child class) to derive properties and behaviors from an existing class (parent class).
✔️ **Use Case**: Reduces redundancy and promotes code reuse (e.g., Car class inheriting from a Vehicle class).

**4. Polymorphism**
Polymorphism enables objects to be treated as instances of their parent class, allowing the same method to perform different actions.
✔️ **Use Case**: Method overloading and method overriding allow flexibility in function behavior.

**Key Concepts in OOP**
**1. Classes and Objects**
- Class: A blueprint/template for creating objects.
- Object: An instance of a class with attributes (variables) and methods (functions).
✔️ **Use Case**: A Car class can have multiple car objects like Toyota and Honda.

**2. Methods and Constructors**
- Method: A function defined within a class that defines object behavior.
- Constructor: A special method that runs automatically when an object is created.
✔️ **Use Case**: Initializing values when creating an object.

**3. Access Modifiers (Public, Private, Protected)**
Control the visibility of attributes and methods within a class.
✔️ **Use Case**: Preventing unauthorized access to critical data.

**Real-World Applications of OOP**
✅ **Game Development** – Objects represent players, enemies, and items.
✅ **GUI Applications** – Elements like buttons, forms, and windows are objects.
✅ **Web Development** – OOP is used in frameworks like Django, Laravel, and ASP.NET.
✅ **Mobile Apps** – Android (Java/Kotlin) and iOS (Swift) development.
✅ **Banking Systems** – Secure and modular transaction management.

**Conclusion**
Mastering Object-Oriented Programming (OOP) is essential for building scalable and maintainable software. OOP principles promote code organization, reusability, and security, making it a powerful paradigm for software development.`,
      resources: [
        {
          title: 'Object-Oriented Programming Concepts',
          url: 'https://www.tutorialspoint.com/object_oriented_programming/index.htm',
          type: 'tutorial'
        },
        {
          title: 'OOP in Java',
          url: 'https://www.w3schools.com/java/java_oop.asp',
          type: 'tutorial'
        }
      ],
      exercises: [
        {
          title: 'Create a Class',
          description: 'Define a class with attributes and methods'
        },
        {
          title: 'Implement Inheritance',
          description: 'Create a child class that inherits from a parent class'
        }
      ]
    },
    'html5': {
      title: 'HTML5',
      description: 'Master the fundamentals of HTML5',
      content: `**What is HTML5?**

HTML5 (HyperText Markup Language version 5) is the latest and most advanced version of HTML, used for structuring and presenting content on the web. It introduces new features that enhance multimedia, graphics, interactivity, and semantic elements, making web development more efficient and dynamic.

**Key Features of HTML5**
**1. Semantic Elements (Improved Structure)**
HTML5 introduces semantic elements that improve readability and SEO.
Examples:

- \`\`\`html
  <header>\`\`\` – Defines the header section of a webpage.
- \`\`\`html
  <nav>\`\`\` – Represents a navigation menu.
- \`\`\`html
  <article>\`\`\` – Defines an independent piece of content.
- \`\`\`html
  <section>\`\`\` – Groups related content.
- \`\`\`html
  <footer>\`\`\` – Contains copyright or contact information.

**2. Multimedia Support (Audio & Video)**
HTML5 eliminates the need for external plugins like Flash by providing built-in support for audio and video.
Examples:

- \`\`\`html
  <audio>\`\`\` – Embeds audio files.
- \`\`\`html
  <video>\`\`\` – Embeds video files with controls.

**3. Canvas & SVG (Graphics & Animation)**
HTML5 supports 2D graphics and animations using:

- \`\`\`html
  <canvas>\`\`\` – Used for drawing graphics dynamically with JavaScript.
- \`\`\`html
  <svg>\`\`\` – Scalable Vector Graphics for high-quality images.

**4. Form Enhancements (Better Input Controls)**
HTML5 introduces new input types and attributes to improve user experience in forms.
Examples:

- \`\`\`html
  <input type="email">\`\`\` – Validates email input.
- \`\`\`html
  <input type="date">\`\`\` – Provides a date picker.
- \`\`\`html
  <input type="range">\`\`\` – Allows users to select a value from a range.
- \`\`\`html
  <input type="number">\`\`\` – Ensures only numbers are entered.

**5. Offline & Storage (Better Performance)**
HTML5 provides features for storing data offline and reducing server requests.

- LocalStorage – Stores data in the browser without expiration.
- SessionStorage – Stores data temporarily for a session.
- Cache API & Service Workers – Enable offline access and fast loading.

**6. Geolocation API (Location-Based Services)**
The Geolocation API allows web applications to detect a user’s location with permission, used for mapping and navigation.

**7. WebSockets & Web Workers (Improved Performance & Connectivity)**
- WebSockets – Enable real-time communication between the client and server.
- Web Workers – Allow running JavaScript in the background without blocking the UI.

**Advantages of HTML5**
✅ Simplifies code structure with semantic elements.
✅ Supports multimedia without third-party plugins.
✅ Enhances user experience with improved form controls.
✅ Improves SEO and accessibility.
✅ Provides offline capabilities for better performance.
✅ Enables cross-platform compatibility (mobile, tablet, desktop).

**Conclusion**
HTML5 is a powerful and flexible language that revolutionized web development by providing rich multimedia, improved structure, offline capabilities, and better user interaction. It is the foundation for modern, responsive, and dynamic web applications.`,
      resources: [
        {
          title: 'HTML5 Tutorial',
          url: 'https://www.w3schools.com/html/html5_intro.asp',
          type: 'tutorial'
        },
        {
          title: 'HTML5 Reference',
          url: 'https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5',
          type: 'article'
        }
      ],
      exercises: [
        {
          title: 'Create a Semantic Webpage',
          description: 'Build a webpage using semantic elements like <article>, <nav>, and <footer>'
        },
        {
          title: 'Embed Video and Audio',
          description: 'Embed a video and audio file using <video> and <audio> tags'
        }
      ]
    }
  }
};
