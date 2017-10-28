import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from "./users.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  user1Activated: boolean;
  user2Activated: boolean;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.userActivated.subscribe(
      (id: number) => {
        this.user1Activated = false;
        this.user2Activated = false;
        if(id === 1) {
          this.user1Activated = true;
        } else if(id == 2) {
          this.user2Activated = true;
        }
      }
    )

  }

  ngOnDestroy(): void {
    this.usersService.userActivated.unsubscribe();
  }

}
