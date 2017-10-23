import {Recipe} from "../../model/recipe.model";
import {EventEmitter} from "@angular/core";

export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe("Test Recipe", "A simple recipe", "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg"),
    new Recipe("Test Recipe 2", "A simple recipe 2", "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg"),
    new Recipe("Test Recipe 3", "A simple recipe 3", "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg")
  ];

  selectRecipe = new EventEmitter<Recipe>();

  /**
   * Returns exact copy of the array - slice() without parameters
   *
   * @returns {Recipe[]}
   */
  getRecipes() {
    return this.recipes.slice();
  }


}
