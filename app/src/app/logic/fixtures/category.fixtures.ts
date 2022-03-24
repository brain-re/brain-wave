import { category } from '../class/category.class';
import { ICategory } from '../interfaces/category.interface';

export class CategoryFixtures {
  static load(): ICategory[] {
    return [
      new category('Avion', 'Des objets qui volent'),
      new category('Jouets', 'Des jouets pour les enfants'),
      new category('Tank', 'Des représentation de tank de l\'armée'),
    ];
  }
}
