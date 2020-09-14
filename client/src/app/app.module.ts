import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizationLayoutComponent } from './shared/layouts/authorization-layout/authorization-layout.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { LoginPageComponent } from './pages/authorization/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/authorization/registration-page/registration-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertComponent } from './shared/components/alert/alert.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./shared/classes/token.interceptor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AccountsPageComponent } from './pages/main/accounts-page/accounts-page.component';
import { NewAccountPageComponent } from './pages/main/accounts-page/new-account-page/new-account-page.component';
import {AccountPageComponent} from "./pages/main/account-page/account-page.component";
import { AuthorizationModalComponent } from './shared/components/authorization-modal/authorization-modal.component';
import { AboutPageComponent } from './pages/main/about-page/about-page.component';
import { ProfilePageComponent } from './pages/main/profile-page/profile-page.component';
import { TransactionComponent } from './pages/main/account-page/transaction/transaction.component';
import { TransactionModalComponent } from './pages/main/account-page/transaction/transaction-modal/transaction-modal.component';
import { TransactionListComponent } from './pages/main/account-page/transaction/transaction-list/transaction-list.component';
import { TransactionFilterComponent } from './pages/main/account-page/transaction/transaction-filter/transaction-filter.component';
import { ContactModalComponent } from './pages/main/about-page/contact-modal/contact-modal.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from "@angular/material/core";

@NgModule({
  declarations: [
    AppComponent,
    AuthorizationLayoutComponent,
    MainLayoutComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    AlertComponent,
    LoaderComponent,
    AccountsPageComponent,
    NewAccountPageComponent,
    AccountPageComponent,
    AuthorizationModalComponent,
    AboutPageComponent,
    ProfilePageComponent,
    TransactionComponent,
    TransactionModalComponent,
    TransactionListComponent,
    TransactionFilterComponent,
    ContactModalComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        MatListModule,
        MatDialogModule,
        MatSidenavModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRippleModule
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: TokenInterceptor }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
