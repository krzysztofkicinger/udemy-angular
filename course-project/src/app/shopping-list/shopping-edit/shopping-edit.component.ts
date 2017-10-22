import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../../model/ingredient.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput')
  nameInput: ElementRef;

  @ViewChild('amountInput')
  amountInput: ElementRef;

  @Output()
  addIngredient = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit() {
  }

  onAddIngredient() {
    // console.log("New ingredient: ", this.nameInput.nativeElement, this.amountInput.nativeElement);
    this.addIngredient.emit(new Ingredient(
      this.nameInput.nativeElement.value,
      <number> this.amountInput.nativeElement.value
    ));
  }

}
