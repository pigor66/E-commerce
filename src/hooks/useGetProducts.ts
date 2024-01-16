import { useQuery } from "react-query";

export const useProducts = () => {
  return useQuery("products", async () => {
    const response = await fetch(
      "https://65a04dee600f49256fafd1ae.mockapi.io/products"
    );
    if (!response.ok) {
      throw new Error("Erro ao obter os dados");
    }
    return response.json();
  });
};

export const useProduct = (id: string | undefined) => {
  return useQuery(["product", id], async () => {
    const response = await fetch(
      `https://65a04dee600f49256fafd1ae.mockapi.io/products/${id}`
    );
    if (!response.ok) {
      throw new Error("Erro ao obter os dados do produto");
    }
    return response.json();
  });
};
