import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recipe} from "../../../../model/recipe.model";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input()
  recipe: Recipe;

  @Output()
  selectRecipe = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit() {
  }

  onSelectRecipe(recipe: Recipe) {
    this.selectRecipe.emit(recipe);
  }

}
