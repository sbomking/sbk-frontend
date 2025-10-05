import { createRoot } from "solid-js";
import { createStore } from "solid-js/store";
import {
  deleteUrlAuth,
  fetchUrlAuth,
  postUrlAuth,
  putUrlAuth,
} from "@solidjs/common/FetchWsUtil";
import type { PoProductLine, ProductLine } from "@components/solidjs/model/Product";

const WS_URL = import.meta.env.PUBLIC_VITE_WS_URL;

function createProductLineFacade() {
  const [productLines, setProductLines] = createStore<ProductLine[]>([]);

  async function deleteProductLine(
    product_line: ProductLine,
    token: string,
  ): Promise<void> {
    return deleteUrlAuth("v1/product_lines/" + product_line.id, token);
  }

  async function fetchProductLines(token: string): Promise<ProductLine[]> {
    return fetchUrlAuth<ProductLine[]>("v1/product_lines", token);
  }

  async function postProductLine(
    product_line: PoProductLine,
    token: string,
  ): Promise<ProductLine> {
    return postUrlAuth<ProductLine>("v1/product_lines", product_line, token);
  }

  async function putProductLine(
    productLine: ProductLine,
    token: string,
  ): Promise<void> {
    return putUrlAuth("v1/product_lines/" + productLine.id, productLine, token);
  }

  return {
    productLines,
    setProductLines,
    deleteProductLine,
    fetchProductLines,
    postProductLine,
    putProductLine,
  };
}

export default createRoot(createProductLineFacade);
