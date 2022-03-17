import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { ListInvoiceComponent } from './list-invoice/list-invoice.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule,FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CreateInvoiceComponent,
    ListInvoiceComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  })
export class AppModule { }
