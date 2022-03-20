import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  users: any;
  singleInvoice: any;
  constructor(private http: HttpClient) {}

  listInvoices() {
    return this.http.get<any>('http://localhost:3000/invoices').pipe(
      map((result: any) => {
        return result;
      })
    );
  }

  postInvoices(data: any) {
    return this.http.post<any>('http://localhost:3000/invoices', data).pipe(
      map((result: any) => {
        return result;
      })
    );
  }

  deleteInvoice(id: number) {
    return this.http.delete<any>('http://localhost:3000/invoices/' + id).pipe(
      map((result: any) => {
        return result;
      })
    );
  }

  getProductLists() {
    return this.http.get<any>('http://localhost:3000/productList').pipe(
      map((result: any) => {
        return result;
      })
    );
  }

  updateInvoice(data: any, id: number) {
    return this.http
      .put<any>('http://localhost:3000/invoices/' + id, data)
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }

  getSelectedInvoice(id: number) {
    return this.http.get<any>('http://localhost:3000/invoices/' + id).pipe(
      map((result: any) => {
        return result;
      })
    );
  }
}
