import {NgModule} from "@angular/core";
import {PageNotFoundComponentComponent} from "./page-not-found-component/page-not-found-component.component";
import {EditServerComponent} from "./servers/edit-server/edit-server.component";
import {ServersComponent} from "./servers/servers.component";
import {UserComponent} from "./users/user/user.component";
import {UsersComponent} from "./users/users.component";
import {HomeComponent} from "./home/home.component";
import {RouterModule, Routes} from "@angular/router";
import {ServerComponent} from "./servers/server/server.component";

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: ':id/:name',
        component: UserComponent,

      }
    ]
  },
  {
    path: 'servers',
    component: ServersComponent,
    children: [
      {
        path: ':id',
        component: ServerComponent
      },
      {
        path: ':id/edit',
        component: EditServerComponent
      }
    ]
  },
  {
    path: 'not-found',
    component: PageNotFoundComponentComponent
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
