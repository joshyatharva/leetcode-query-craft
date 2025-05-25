import EmptyState from "@/components/EmptyState";
import ResultsDisplay from "@/components/ResultsDisplay";
import SearchBar from "@/components/SearchBar";
import { SignInButton } from "@/components/SignInButton";
import ThemeToggle from "@/components/ThemeToggle";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { api } from "@/setup";
import { LeetCodeQuestion } from "@/types";
import { getErrorMessage } from "@/utils/error";
import {
  useIsMutating,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";

const Index = () => {
  const [searched, setSearched] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    {
      mutationFn: async (query: string) => {
        const response = await api.post(
          `${import.meta.env.VITE_FIREBASE_FUNCTIONS_BASE_URL}/query`,
          {
            query,
            openAIAPIKey: localStorage.getItem("openai-key") || "",
            numberOfQuestions: Number(
              localStorage.getItem("max-questions") || "20"
            ),
          }
        );
        return response.data as LeetCodeQuestion[];
      },
      onError: (error) => {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: getErrorMessage(error),
          variant: "destructive",
        });
      },
    },
    queryClient
  );

  const { data } = mutation;
  const isLoading = !!useIsMutating(mutation);
  const handleSearch = (query: string) => {
    setSearched(true);
    mutation.mutate(query);
  };

  return (
    <div className="min-h-screen flex flex-col px-4 py-8 md:px-8 lg:px-12">
      <header className="flex justify-between items-center mb-2">
        <div className="invisible">
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-2">
          <SignInButton />
          <ThemeToggle />
        </div>
      </header>

      <main
        className={cn("flex-grow flex flex-col", !searched && "justify-center")}
      >
        <div
          className={cn(
            "text-center transition-all duration-500 ease-in-out animate-fade-in mb-8",
            searched ? "scale-90 -translate-y-2" : "scale-100"
          )}
        >
          <h1 className="text-3xl font-bold font-mono mb-2">
            LeetCode Query Craft
          </h1>
          <p className="text-muted-foreground">
            Find the perfect LeetCode problems with natural language
          </p>
        </div>

        <div
          className={cn(
            "transition-all duration-300 ease-in-out",
            searched ? "mt-0" : "mt-4"
          )}
        >
          <SearchBar
            onSearch={(query) => {
              setSearched(true);
              handleSearch(query);
            }}
            hasSearched={searched}
          />
        </div>

        <div
          className={cn(
            "mt-8 transition-all duration-300",
            searched ? "opacity-100" : "opacity-0"
          )}
        >
          {data?.length > 0 ? (
            <ResultsDisplay results={data} loading={isLoading} />
          ) : (
            !isLoading && searched && <EmptyState searched={searched} />
          )}

          {isLoading && <ResultsDisplay results={[]} loading={true} />}
        </div>
      </main>
    </div>
  );
};

export default Index;
