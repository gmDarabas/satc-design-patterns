import { Request, Response } from "express";
import { CategoryComposite, MenuComponent, ProductLeaf } from "./MenuComponent";
import { Category, Product } from "../types";

const categories: Category[] = require("../_data/categories.json");
const products: Product[] = require("../_data/products.json");

export class MenuController {
  public static getMenu(_: Request, res: Response) {
    const menu: MenuComponent[] = buildMenu();
    const menuJson = menu.map((menuItem) => menuItem.toJSON());
    res.json(menuJson);
  }
}

const buildMenu = (parentId?: number): MenuComponent[] => {
  const childCategories = categories.filter((c) => c.parentId == parentId);
  const composites: CategoryComposite[] = [];

  childCategories.forEach((category) => {
    const categoryComposite = new CategoryComposite(category);

    const categoryProducts = products.filter(
      (prod) => prod.categoryId === category.id
    );

    categoryProducts.forEach((product) => {
      categoryComposite.add(new ProductLeaf(product));
    });

    const subcategories = buildMenu(category.id);
    subcategories.forEach((subcategory) => {
      categoryComposite.add(subcategory);
    });

    composites.push(categoryComposite);
  });

  return composites;
};
