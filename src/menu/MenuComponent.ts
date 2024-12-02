import { Category, Product } from "../types";

export interface MenuComponent {
  display(indent: string): void;
  toJSON(): object;
}

export class CategoryComposite implements MenuComponent {
  private children: MenuComponent[] = [];
  private category: Category;

  constructor(category: Category) {
    this.category = category;
  }

  add(component: MenuComponent): void {
    this.children.push(component);
  }

  display(indent: string = ""): void {
    console.log(`${indent}Category: ${this.category.name}`);
    this.children.forEach((child) => child.display(indent + "  "));
  }

  toJSON(): any {
    return {
      id: this.category.id,
      name: this.category.name,
      children: this.children.map((child) => child.toJSON()),
    };
  }
}

export class ProductLeaf implements MenuComponent {
  constructor(private product: Product) {}

  display(indent: string = ""): void {
    console.log(`${indent}Product: ${this.product.name}`);
  }

  toJSON(): object {
    return {
      id: this.product.id,
      name: this.product.name,
    };
  }
}
