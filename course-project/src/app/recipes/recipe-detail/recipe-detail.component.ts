import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../../model/recipe.model";
import {isNullOrUndefined} from "util";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {

  @Input()
  recipe: Recipe;

  isRecipeSelected() {
    return !isNullOrUndefined(this.recipe);
  }

}
