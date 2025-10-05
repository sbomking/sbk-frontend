import { createRoot } from "solid-js";
import { createStore } from "solid-js/store";
import {
  deleteUrlAuth,
  fetchUrlAuth,
  postUrlAuth,
  putUrlAuth,
} from "@solidjs/common/FetchWsUtil";
import type { Product } from "@components/solidjs/model/Product";

const WS_URL = import.meta.env.PUBLIC_VITE_WS_URL;

function createProductFacade() {
  async function deleteProduct(product: Product, token: string): Promise<void> {
    return deleteUrlAuth("v1/products/" + product.id, token);
  }

  async function fetchProducts(token: string): Promise<Product[]> {
    return fetchUrlAuth<Product[]>("v1/products", token);
  }

  async function postProduct(
    product: Product,
    token: string,
  ): Promise<Product> {
    return postUrlAuth<Product>("v1/products", product, token);
  }

  async function putProduct(Product: Product, token: string): Promise<void> {
    return putUrlAuth("v1/products/" + Product.id, Product, token);
  }

  return { deleteProduct, fetchProducts, postProduct, putProduct };
}

export default createRoot(createProductFacade);
