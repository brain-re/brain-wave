import { ICategory } from "./category.interface";

export interface IArticle {
  _id?: string,
  name: string,
  description: string,
  price: number,
  category: ICategory,
  images?: string[],
  // @todo add current user as article owner
}
