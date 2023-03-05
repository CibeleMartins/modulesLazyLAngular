import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConversionDashboardComponent } from './components/conversion-dashboard/conversion-dashboard.component';
import { GraphicComponent } from './components/graphic/graphic.component';
import { ValueCoinsComponent } from './components/value-coins/value-coins.component';


import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConvertActionComponent } from './components/convert-action/convert-action.component';
import { CryptoInfosComponent } from './components/crypto-infos/crypto-infos.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HomeCoinsModule } from './modules/home-coins/home-coins.module';
import { LoadingInterceptor } from './services/loading.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    // ValueCoinsComponent,
    // GraphicComponent,
    // ConversionDashboardComponent,
    // CryptoInfosComponent,
    // SpinnerComponent,
    // ConvertActionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    HomeCoinsModule
    
  ],  //assim,é definido características de outros módulos neste módulo
  providers: [ {
    provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
