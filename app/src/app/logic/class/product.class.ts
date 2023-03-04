import { ICategory } from "../interfaces/category.interface";
import { IProduct } from "../interfaces/product.interface";
import { IUser } from "../interfaces/user.interface";

export class product implements IProduct {
  constructor (
    public name: string,
    public description: string,
    public price: number,
    public categories: ICategory[],
    public images?: string[],
    public _id?: string,
  ) {}
}
