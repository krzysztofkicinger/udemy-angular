import {NgModule} from "@angular/core";
import {PageNotFoundComponentComponent} from "./page-not-found-component/page-not-found-component.component";
import {EditServerComponent} from "./servers/edit-server/edit-server.component";
import {ServersComponent} from "./servers/servers.component";
import {UserComponent} from "./users/user/user.component";
import {UsersComponent} from "./users/users.component";
import {HomeComponent} from "./home/home.component";
import {RouterModule, Routes} from "@angular/router";
import {ServerComponent} from "./servers/server/server.component";
import {AuthGuard} from "./auth-guard.service";
import {CanDeactivateGuard} from "./can-deactivate-guard.service";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {ServerResolver} from "./server-resolver.service";

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
    // canActivate: [ AuthGuard ],
    canActivateChild: [ AuthGuard ],
    children: [
      {
        path: ':id',
        component: ServerComponent,
        resolve: {
          server: ServerResolver
        }
      },
      {
        path: ':id/edit',
        component: EditServerComponent,
        canDeactivate: [ CanDeactivateGuard ]
      }
    ]
  },
  // {
  //   path: 'not-found',
  //   component: PageNotFoundComponentComponent
  // },
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: {
      message: 'Page not found!'
    }
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
