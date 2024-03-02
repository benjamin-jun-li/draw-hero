import { useMutation } from "convex/react";
import { useState } from "react";

export const useApiMutation = (mutationFn: any) => {
  const [pending, setPending] = useState(false);
  const apiMutation = useMutation(mutationFn);
  const mutate = async (payload: any) => {
    setPending(true);
    try {
      const result = await apiMutation(payload);
      return result;
    } finally {
      setPending(false);
    }
  };

  return {
    mutate,
    pending,
  };
};
