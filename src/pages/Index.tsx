
import { useState } from "react";
import { LeetCodeQuestion } from "@/types";
import SearchBar from "@/components/SearchBar";
import ResultsDisplay from "@/components/ResultsDisplay";
import EmptyState from "@/components/EmptyState";
import ThemeToggle from "@/components/ThemeToggle";

// Mock data for our example
const mockResults: LeetCodeQuestion[] = [
  {
    id: "1",
    title: "Two Sum",
    url: "https://leetcode.com/problems/two-sum/",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    tags: ["Array", "Hash Table"]
  },
  {
    id: "4",
    title: "Median of Two Sorted Arrays",
    url: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    difficulty: "Hard",
    description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
    tags: ["Array", "Binary Search", "Divide and Conquer"]
  },
  {
    id: "33",
    title: "Search in Rotated Sorted Array",
    url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    difficulty: "Medium",
    description: "There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k. Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.",
    tags: ["Array", "Binary Search"]
  },
  {
    id: "153",
    title: "Find Minimum in Rotated Sorted Array",
    url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
    difficulty: "Medium",
    description: "Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Find the minimum element.",
    tags: ["Array", "Binary Search"]
  },
  {
    id: "704",
    title: "Binary Search",
    url: "https://leetcode.com/problems/binary-search/",
    difficulty: "Easy",
    description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.",
    tags: ["Array", "Binary Search"]
  }
];

const Index = () => {
  const [results, setResults] = useState<LeetCodeQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (query: string, count: number) => {
    setLoading(true);
    setSearched(true);
    
    // Here we would normally call an API to get results
    // For now, let's simulate a delay and return mock data
    setTimeout(() => {
      // Filter mock results to match the query (in a real app, this would be done by the backend)
      const filteredResults = mockResults
        .filter(q => 
          query.toLowerCase().includes('binary search') 
            ? q.tags?.includes('Binary Search') 
            : true
        )
        .slice(0, count);
        
      setResults(filteredResults);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col px-4 py-8 md:px-8 lg:px-12">
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-bold font-mono">LeetCode Query Craft</h1>
          <p className="text-muted-foreground">Find the perfect LeetCode problems with natural language</p>
        </div>
        <ThemeToggle />
      </header>

      <main className="flex-grow flex flex-col items-center">
        <SearchBar onSearch={handleSearch} />
        
        {results.length > 0 ? (
          <ResultsDisplay results={results} loading={loading} />
        ) : (
          !loading && <EmptyState searched={searched} />
        )}
        
        {loading && <ResultsDisplay results={[]} loading={true} />}
      </main>

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>Made with ❤️ for developers. This is a demo application.</p>
      </footer>
    </div>
  );
};

export default Index;
