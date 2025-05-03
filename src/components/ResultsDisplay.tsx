
import { LeetCodeQuestion } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface ResultsDisplayProps {
  results: LeetCodeQuestion[];
  loading: boolean;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, loading }) => {
  if (loading) {
    return (
      <div className="w-full max-w-3xl mx-auto mt-8 animate-pulse">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="mb-4 bg-secondary/40">
            <CardHeader className="h-12"></CardHeader>
            <CardContent>
              <div className="h-16"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      {results.map((question) => (
        <Card 
          key={question.id} 
          className="mb-4 hover:shadow-md transition-shadow duration-200 animate-slide-up border-l-4"
          style={{
            borderLeftColor: 
              question.difficulty === "Easy" 
                ? "rgb(74, 222, 128)" 
                : question.difficulty === "Medium" 
                  ? "rgb(250, 204, 21)" 
                  : "rgb(248, 113, 113)"
          }}
        >
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <a 
              href={question.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-mono font-medium text-lg hover:text-primary flex items-center gap-1 group"
            >
              {question.title}
              <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <Badge 
              className={`badge-${question.difficulty.toLowerCase()}`}
            >
              {question.difficulty}
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">{question.description}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {question.tags?.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs font-mono">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ResultsDisplay;
