import { Client, Product } from "../types";
import { OrderState, OrderStateFactory } from "./OrderState";

type CreateOrderParams = {
  client: Client;
  deliveryType?: DeliveryType;
  discount?: number;
  products?: Product[];
  state?: string;
};

export type DeliveryType = "standard" | "express";

export class Order {
  public products: Array<Product> = [];
  public deliveryType: DeliveryType;
  public discount: number = 0;
  public client: Client;
  public state: OrderState;

  constructor({
    client,
    deliveryType = "standard",
    discount = 0,
    products = [],
    state = "Received",
  }: CreateOrderParams) {
    if (!client) {
      throw new Error("É necessário um cliente para criar o pedido");
    }

    this.client = client;
    this.deliveryType = deliveryType;
    this.state = OrderStateFactory.create(state);
    this.discount = discount;
    this.products = products;

    this.setState(this.state);
  }

  getTotal(): number {
    const subtotal = this.products.reduce((sum, item) => sum + item.price, 0);
    return subtotal - this.discount;
  }

  setState(state: OrderState): void {
    this.state = state;
    this.state.setContext(this);
  }

  nextState(): void {
    this.state.next();
  }

  getStatus(): string {
    return this.state.getStatus();
  }

  toJson(): object {
    return {
      products: this.products,
      deliveryType: this.deliveryType,
      discount: this.discount,
      client: this.client,
      state: this.state.getStatus(),
    };
  }
}
