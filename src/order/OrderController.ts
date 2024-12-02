import { Request, Response } from "express";
import { Client, OrderMock, Product } from "../types";
import { DeliveryType, Order } from "./Order";
import { OrderBuilder } from "./OrderBuilder";

const clientsMock: Client[] = require("../_data/clients.json");
const productsMock: Product[] = require("../_data/products.json");
const orderMock: OrderMock[] = require("../_data/orders.json");

type CreateOrderBody = {
  clientId: number;
  deliveryType: DeliveryType;
  discount: number;
  products: { id: number }[];
};

class OrderController {
  public static createOrder(req: Request, res: Response) {
    const { clientId, deliveryType, discount, products }: CreateOrderBody =
      req.body;

    const client = clientsMock.find((client: Client) => client.id === clientId);
    if (!client) {
      res.status(404).json({ error: "Cliente não encontrado" });
      return;
    }

    const selectedProducts = products
      .map((productData) =>
        productsMock.find((product: Product) => product.id === productData.id)
      )
      .filter((product) => product !== undefined) as Product[];

    if (selectedProducts.length !== products.length) {
      res.status(404).json({ error: "Um ou mais produtos inválidos" });
      return;
    }

    const order = new OrderBuilder()
      .setClient(client)
      .setProducts(selectedProducts)
      .setDeliveryType(deliveryType)
      .setDiscount(discount)
      .build();

    res.status(201).json(order.toJson());
  }

  static advanceOrder(req: Request, res: Response): Response {
    const { id } = req.params;
    const orderData = orderMock.find(
      (order: OrderMock) => order.id === parseInt(id)
    );

    if (!orderData) {
      return res.status(404).json({ message: "Pedido não encontrado." });
    }

    const order = new Order({
      client: orderData.client,
      deliveryType: orderData.deliveryType,
      discount: orderData.discount,
      products: orderData.products,
      state: orderData.state,
    }); // instancia a classe de Pedido baseado no mock

    try {
      order.nextState();
      return res.json({
        message: "Estado do pedido atualizado com sucesso.",
        order: order.toJson(),
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}

export { OrderController };
