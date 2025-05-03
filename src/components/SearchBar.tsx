
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { Info, Search } from "lucide-react";
import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string, count: number) => void;
}

const MAX_RESULTS = 20;

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(5);
  const [countError, setCountError] = useState(false);
  const { toast } = useToast();

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

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center relative">
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
            className="absolute right-0 rounded-l-none"
            disabled={!query.trim() || countError}
          >
            <Search size={18} />
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <label htmlFor="count" className="text-sm font-medium whitespace-nowrap">
              Number of questions:
            </label>
            <div className="relative">
              <Input
                id="count"
                type="number"
                min={1}
                max={MAX_RESULTS}
                value={count}
                onChange={handleCountChange}
                className={`w-16 h-8 text-center px-2 ${countError ? 'border-red-500' : ''}`}
              />
              {countError && (
                <p className="absolute text-red-500 text-xs mt-0.5">
                  Max: {MAX_RESULTS}
                </p>
              )}
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Info size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Enter a natural language query to find matching LeetCode problems. 
                    For example: "easy tree problems with recursion" or "medium difficulty array problems involving binary search".
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
