import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InvoiceService } from '../services/invoice.service';

@Component({
  selector: 'app-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.css']
})
export class ListInvoiceComponent implements OnInit {

  listInvoices :any;
  constructor( private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.invoiceService.listInvoices().subscribe(data => {
        this.listInvoices = data;
    })
    
  }

  getAllInvoices(){
    this.invoiceService.listInvoices().subscribe(data => {
      this.listInvoices = data;
  })
  }

  deleteInvoice(invoice:any){
    this.invoiceService.deleteInvoice(invoice.id).subscribe(data => {
        alert("Invoice deleted!");
        this.getAllInvoices();
    })
    }

}
