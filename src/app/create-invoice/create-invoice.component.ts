import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { InvoiceService } from '../services/invoice.service';
import { Invoice, Product } from './create-invoice.model';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css'],
})
export class CreateInvoiceComponent implements OnInit {
  invoiceForm: FormGroup;

  // constructor(private fb: FormBuilder) {}
  constructor( private invoiceService: InvoiceService) {
    // console.log("in cons",this.invoiceModelObj.products[0].name);
   }
  ngOnInit() {
    // this.createForm();
    this.invoiceForm = new FormGroup({
      customerName: new FormControl(null, [Validators.required]),
      customerAddr: new FormControl(null, [Validators.required]),
      customerEmail: new FormControl(null, [Validators.required,Validators.email]),
      customerPhno: new FormControl(null, [Validators.required]),
      productArray: new FormArray([
        new FormGroup({
          productName: new FormControl('', [Validators.required]),
          productPrice: new FormControl('', Validators.required),
          productQty: new FormControl('', Validators.required),
          productAmount: new FormControl('', Validators.required)
        })
      ]),
      netAmount: new FormControl(null),
      subTotal: new FormControl(null ),
      taxValue: new FormControl(null)
      
    });
  }

  get productFormGroups () {
    return this.invoiceForm.get('productArray') as FormArray
  }

  invoiceModelObj: Invoice = new Invoice();
  //productModelObj: Product = new Product();
   // addProduct() {
  //   this.invoiceModelObj.products.push(new Product());
  // }
 
// console.log("test",this.invoiceModelObj.products[0].name)
  addProduct(){
    
    const control = <FormArray>this.invoiceForm.controls['productArray'];
    control.push(
      new FormGroup({
        productName: new FormControl(''),
        productPrice: new FormControl(''),
        productQty: new FormControl(''),
        productAmount: new FormControl('')
      })
    );
  }

  removeRow(index: number) {
    const control = <FormArray>this.invoiceForm.controls['productArray'];
    control.removeAt(index);
  }

  onSubmit() {
    console.log(this.invoiceForm.value.customerName);
    console.log(this.invoiceForm.value.netAmount)
    console.log(this.invoiceForm)
    // console.log("array",this.invoiceForm.value.productArray[0].productName)
    // console.log("array",this.invoiceForm.value.productArray.length)
  }

  postInvoiceDetails() {
    // debugger;
    console.log("array",this.invoiceForm.value.productArray[0].productName)
    console.log("array",this.invoiceForm.value.productArray.length)
    // console.log("happu",this.invoiceModelObj.products.name )
    this.invoiceModelObj.customerName = this.invoiceForm.value.customerName;
    this.invoiceModelObj.address = this.invoiceForm.value.customerAddr;
    this.invoiceModelObj.contactNo = this.invoiceForm.value.customerPhno;
    this.invoiceModelObj.email = this.invoiceForm.value.customerEmail;
    this.invoiceModelObj.subTotal = this.invoiceForm.value.subTotal;
    this.invoiceModelObj.taxValue = this.invoiceForm.value.taxValue;
    this.invoiceModelObj.netAmount = this.invoiceForm.value.netAmount;
    const itemLength = this.invoiceForm.value.productArray.length;
    const arr =this.invoiceForm.value.productArray;
    // this.invoiceModelObj.products.length=itemLength;

    console.log("prod",this.invoiceModelObj.products.length)
    console.log("detail",arr,itemLength)
    for(let i=0,j=0; i<arr.length; i++){
    //  debugger;
      this.invoiceModelObj.products[i]= new Product(this.invoiceForm.value.productArray[i].productName, this.invoiceForm.value.productArray[i].productPrice, this.invoiceForm.value.productArray[i].productQty, this.invoiceForm.value.productArray[i].productAmount);
      // this.invoiceModelObj.products[i].price = ;
      // this.invoiceModelObj.products[i].qty = this.invoiceForm.value.productArray[i].productQty;
      // this.invoiceModelObj.products[i].amount = this.invoiceForm.value.productArray[i].productAmount;
   
  }
    // this.products = this.invoiceForm.value.productArray;
    // this.invoiceModelObj.products.name= this.invoiceForm.value.productName;
    // this.invoiceModelObj.products.price = this.invoiceForm.value.productPrice;
    // this.invoiceModelObj.products.qty = this.invoiceForm.value.productQty;
    // this.invoiceModelObj.products.amount = this.invoiceForm.value.productAmount;
    // this.invoiceModelObj.products.subTotal = this.invoiceForm.value.subTotal;
    // this.invoiceModelObj.products.taxValue = this.invoiceForm.value.taxValue;
    // this.invoiceModelObj.products.netAmount = this.invoiceForm.value.netAmount;
  

    this.invoiceService.postInvoices(this.invoiceModelObj).subscribe(data =>{
      console.log(data);
      alert("Invoice Created");
     },
     err=>{
      alert("Error occured while creating invoice");
     })
  }
}
