import { useQuery } from "@tanstack/react-query";
import { fetchDataProduct } from "../api/product";

export const useProducts = () => {
  return useQuery({
    queryKey: ["product"],
    queryFn: () => fetchDataProduct(),
  });
};
