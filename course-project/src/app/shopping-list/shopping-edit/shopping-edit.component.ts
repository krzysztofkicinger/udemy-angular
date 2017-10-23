import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../../model/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {

  @ViewChild('nameInput')
  nameInput: ElementRef;

  @ViewChild('amountInput')
  amountInput: ElementRef;

  /**
   * @param {ShoppingListService} shoppingListService - provided by AppModule
   */
  constructor(private shoppingListService: ShoppingListService) { }

  onAddIngredient() {
    this.shoppingListService.addIngredient(new Ingredient(
      this.nameInput.nativeElement.value,
      <number> this.amountInput.nativeElement.value
    ));
  }

}
