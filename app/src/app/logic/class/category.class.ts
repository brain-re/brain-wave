import { ICategory } from "../interfaces/category.interface";

export class category implements ICategory {
  constructor (
    public name: string,
    public description: string,
    public _id?: string,
  ) {}
}
