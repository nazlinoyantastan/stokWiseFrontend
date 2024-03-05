import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/component/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    // provideHttpClient(withInterceptors([urlInterceptor])),
    // {
    //   provide: APP_CONFIG,
    //   useValue: environment
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
