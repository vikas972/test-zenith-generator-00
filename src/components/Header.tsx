
import { Beaker, Settings2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-r from-[#243949] to-[#517fa4] text-white py-6 shadow-lg">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 group">
          <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm transition-all duration-300 group-hover:bg-white/20">
            <Beaker className="h-8 w-8 animate-pulse" />
          </div>
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Generator
            </h1>
            <p className="text-sm text-blue-100 opacity-80">
              Solution & Product Assurance
            </p>
          </div>
        </div>
        <nav className="flex items-center space-x-6">
          <a href="#" className="hover:opacity-80 transition-opacity text-blue-100 hover:text-white">Dashboard</a>
          <a href="#" className="hover:opacity-80 transition-opacity text-blue-100 hover:text-white">Projects</a>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-blue-100 hover:text-white">
                <Settings2 className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate('/knowledge-base')}>
                Product KB
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
};
