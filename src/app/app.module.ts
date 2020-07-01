import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormReqComponent} from './form-req/form-req.component';
import {HttpClientModule} from '@angular/common/http';
import {EmplsService} from './form-req/empls.service';


@NgModule({
  declarations: [
    AppComponent,
    FormReqComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [EmplsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
