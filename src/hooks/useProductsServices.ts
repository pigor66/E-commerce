// productService.ts

import { AxiosResponse } from "axios";
import { Product } from "./types";
import api from "../services/api";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response: AxiosResponse<Product[]> = await api.get("/");
    return response.data;
  } catch (error) {
    throw new Error("Erro ao obter os dados");
  }
};

export const addProduct = async (newProduct: Product): Promise<Product> => {
  try {
    const response: AxiosResponse<Product> = await api.post("/", newProduct);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao adicionar o produto");
  }
};

export const updateProduct = async (
  id: number,
  updatedProduct: Product
): Promise<Product> => {
  try {
    const response: AxiosResponse<Product> = await api.put(
      `/${id}`,
      updatedProduct
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao atualizar o produto");
  }
};

export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    throw new Error("Erro ao excluir o produto");
  }
};
