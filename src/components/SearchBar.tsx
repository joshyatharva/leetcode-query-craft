import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { Search, Settings } from "lucide-react";
import React, { useState, useEffect } from "react";
import SettingsModal from "./SettingsModal";
import { SignInButton } from "./SignInButton";

interface SearchBarProps {
  onSearch: (query: string, count: number) => void;
  hasSearched: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, hasSearched }) => {
  const [query, setQuery] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { toast } = useToast();

  // Get max questions from localStorage
  const maxQuestions = Number(localStorage.getItem("max-questions") || "20");

  useEffect(() => {
    if (hasSearched) {
      setIsTransitioning(true);
      const timer = setTimeout(() => setIsTransitioning(false), 300); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [hasSearched]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) {
      toast({
        title: "Empty Query",
        description: "Please enter a search query",
        variant: "destructive",
      });
      return;
    }

    onSearch(query, maxQuestions);
  };

  // Dynamic classes based on search state
  const containerClasses = `w-full max-w-3xl mx-auto transition-all duration-300 ease-in-out ${
    hasSearched
      ? "py-4 sticky top-0 bg-background/80 backdrop-blur-sm z-10 border-b"
      : "py-0"
  }`;

  return (
    <div className={containerClasses}>
      {/* <div className="flex justify-end mb-2">
        <SignInButton />
      </div> */}

      <form
        onSubmit={handleSubmit}
        className={`space-y-4 ${hasSearched ? "animate-fade-in" : ""}`}
      >
        <div className="flex items-center gap-2">
          <div className="relative flex-grow">
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for problems (e.g. 'binary tree level order traversal')..."
              className="pr-10 font-mono shadow-sm"
              autoFocus
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-0 top-0 rounded-l-none h-full"
              disabled={!query.trim()}
            >
              <Search size={18} />
            </Button>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setSettingsOpen(true)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Settings size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </form>

      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
};

export default SearchBar;
