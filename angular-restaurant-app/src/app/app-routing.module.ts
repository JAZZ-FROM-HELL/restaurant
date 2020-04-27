import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import {ItemsComponent} from "./items/items.component";


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: HomeComponent.PATH, redirectTo: '/', pathMatch: 'full' },
  { path: LoginComponent.PATH, component: LoginComponent },
  { path: ItemsComponent.PATH, component: ItemsComponent, canActivate: [AuthGuard]  },
  // otherwise redirect to home
  //{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
