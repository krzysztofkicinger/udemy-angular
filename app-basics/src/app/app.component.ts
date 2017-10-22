import { Component } from '@angular/core';
import {NgModel} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: [`
    h1 {
      color: lightblue;
    } 
  `]
})
export class AppComponent {
  title = 'app';
  name = '';
}
