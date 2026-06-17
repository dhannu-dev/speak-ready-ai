import { practiceAPI } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export const usePractice = () => {
  return useMutation({
    mutationFn: practiceAPI,
    onSuccess: (data) => {
      alert("your response send successfully");
    },

    onError: () => {
      console.log("error");
    },
  });
};
