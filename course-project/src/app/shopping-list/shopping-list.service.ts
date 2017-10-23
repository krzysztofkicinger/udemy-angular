import {Ingredient} from "../../model/ingredient.model";
import {EventEmitter} from "@angular/core";

export class ShoppingListService {

  private _ingredients: Ingredient[] = [
    new Ingredient("Tomatoes", 3),
    new Ingredient("Apples", 14),
    new Ingredient("Cucumbers", 2),
  ];

  ingredientsChanged = new EventEmitter<Ingredient[]>();

  get ingredients(): Ingredient[] {
    return this._ingredients.slice();
  }

  addIngredients(ingredients: Ingredient[]) {
    ingredients.forEach(i => this.addIngredient(i));
  }

  addIngredient(newIngredient: Ingredient) {
    const ingredient = this._ingredients.find((i) => i.name === newIngredient.name);
    if (ingredient) {
      ingredient.amount = Number(ingredient.amount) + Number(newIngredient.amount);
    } else {
      this._ingredients.push(newIngredient);
    }
    this.ingredientsChanged.emit(this.ingredients);
  }

}
