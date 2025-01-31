import { Beaker } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-[#243949] to-[#517fa4] text-white py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Beaker className="h-8 w-8" />
          <div>
            <h1 className="text-2xl font-bold">Generator</h1>
            <p className="text-sm opacity-80">Solution & Product Assurance</p>
          </div>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="hover:opacity-80 transition-opacity">Dashboard</a>
          <a href="#" className="hover:opacity-80 transition-opacity">Projects</a>
          <a href="#" className="hover:opacity-80 transition-opacity">Settings</a>
        </nav>
      </div>
    </header>
  );
};