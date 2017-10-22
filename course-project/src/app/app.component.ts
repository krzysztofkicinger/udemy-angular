import {Component, OnInit} from '@angular/core';
import {MenuPositions} from "../util/menu-positions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  name = '';

  selectedMenuPosition: MenuPositions;

  selectMenuPositionCallback(menuPosition: MenuPositions) {
    console.log("New menu position: ", menuPosition);
    this.selectedMenuPosition = menuPosition;
  }

  isRecipesMenuPositionSelected() {
    return this.selectedMenuPosition === MenuPositions.RECIPES;
  }

  isShoppingListMenuPositionSelected() {
    return this.selectedMenuPosition === MenuPositions.SHOPPING_LIST;
  }

}
