import { DeliveryType } from "./order/Order";

export interface Category {
  id: number;
  name: string;
  parentId: number | null;
}

export interface Product {
  id: number;
  name: string;
  categoryId: number;
  price: number;
}

export type Client = {
  id: number;
  name: string;
  address: string;
};

export type OrderMock = {
  id: number;
  client: Client;
  products: Product[];
  deliveryType: DeliveryType;
  discount: number;
  state: string;
};

