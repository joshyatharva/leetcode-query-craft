
import { SearchX } from "lucide-react";

interface EmptyStateProps {
  searched: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ searched }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
      <div className="rounded-full bg-secondary p-4 mb-4">
        <SearchX size={32} className="text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">
        {searched ? "No results found" : "Search for LeetCode problems"}
      </h3>
      <p className="text-muted-foreground max-w-md">
        {searched 
          ? "Try adjusting your search query or increasing the number of results."
          : "Enter a natural language query above to find matching LeetCode problems."}
      </p>
    </div>
  );
};

export default EmptyState;
