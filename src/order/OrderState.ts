import { Order } from "./Order";

abstract class OrderState {
  protected context!: Order;

  setContext(order: Order): void {
    this.context = order;
  }

  abstract next(): void;
  abstract getStatus(): string;
}

class OrderReceived extends OrderState {
  next(): void {
    this.context.setState(new OrderProcessing());
  }
  getStatus(): string {
    return "Pedido recebido.";
  }
}

class OrderProcessing extends OrderState {
  next(): void {
    this.context.setState(new OrderShipped());
  }
  getStatus(): string {
    return "Pedido em processamento.";
  }
}

class OrderShipped extends OrderState {
  next(): void {
    this.context.setState(new OrderDelivered());
  }
  getStatus(): string {
    return "Pedido enviado.";
  }
}

class OrderDelivered extends OrderState {
  next(): void {
    throw new Error("Pedido já foi entregue. Não é possível avançar.");
  }
  getStatus(): string {
    return "Pedido entregue.";
  }
}

class OrderStateFactory {
  static create(state: string): OrderState {
    switch (state) {
      case "Received":
        return new OrderReceived();
      case "Processing":
        return new OrderProcessing();
      case "Shipped":
        return new OrderShipped();
      case "Delivered":
        return new OrderDelivered();
      default:
        throw new Error("Estado inválido.");
    }
  }
}

export {
  Order,
  OrderState,
  OrderReceived,
  OrderProcessing,
  OrderShipped,
  OrderDelivered,
  OrderStateFactory,
};
