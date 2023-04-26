import { ICategory } from "../interfaces/category.interface";
import { IArticle } from "../interfaces/article.interface";

export class article implements IArticle {
  constructor (
    public name: string,
    public description: string,
    public price: number,
    public category: ICategory,
    public images?: string[],
    public _id?: string,
  ) {}
}
