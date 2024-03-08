import { useMutation } from "convex/react";
import { FunctionReference, OptionalRestArgs } from "convex/server";
import { useState } from "react";
/**
 * @description A hook to use a mutation from the API
 * @param mutationFn convex's mutation
 */


export const useApiMutation = (mutationFn: FunctionReference<"mutation">) => {
  const [pending, setPending] = useState(false);
  const apiMutation = useMutation(mutationFn);
  const mutate = async (...payload: OptionalRestArgs<FunctionReference<"mutation">>) => {
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
