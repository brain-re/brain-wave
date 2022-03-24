import { IProduct } from '../interfaces/product.interface';
import { product } from '../class/product.class';
import { category } from '../class/category.class';
import { ICategory } from '../interfaces/category.interface';
import { CategoryFixtures } from './category.fixtures';



let products: IProduct[] = [
  new product(
    'Avion à hélices',
    'Un avion avec des hélices rotatives.',
    10.56,
    [new category('Avion', 'Jouet')],
    ['https://static.fnac-static.com/multimedia/FR/Images_Produits/FR/fnac.com/Visual_Principal_340/5/3/0/7312350302035/tsp20130226181013/Brio-Avion-a-helices.jpg'],
    'avion-a-helices'
  ),
  new product(
    "Char d'assaut",
    "Un char d'assaut.",
    10.56,
    [new category('Jouet', 'Un jouet')],
    ['https://www.cdiscount.com/pdt2/9/5/6/1/700x700/auc0754587271956/rw/jouet-de-reservoir-a-inertie-rotation-a-360-degres.jpg', 'https://www.cdiscount.com/pdt2/9/5/6/3/700x700/auc0754587271956/rw/jouet-de-reservoir-a-inertie-rotation-a-360-degres.jpg', 'https://www.cdiscount.com/pdt2/9/5/6/2/700x700/auc0754587271956/rw/jouet-de-reservoir-a-inertie-rotation-a-360-degres.jpg'],
    'avion-a-helices'
  ),
];

export class ProductFixtures {
  static load(): IProduct[] {

    let categories = CategoryFixtures.load();

    return [
      new product(
        'Avion à hélices',
        'Un avion avec des hélices rotatives.',
        10.56,
        [categories.find((e) => e.name == 'Avion'), categories.find((e) => e.name == 'Jouets')],
        ['https://static.fnac-static.com/multimedia/FR/Images_Produits/FR/fnac.com/Visual_Principal_340/5/3/0/7312350302035/tsp20130226181013/Brio-Avion-a-helices.jpg'],
        '1a5156155z9'
      ),
      new product(
        'Char d\'assaut',
        'Un char d\'assaut.',
        10.56,
        [categories.find((e) => e.name == 'Tank'), categories.find((e) => e.name == 'Jouets')],
        ['https://www.cdiscount.com/pdt2/9/5/6/1/700x700/auc0754587271956/rw/jouet-de-reservoir-a-inertie-rotation-a-360-degres.jpg', 'https://www.cdiscount.com/pdt2/9/5/6/3/700x700/auc0754587271956/rw/jouet-de-reservoir-a-inertie-rotation-a-360-degres.jpg', 'https://www.cdiscount.com/pdt2/9/5/6/2/700x700/auc0754587271956/rw/jouet-de-reservoir-a-inertie-rotation-a-360-degres.jpg'],
        '165151fd51fd6d'
      ),
    ];
  }
}
