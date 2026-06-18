import { practiceAPI } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePractice = () => {
  return useMutation({
    mutationFn: practiceAPI,
    onSuccess: () => {
      toast.success("Response submitted!", {
        description: "Your practice has been analyzed. Check your feedback!",
      });
    },
    onError: () => {
      toast.error("Submission failed", {
        description: "Something went wrong. Please try again.",
      });
    },
  });
};
