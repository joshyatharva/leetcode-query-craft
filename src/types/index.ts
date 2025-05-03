
export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface LeetCodeQuestion {
  id: string;
  title: string;
  url: string;
  difficulty: Difficulty;
  description: string;
  tags?: string[];
}
