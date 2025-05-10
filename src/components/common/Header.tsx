import React from 'react';
import { Link } from 'react-router-dom';
// Import ThemeToggle from its dedicated file
import ThemeToggle from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react'; // Using Feather as an example logo icon

// Define the Header component
const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center mx-auto px-4">
        <Link to="/" className="mr-6 flex items-center space-x-2">
           {/* Example Logo Icon */}
          <span className="font-semibold sm:inline-block">AI Quiz App</span> {/* Hide text on very small screens if needed */}
        </Link>

        {/* Optional Navigation Links could go here */}
        {/* <nav className="flex flex-1 items-center space-x-4">
          <Link to="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">About</Link>
          </nav> */}

        <div className="flex flex-1 items-center justify-end space-x-2">
           {/* Home Button */}
           <Button variant="ghost" size="icon" asChild>
             <Link to="/" aria-label="Go to homepage">
               <Home className="h-5 w-5" />
             </Link>
           </Button>

           {/* Use the imported ThemeToggle component */}
           <ThemeToggle />

           {/* Add other header items here if needed (e.g., User Profile/Login Button) */}
           {/* <Button variant="outline" size="sm">Login</Button> */}
        </div>
      </div>
    </header>
  );
};

// **** REMOVE THE LOCAL ThemeToggle DEFINITION ****
// Delete the entire 'function ThemeToggle() { ... }' block that was previously here.
// Do NOT have a second 'export default ThemeToggle' here.

// Ensure there is only ONE default export for the Header component
export default Header;