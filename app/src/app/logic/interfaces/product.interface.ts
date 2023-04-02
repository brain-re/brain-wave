import { ICategory } from "./category.interface";

export interface IProduct {
  _id?: string,
  name: string,
  description: string,
  price: number,
  category: ICategory,
  images?: string[],
  // @todo add current user as product owner
}
