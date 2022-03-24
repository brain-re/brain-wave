import { ICategory } from "./category.interface";

export interface IProduct {
  _id?: string,
  name: string,
  description: string,
  price: number,
  categories: ICategory[],
  images?: string[],
}
