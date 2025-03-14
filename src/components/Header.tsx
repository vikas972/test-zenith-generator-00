
import { Beaker, Home, Settings2, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
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
          <Button variant="ghost" size="icon" className="text-blue-100 hover:text-white" onClick={() => navigate('/')}>
            <Home className="h-5 w-5" />
          </Button>
          <a href="#" className="hover:opacity-80 transition-opacity text-blue-100 hover:text-white">Dashboard</a>
          <a href="#" className="hover:opacity-80 transition-opacity text-blue-100 hover:text-white">Projects</a>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 rounded-full border-2 border-blue-100/20 hover:border-blue-100/40"
              >
                <User className="h-5 w-5 text-blue-100" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                Profile
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Settings2 className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => navigate('/knowledge-base')}>
                    Product Knowledge Base
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    General Settings
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
};
