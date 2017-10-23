import {Ingredient} from "../../model/ingredient.model";

export class ShoppingListService {

  private _ingredients: Ingredient[] = [
    new Ingredient("Tomatoes", 3),
    new Ingredient("Apples", 14),
    new Ingredient("Cucumbers", 2),
  ];

  get ingredients(): Ingredient[] {
    return this._ingredients.slice();
  }

  addIngredient(newIngredient: Ingredient) {
    const ingredient = this._ingredients.find((i) => i.name === newIngredient.name);
    if (ingredient) {
      ingredient.amount = Number(ingredient.amount) + Number(newIngredient.amount);
    } else {
      this._ingredients.push(newIngredient);
    }
  }

}
