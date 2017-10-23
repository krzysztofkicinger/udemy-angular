import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../../model/recipe.model";
import {isNullOrUndefined} from "util";
import {RecipeService} from "../recipe.service";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {

  @Input()
  recipe: Recipe;

  constructor(private recipeService: RecipeService) {}

  isRecipeSelected() {
    return !isNullOrUndefined(this.recipe);
  }

  addToShoppingList() {
    this.recipeService.addToShoppingList(this.recipe);
  }

}
