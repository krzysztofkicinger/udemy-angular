import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {MenuPositions} from "../../util/menu-positions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent  implements OnInit {

  @Output()
  selectMenuPosition = new EventEmitter<MenuPositions>();

  ngOnInit() {
    this.onSelectRecipesMenuPosition();
  }

  onSelectRecipesMenuPosition() {
    this.onSelectMenuPosition(MenuPositions.RECIPES)
  }

  onSelectShoppingMenuPosition() {
    this.onSelectMenuPosition(MenuPositions.SHOPPING_LIST)
  }

  private onSelectMenuPosition(menuPosition: MenuPositions) {
    this.selectMenuPosition.emit(menuPosition);
  }

}
