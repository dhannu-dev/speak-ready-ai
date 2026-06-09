import { loginUser } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};
