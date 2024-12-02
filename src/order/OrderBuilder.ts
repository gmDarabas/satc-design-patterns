import { Client, Product } from "../types";
import { DeliveryType, Order } from "./Order";

export class OrderBuilder {
  private products: Product[] = [];
  private deliveryType?: DeliveryType;
  private discount: number = 0;
  private orderState?: string;
  private client!: Client;

  public setClient(client: Client): OrderBuilder {
    this.client = client;
    return this;
  }

  public setProducts(products: Product[]): OrderBuilder {
    this.products = products;
    return this;
  }

  public addProduct(product: Product): OrderBuilder {
    this.products.push(product);
    return this;
  }

  public setDeliveryType(deliveryType: DeliveryType): OrderBuilder {
    this.deliveryType = deliveryType;
    return this;
  }

  public setDiscount(discount: number): OrderBuilder {
    this.discount = discount;
    return this;
  }

  public setState(state: string): OrderBuilder {
    this.orderState = state;
    return this;
  }

  public build(): Order {
    return new Order({
      client: this.client,
      products: this.products,
      deliveryType: this.deliveryType,
      discount: this.discount,
      state: this.orderState,
    });
  }
}
