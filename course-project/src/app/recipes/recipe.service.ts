import {Recipe} from "../../model/recipe.model";
import {EventEmitter} from "@angular/core";
import {Ingredient} from "../../model/ingredient.model";

export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schintzel',
      'A super-tasty Schnitzel - just awesome',
      'https://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-5.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French fries', 20)
      ]),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      'https://assets.fastcompany.com/image/upload/w_596,c_limit,q_auto:best,f_auto,fl_lossy/wp-cms/uploads/2017/06/i-1-sonic-burger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]
    )
  ];

  recipeSelected = new EventEmitter<Recipe>();

  /**
   * Returns exact copy of the array - slice() without parameters
   *
   * @returns {Recipe[]}
   */
  getRecipes() {
    return this.recipes.slice();
  }


}
