import { Quiz } from '@/types';

export const mockQuizzes: Quiz[] = [
  {
    id: 'react-basics',
    title: 'React Basics',
    description: 'Test your fundamental knowledge of React.',
    questions: [
      {
        id: 'q1',
        text: 'What is JSX?',
        type: 'multiple-choice',
        choices: [
          { id: 'q1a1', text: 'A JavaScript syntax extension' },
          { id: 'q1a2', text: 'A templating engine' },
          { id: 'q1a3', text: 'A CSS preprocessor' },
          { id: 'q1a4', text: 'A database query language' },
        ],
        correctAnswer: 'q1a1',
        explanation: 'JSX stands for JavaScript XML. It allows you to write HTML-like structures within your JavaScript code.',
        hint: 'Think about how you write component structure in React files.',
        followUp: {
          correct: 'Great! Can you name a benefit of using JSX?',
          incorrect: 'Not quite. JSX is closely related to JavaScript itself. Want to try again or need more explanation?',
        }
      },
      {
        id: 'q2',
        text: 'What function is used to render a React component to the DOM?',
        type: 'free-text',
        correctAnswer: 'ReactDOM.createRoot().render()', // Or older ReactDOM.render()
        explanation: '`ReactDOM.createRoot(domNode).render(reactNode)` (or the legacy `ReactDOM.render`) is used to mount the React application into a specific DOM element.',
        hint: 'It involves the `ReactDOM` library and a method often called at the entry point of the app.',
         followUp: {
          correct: 'Exactly! Do you know what `createRoot` replaced?',
          incorrect: 'Close, but look for the specific method in the ReactDOM library used for rendering.',
        }
      },
      {
        id: 'q3',
        text: 'What is the purpose of `useState` hook?',
        type: 'multiple-choice',
        choices: [
          { id: 'q3a1', text: 'To perform side effects' },
          { id: 'q3a2', text: 'To manage state in functional components' },
          { id: 'q3a3', text: 'To handle routing' },
          { id: 'q3a4', text: 'To fetch data' },
        ],
        correctAnswer: 'q3a2',
        explanation: 'The `useState` hook allows functional components to declare and manage local state variables.',
        hint: 'It\'s one of the most fundamental React Hooks for managing component data that changes over time.',
         followUp: {
          correct: 'Perfect! Can you describe what `useState` returns?',
          incorrect: 'Think about what functional components needed before Hooks arrived. `useState` addresses that need.',
        }
      },
      {
        id: 'q4',
        text: 'What does the useEffect hook do in React?',
        type: 'multiple-choice',
        choices:[
          { id: 'q4a1', text: 'Manages component styles' },
          { id: 'q4a2', text: 'Adds props to child components' },
          { id: 'q4a3', text: 'Performs side effects in function components' },
          { id: 'q4a4', text: 'Connects to Redux store' },
        ],
        correctAnswer: 'q4a3',
        explanation: 'useEffect() is used for handling side effects like fetching data or subscriptions.',
        hint: 'Often used for operations that need to happen after the component has rendered.',
        followUp: {
          correct: 'Great! Can you give an example of a side effect where `useEffect` would be useful?',
          incorrect: 'Remember, `useEffect` runs after rendering and is perfect for things like data fetching or subscriptions.',
        }
      },
      {
        id: 'q5',
        text: 'How do you access props in a React functional component?',
        type: 'free-text',
        correctAnswer: 'props.propertyName',
        explanation: 'In functional components, props are accessed using dot notation like `props.name`.',
        hint: 'It uses dot notation.',
        followUp: {
          correct: 'Nice! That’s the basic way to read values passed into components.',
          incorrect: 'Think of how you access object properties in JavaScript.',
        }
      }
      // Add more questions...
    ],
  },
  {
  id: 'typescript-basics',
  title: 'TypeScript Basics',
  description: 'Assess your foundational understanding of TypeScript.',
  questions: [
    {
      id: 'ts1',
      text: 'What is the primary purpose of TypeScript?',
      type: 'multiple-choice',
      choices: [
        { id: 'ts1a1', text: 'To improve runtime performance' },
        { id: 'ts1a2', text: 'To add static type checking to JavaScript' },
        { id: 'ts1a3', text: 'To replace HTML and CSS' },
        { id: 'ts1a4', text: 'To provide backend services' },
      ],
      correctAnswer: 'ts1a2',
      explanation: 'TypeScript extends JavaScript by adding optional static type checking, helping developers catch errors early.',
      hint: 'Think about preventing bugs before the code even runs.',
      followUp: {
        correct: 'Awesome! Can you name one advantage of static typing?',
        incorrect: 'Nope, TypeScript is about catching errors *before* running the code. Want to try again?',
      }
    },
    {
      id: 'ts2',
      text: 'Which keyword is used to declare a variable with a specific type in TypeScript?',
      type: 'multiple-choice',
      choices: [
        { id: 'ts2a1', text: '`typedef`' },
        { id: 'ts2a2', text: '`define`' },
        { id: 'ts2a3', text: '`let` or `const` with a type annotation' },
        { id: 'ts2a4', text: '`type`' },
      ],
      correctAnswer: 'ts2a3',
      explanation: 'You use `let` or `const` followed by `: type` to declare variables with types in TypeScript.',
      hint: 'It’s similar to JavaScript, just with a type added.',
      followUp: {
        correct: 'Correct! Do you know how to declare an array of numbers using this?',
        incorrect: 'Close, but you use `let` or `const` as in JS, just with `: type` after the variable name.',
      }
    },
    {
      id: 'ts3',
      text: 'How do you define a custom type for an object in TypeScript?',
      type: 'multiple-choice',
      choices: [
        { id: 'ts3a1', text: 'Using `interface` or `type`' },
        { id: 'ts3a2', text: 'Using `object.defineType()`' },
        { id: 'ts3a3', text: 'Using `JSON.schema`' },
        { id: 'ts3a4', text: 'Using `className`' },
      ],
      correctAnswer: 'ts3a1',
      explanation: 'Custom types in TypeScript are typically declared using the `type` alias or `interface` keyword.',
      hint: 'One of the keywords is also used in OOP design.',
      followUp: {
        correct: 'Nice! Do you prefer `interface` or `type` for objects, and why?',
        incorrect: 'Nope. Think about how you described the *shape* of an object in TS.',
      }
    },
    {
      id: 'ts4',
      text: 'What will the type of `let age: number = "25";` cause?',
      type: 'free-text',
      correctAnswer: 'Type error',
      explanation: 'A string is being assigned to a variable declared as a `number`. TypeScript will throw a compile-time error.',
      hint: 'Think about what happens when a string is assigned to a number.',
      followUp: {
        correct: 'Exactly! That’s the power of type safety.',
        incorrect: 'That’s a mistake TypeScript is built to catch. Want a refresher on type annotations?',
      }
    },
    {
      id: 'ts5',
      text: 'Write the correct type annotation for a function that takes two numbers and returns a number.',
      type: 'free-text',
      correctAnswer: '(a: number, b: number) => number',
      explanation: 'This syntax describes a function with two parameters of type number and a return type of number.',
      hint: 'The format is: `(param1: type, param2: type) => returnType`',
      followUp: {
        correct: 'Well done! Can you now try the same for a function returning void?',
        incorrect: 'Not quite. Try to follow the arrow function type syntax.',
      }
    }
  ]
},
{
  id: 'mixed-quiz',
  title: 'Mix Up!!',
  description: 'Test your knowledge of React, TS, JS and Tailwind.',
  questions: [
    // Question 1 (MCQ - React)
    {
      id: 'q1',
      text: 'Which method is used to handle side effects in React?',
      type: 'multiple-choice',
      choices: [
        { id: 'q1a1', text: 'useEffect' },
        { id: 'q1a2', text: 'useState' },
        { id: 'q1a3', text: 'useCallback' },
        { id: 'q1a4', text: 'useReducer' },
      ],
      correctAnswer: 'q1a1',
      explanation: 'useEffect is used to handle side effects like fetching data or subscribing to services.',
      hint: 'It’s often used for tasks that happen after the component renders.',
      followUp: {
        correct: 'Great! Can you give an example of a side effect where `useEffect` would be useful?',
        incorrect: 'Remember, `useEffect` is used to run side effects like fetching data after a component renders.',
      }
    },
    // Question 2 (Free Text - TypeScript)
    {
      id: 'q2',
      text: 'How do you declare a variable with a specific type in TypeScript?',
      type: 'free-text',
      correctAnswer: 'let variableName: type;',
      explanation: 'In TypeScript, we can specify the type after a colon, e.g., `let age: number;`',
      hint: 'It’s similar to JavaScript, but with an added type declaration.',
      followUp: {
        correct: 'Perfect! Now, can you try declaring an array of strings?',
        incorrect: 'Think about how you add a type after a variable name in TypeScript.',
      }
    },
    // Question 3 (Free Text - JavaScript)
    {
      id: 'q3',
      text: 'Write a JavaScript function to reverse a string.',
      type: 'free-text',
      correctAnswer: 'function reverseString(str) { return str.split("").reverse().join(""); }',
      explanation: 'We can reverse a string by converting it into an array, reversing the array, and then joining it back.',
      hint: 'You can use `.split()`, `.reverse()`, and `.join()` to manipulate the string.',
      followUp: {
        correct: 'Great job! Want to try it using a loop?',
        incorrect: 'Remember, you can split the string, reverse the array, and join it back to a string.',
      }
    },
    // Question 4 (MCQ - TailwindCSS)
    {
      id: 'q4',
      text: 'What class would you use to center text horizontally in TailwindCSS?',
      type: 'multiple-choice',
      choices: [
        { id: 'q4a1', text: 'text-center' },
        { id: 'q4a2', text: 'justify-center' },
        { id: 'q4a3', text: 'align-center' },
        { id: 'q4a4', text: 'center-text' },
      ],
      correctAnswer: 'q4a1',
      explanation: 'The `text-center` class in TailwindCSS is used to center text horizontally.',
      hint: 'It’s related to text alignment.',
      followUp: {
        correct: 'Nice work! Can you now try centering content vertically?',
        incorrect: 'Think about how text is aligned in CSS. Tailwind uses utility classes like `text-center`.',
      }
    },
    // Question 5 (MCQ - JavaScript)
    {
      id: 'q5',
      text: 'Which of the following is a way to define a function in JavaScript?',
      type: 'multiple-choice',
      choices: [
        { id: 'q5a1', text: 'function myFunction() {}' },
        { id: 'q5a2', text: 'def myFunction() {}' },
        { id: 'q5a3', text: 'func myFunction() {}' },
        { id: 'q5a4', text: 'function: myFunction() {}' },
      ],
      correctAnswer: 'q5a1',
      explanation: 'In JavaScript, we define a function using the `function` keyword.',
      hint: 'It’s a keyword followed by the function name and parentheses.',
      followUp: {
        correct: 'Correct! Can you now define an anonymous function?',
        incorrect: 'Think about how you declare a function in JavaScript.',
      }
    },
    // Question 6 (MCQ - React)
    {
      id: 'q6',
      text: 'Which hook is used to manage state in React functional components?',
      type: 'multiple-choice',
      choices: [
        { id: 'q6a1', text: 'useState' },
        { id: 'q6a2', text: 'useEffect' },
        { id: 'q6a3', text: 'useReducer' },
        { id: 'q6a4', text: 'useMemo' },
      ],
      correctAnswer: 'q6a1',
      explanation: 'The `useState` hook is used to manage state in React functional components.',
      hint: 'It is one of the most commonly used hooks in React.',
      followUp: {
        correct: 'Perfect! Now, can you explain how to update the state using `useState`?',
        incorrect: 'Remember, `useState` is used for managing state in a component.',
      }
    },
    // Question 7 (Free Text - TypeScript)
    {
      id: 'q7',
      text: 'What is the default type of a variable if no type is specified in TypeScript?',
      type: 'free-text',
      correctAnswer: 'any',
      explanation: 'If no type is explicitly defined in TypeScript, the variable is of type `any` by default.',
      hint: 'It’s like the fallback type in TypeScript.',
      followUp: {
        correct: 'Exactly! Do you know how to avoid using `any`?',
        incorrect: 'Think about what happens when TypeScript can’t infer the type automatically.',
      }
    },
    // Question 8 (MCQ - TailwindCSS)
    {
      id: 'q8',
      text: 'How do you add a margin of 4 units in TailwindCSS?',
      type: 'multiple-choice',
      choices: [
        { id: 'q8a1', text: 'm-4' },
        { id: 'q8a2', text: 'margin-4' },
        { id: 'q8a3', text: 'ml-4' },
        { id: 'q8a4', text: 'mt-4' },
      ],
      correctAnswer: 'q8a1',
      explanation: 'The `m-4` class in TailwindCSS applies a margin of 4 units to all sides.',
      hint: 'The `m` stands for margin, and `4` represents the spacing value.',
      followUp: {
        correct: 'Correct! Can you now try applying a margin to just the top?',
        incorrect: 'Think about how you can apply margin using Tailwind’s utility classes.',
      }
    },
    // Question 9 (Free Text - JavaScript)
    {
      id: 'q9',
      text: 'Write a JavaScript function to check if a number is even.',
      type: 'free-text',
      correctAnswer: 'function isEven(num) { return num % 2 === 0; }',
      explanation: 'This function checks if a number is even by using the modulus operator.',
      hint: 'The modulus operator (`%`) gives the remainder when dividing two numbers.',
      followUp: {
        correct: 'Nice! Can you now write a function to check if a number is odd?',
        incorrect: 'Remember, the modulus operator can help you check even or odd numbers.',
      }
    },
    // Question 10 (Free Text - TailwindCSS)
    {
      id: 'q10',
      text: 'Write the TailwindCSS class to apply padding of 8 units.',
      type: 'free-text',
      correctAnswer: 'p-8',
      explanation: 'The `p-8` class in TailwindCSS applies padding of 8 units to all sides.',
      hint: 'The `p` stands for padding, and `8` represents the spacing value.',
      followUp: {
        correct: 'Great! Now, can you try adding padding to the top only?',
        incorrect: 'Think about how padding is applied using utility classes in Tailwind.',
      }
    }
  ]
}

  // Add more quizzes...
];

// Mock AI responses for chatbot (simple example)
export const mockChatResponses: Record<string, string> = {
  "hello": "Hi there! How can I help you with the quiz?",
  "help": "I can clarify questions, provide hints (if available), or explain concepts related to the quiz topic. What do you need help with?",
  "hint": "Sure, let me see if I can provide a hint for the current question.", // Logic to get actual hint needed in component
  "explain jsx": "JSX is a syntax extension for JavaScript that looks similar to HTML. It makes writing React elements more intuitive.",
  "default": "That's an interesting point! Let's focus on the current question for now. Do you need a hint or clarification on it?",
};

// Simulate fetching quizzes (replace with actual API call later)
export const fetchQuizzes = async (): Promise<Quiz[]> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  return mockQuizzes;
};

// Simulate fetching a single quiz
export const fetchQuizById = async (id: string): Promise<Quiz | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockQuizzes.find(quiz => quiz.id === id);
};