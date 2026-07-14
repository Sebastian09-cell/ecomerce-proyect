import { api } from "./api";
import type { Product } from "../types/tipos";

export const fetchDataProduct = async () => {
  const { data } = await api.get<Product[]>("/products");
  return data;
};
