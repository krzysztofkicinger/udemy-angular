import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from "../../../model/recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output()
  selectRecipe = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe("Test Recipe", "A simple recipe", "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg"),
    new Recipe("Test Recipe 2", "A simple recipe 2", "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg"),
    new Recipe("Test Recipe 3", "A simple recipe 3", "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg")
  ];

  constructor() { }

  ngOnInit() {
  }

  onSelectRecipe(recipe: Recipe) {
    this.selectRecipe.emit(recipe);
  }

}
