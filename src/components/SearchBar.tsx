
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { Hash, Search, Settings } from "lucide-react";
import React, { useState, useEffect } from "react";
import SettingsModal from "./SettingsModal";

interface SearchBarProps {
  onSearch: (query: string, count: number) => void;
  hasSearched: boolean;
}

const MAX_RESULTS = 20;

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, hasSearched }) => {
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(5);
  const [countError, setCountError] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { toast } = useToast();

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
        variant: "destructive"
      });
      return;
    }

    if (count > MAX_RESULTS) {
      setCountError(true);
      return;
    }

    setCountError(false);
    onSearch(query, count);
  };

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setCount(isNaN(value) ? 0 : value);
    setCountError(value > MAX_RESULTS);
  };

  // Dynamic classes based on search state
  const containerClasses = `w-full max-w-3xl mx-auto transition-all duration-300 ease-in-out ${
    hasSearched 
      ? "py-4 sticky top-0 bg-background/80 backdrop-blur-sm z-10 border-b"
      : "py-0"
  }`;

  return (
    <div className={containerClasses}>
      <form onSubmit={handleSubmit} className={`space-y-4 ${hasSearched ? "animate-fade-in" : ""}`}>
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
              disabled={!query.trim() || countError}
            >
              <Search size={18} />
            </Button>
          </div>

          <div className="flex items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1.5">
                    <Hash size={18} className="text-muted-foreground" />
                    <div className="relative">
                      <Input
                        id="count"
                        type="number"
                        min={1}
                        max={MAX_RESULTS}
                        value={count}
                        onChange={handleCountChange}
                        className={`w-14 h-9 text-center px-2 ${countError ? 'border-red-500' : ''}`}
                        aria-label="Number of questions"
                      />
                      {countError && (
                        <p className="absolute text-red-500 text-xs mt-0.5">
                          Max: {MAX_RESULTS}
                        </p>
                      )}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Number of questions to display (max: {MAX_RESULTS})
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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

      <SettingsModal 
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
      />
    </div>
  );
};

export default SearchBar;
