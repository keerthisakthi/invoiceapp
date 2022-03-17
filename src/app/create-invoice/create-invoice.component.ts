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
  // productlist: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan'];
  productList:any;
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
      billDate:new FormControl(null,Validators.required),
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

    this.invoiceService.getProductLists().subscribe(data => {
      this.productList = data;
      console.log("productfood",this.productList)
      console.log(this.productList[0].prodName)
  })
  }

  get productFormGroups () {
    return this.invoiceForm.get('productArray') as FormArray
  }

  invoiceModelObj: Invoice = new Invoice();

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
    // console.log("array",this.invoiceForm.value.productArray[0].productName)
    // console.log("array",this.invoiceForm.value.productArray.length)
    // console.log("happu",this.invoiceModelObj.products.name )
    this.invoiceModelObj.customerName = this.invoiceForm.value.customerName;
    this.invoiceModelObj.address = this.invoiceForm.value.customerAddr;
    this.invoiceModelObj.contactNo = this.invoiceForm.value.customerPhno;
    this.invoiceModelObj.email = this.invoiceForm.value.customerEmail;
    this.invoiceModelObj.subTotal = this.invoiceForm.value.subTotal;
    this.invoiceModelObj.taxValue = this.invoiceForm.value.taxValue;
    this.invoiceModelObj.netAmount = this.invoiceForm.value.netAmount;
    this.invoiceModelObj.billDate = this.invoiceForm.value.billDate;
    const itemLength = this.invoiceForm.value.productArray.length;
    const arr =this.invoiceForm.value.productArray;
    // this.invoiceModelObj.products.length=itemLength;

    // console.log("prod",this.invoiceModelObj.products.length)
    // console.log("detail",arr,itemLength)
    
    for(let i=0,j=0; i<arr.length; i++){
    //  debugger;
      this.invoiceModelObj.products[i]= new Product(this.invoiceForm.value.productArray[i].productName, this.invoiceForm.value.productArray[i].productPrice, this.invoiceForm.value.productArray[i].productQty, this.invoiceForm.value.productArray[i].productAmount);
      
   
  }
    
  

    this.invoiceService.postInvoices(this.invoiceModelObj).subscribe(data =>{
      console.log(data);
      alert("Invoice Created");
     },
     err=>{
      alert("Error occured while creating invoice");
     })
  }

  changeProduct(e: any) {
    this.invoiceForm.get('productName')?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  get productName() {
    return this.invoiceForm.get('productName');
  }
}
