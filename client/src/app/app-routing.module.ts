import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthorizationLayoutComponent} from "./shared/layouts/authorization-layout/authorization-layout.component";
import {LoginPageComponent} from "./pages/authorization/login-page/login-page.component";
import {RegistrationPageComponent} from "./pages/authorization/registration-page/registration-page.component";
import {MainLayoutComponent} from "./shared/layouts/main-layout/main-layout.component";
import {AuthorizationGuard} from "./shared/classes/authorization.guard";
import {AccountsPageComponent} from "./pages/main/accounts-page/accounts-page.component";
import {NewAccountPageComponent} from "./pages/main/accounts-page/new-account-page/new-account-page.component";
import {AccountPageComponent} from "./pages/main/account-page/account-page.component";
import {AboutPageComponent} from "./pages/main/about-page/about-page.component";
import {ProfilePageComponent} from "./pages/main/profile-page/profile-page.component";
import {TransactionComponent} from "./pages/main/account-page/transaction/transaction.component";

const routes: Routes = [
  {
    path: '', component: AuthorizationLayoutComponent, children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
      { path: 'registration', component: RegistrationPageComponent }
    ]
  },
  {
    path: '', component: MainLayoutComponent, canActivate: [AuthorizationGuard], children: [
      { path: 'accounts', component: AccountsPageComponent },
      { path: 'accounts/new', component: NewAccountPageComponent },
      { path: 'accounts/:id', component: NewAccountPageComponent },
      { path: 'about', component: AboutPageComponent },
      { path: 'profile', component: ProfilePageComponent },
      { path: 'account/:id', component: AccountPageComponent },
      { path: 'transaction/:id', component: TransactionComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
