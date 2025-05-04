import EmptyState from "@/components/EmptyState";
import ResultsDisplay from "@/components/ResultsDisplay";
import SearchBar from "@/components/SearchBar";
import { SignInButton } from "@/components/SignInButton";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { LeetCodeQuestion } from "@/types";
import {
  useIsMutating,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

// Mock data for our example
const mockResults: LeetCodeQuestion[] = [
  {
    id: "1",
    title: "Two Sum",
    url: "https://leetcode.com/problems/two-sum/",
    difficulty: "Easy",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    tags: ["Array", "Hash Table"],
  },
  {
    id: "4",
    title: "Median of Two Sorted Arrays",
    url: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    difficulty: "Hard",
    description:
      "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
    tags: ["Array", "Binary Search", "Divide and Conquer"],
  },
  {
    id: "33",
    title: "Search in Rotated Sorted Array",
    url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    difficulty: "Medium",
    description:
      "There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k. Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.",
    tags: ["Array", "Binary Search"],
  },
  {
    id: "153",
    title: "Find Minimum in Rotated Sorted Array",
    url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
    difficulty: "Medium",
    description:
      "Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Find the minimum element.",
    tags: ["Array", "Binary Search"],
  },
  {
    id: "704",
    title: "Binary Search",
    url: "https://leetcode.com/problems/binary-search/",
    difficulty: "Easy",
    description:
      "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.",
    tags: ["Array", "Binary Search"],
  },
];
const mockApi = async (params: {
  query: string;
  numberOfQuestions: number;
  openAIAPIKey: string;
}): Promise<LeetCodeQuestion[]> => {
  const { query, numberOfQuestions, openAIAPIKey } = params;
  console.log("Querying API with params:", params);
  const response = await axios.post(
    "https://leetcodequery-u5qjtwelwq-uc.a.run.app",
    {
      query,
      numberOfQuestions,
      openAIAPIKey,
    }
  );
  console.log("API response:", { data: response.data });
  return response.data;
};

const Index = () => {
  const [searched, setSearched] = useState(false);

  // const [query, setQuery] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation(
    {
      mutationFn: async (query: string) => {
        console.log("HELLO CALLING HERE 1");
        const response = await axios.post(
          "https://leetcodequery-u5qjtwelwq-uc.a.run.app",
          {
            query,
            // numberOfQuestions,
            // openAIAPIKey,
          }
        );
        return response.data as LeetCodeQuestion[];
      },
      onError: (error) => {
        console.error("Error fetching data:", error);
      },
    },
    queryClient
  );
  // const { data, isLoading } = useQuery({
  //   queryKey: ["mockResults", query],
  //   queryFn: async () => {
  //     console.log("HELLO CALLING HERE 2");
  //     const response = await axios.post(
  //       "https://leetcodequery-u5qjtwelwq-uc.a.run.app",
  //       {
  //         query,
  //         // numberOfQuestions,
  //         // openAIAPIKey,
  //       }
  //     );
  //     return response.data;
  //     // const data = await mockApi({
  //     //   query,
  //     //   numberOfQuestions: 5,
  //     //   openAIAPIKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || "",
  //     // });
  //     // console.log("retning data", { data });
  //     // return data;
  //   },
  //   enabled: query?.trim?.()?.length > 0,
  //   staleTime: 1000 * 60 * 5, // 5 minutes
  // });
  const { data } = mutation;
  const isLoading = !!useIsMutating(mutation);
  const handleSearch = (query: string) => {
    console.log("Searching query:", query);
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
              console.log("Searching query:", query);
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

      {/* <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>Made with ❤️ for developers. This is a demo application.</p>
      </footer> */}
    </div>
  );
};

export default Index;
