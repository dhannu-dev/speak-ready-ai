import { logout } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      alert("user logout successfully");
      router.push("/login");
    },
  });
};
