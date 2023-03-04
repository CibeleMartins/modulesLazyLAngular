import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValueCoinsComponent } from './components/value-coins/value-coins.component';
import { GraphicComponent } from './components/graphic/graphic.component';
import { ConversionDashboardComponent } from './components/conversion-dashboard/conversion-dashboard.component';
import { HomeCoinsComponent } from './pages/home/home-coins.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CryptoInfosComponent } from './components/crypto-infos/crypto-infos.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoadingInterceptor } from './services/loading.interceptor';
import { ConvertActionComponent } from './components/convert-action/convert-action.component';


@NgModule({
  declarations: [
    AppComponent,
    ValueCoinsComponent,
    GraphicComponent,
    ConversionDashboardComponent,
    HomeCoinsComponent,
    CryptoInfosComponent,
    SpinnerComponent,
    ConvertActionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
