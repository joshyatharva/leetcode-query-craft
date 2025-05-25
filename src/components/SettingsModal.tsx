import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsModal = ({ open, onOpenChange }: SettingsModalProps) => {
  const [openAIKey, setOpenAIKey] = useState(
    () => localStorage.getItem("openai-key") || ""
  );
  const [maxQuestions, setMaxQuestions] = useState(
    () => localStorage.getItem("max-questions") || "20"
  );
  const { toast } = useToast();

  const handleSave = () => {
    // Save settings to localStorage
    localStorage.setItem("openai-key", openAIKey);
    localStorage.setItem("max-questions", maxQuestions);

    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully",
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Configure your LeetCode Query Craft settings
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="openai-key">OpenAI API Key</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>
                      OpenAI Key should support gpt-4o and embedding generation
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="openai-key"
              type="password"
              value={openAIKey}
              onChange={(e) => setOpenAIKey(e.target.value)}
              placeholder="sk-..."
              className="font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="max-questions">Maximum Questions</Label>
            <Input
              id="max-questions"
              type="number"
              min="1"
              max="50"
              value={maxQuestions}
              onChange={(e) => setMaxQuestions(e.target.value)}
              className="font-mono"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
