import { Component, OnInit } from '@angular/core';
import {Ingredient} from "../../model/ingredient.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [
    new Ingredient("Tomatoes", 3),
    new Ingredient("Apples", 14),
    new Ingredient("Cucumbers", 2),
  ];


  constructor() { }

  ngOnInit() {
  }

}
