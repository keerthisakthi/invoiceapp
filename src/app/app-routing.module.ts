import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { ListInvoiceComponent } from './list-invoice/list-invoice.component';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';


const routes: Routes =[
  {path:'',component: CreateInvoiceComponent},
  {path:'create-invoice',component: CreateInvoiceComponent},
  {path:'list-invoice',component: ListInvoiceComponent},
];
@NgModule({
  declarations: [],
  imports: [
   RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
