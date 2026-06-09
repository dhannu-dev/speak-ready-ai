import { registerUser } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};
