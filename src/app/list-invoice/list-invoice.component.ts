import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.css'],
})
export class ListInvoiceComponent implements OnInit {
  listInvoices: any;
  singleInvoice: any;
  constructor(private invoiceService: InvoiceService, private router: Router) {}

  ngOnInit(): void {
    this.invoiceService.listInvoices().subscribe((data) => {
      this.listInvoices = data;
    });

    this.singleInvoice;
  }

  getAllInvoices() {
    this.invoiceService.listInvoices().subscribe((data) => {
      this.listInvoices = data;
    });
  }

  deleteInvoice(invoice: any) {
    this.invoiceService.deleteInvoice(invoice.id).subscribe((data) => {
      alert('Invoice deleted!');
      this.getAllInvoices();
    });
  }

  updateInvoice(invoiceId: any) {
    this.router.navigate(['/edit', 'edit', invoiceId.id]);
  }

  viewInvoice(invoiceId: any) {
    this.router.navigate(['/view', 'view', invoiceId.id]);
  }
}
