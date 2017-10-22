import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../../model/recipe.model";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input()
  recipe: Recipe;

  constructor() { }

  ngOnInit() {
  }

  isRecipeSelected() {
    return !isNullOrUndefined(this.recipe);
  }

}
