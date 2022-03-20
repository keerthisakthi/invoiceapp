import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css'],
})
export class CreateInvoiceComponent implements OnInit {

  invoiceForm: FormGroup;
  Today: number = Date.now();
  productList:any;
  subTot: number;
  taxPercent:number=10;
  taxVal:number;
  netPrice:number;
  tot:number;
  oneInvoice:any;
  singleInvoice: any;
  mode:string='new';

  constructor( private invoiceService: InvoiceService,private ref: ChangeDetectorRef,private route: ActivatedRoute) {}
   
   
  ngOnInit() {
    // creating formgroup,controls and initialization of formcontrol values
    this.invoiceForm = new FormGroup({
      customerName: new FormControl(null, [Validators.required,Validators.maxLength(20),Validators.minLength(8),Validators.pattern('[a-zA-Z ]*')]),
      customerAddr: new FormControl(null, [Validators.required,Validators.minLength(10),Validators.maxLength(30)]),
      customerEmail: new FormControl(null, [Validators.required,Validators.email]),
      customerPhno: new FormControl(null, [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      billDate:new FormControl(null,Validators.required),
      productArray: new FormArray([
        new FormGroup({
          product: new FormControl('', [Validators.required]),
          productPrice: new FormControl('', Validators.required),
          productQty: new FormControl('', Validators.required),
          productAmount: new FormControl('', Validators.required)
        })
      ]),
      netAmount: new FormControl(null),
      subTotal: new FormControl(null),
      taxValue: new FormControl(null)
      
    });

    //Fetching all the productlist and its price by service call to bind to product dropdown onInit
    this.invoiceService.getProductLists().subscribe(data => {
      this.productList = data;
    })


// updating subtotal,Taxvalue,netprice dynamically with productAmount values
  this.invoiceForm.controls['productArray'].valueChanges.subscribe(values => { 
    this.subTot = 0;
    const ctrl = <FormArray>this.invoiceForm.controls['productArray'];     
      ctrl.controls.forEach(x => { 
       
        this.subTot += parseInt(x.get('productAmount')?.value);
        // this.tot = this.subTot;
        this.taxVal = this.subTot *(this.taxPercent/100);
        
        this.netPrice =  this.subTot + this.taxVal;
        // console.log("add"+this.netPrice )
        this.ref.detectChanges();
      });
    }) 

    this.invoiceForm.get('subTotal')?.setValue(this.subTot);
 

const id = Number(this.route.snapshot.paramMap.get('id'));
const mode =this.route.snapshot.paramMap.get('mode');

if(mode!=null){
  this.mode=mode;
}
if(id){

  this.invoiceService.getSelectedInvoice(id).subscribe(data=>{
    this.singleInvoice =data;
    // console.log(this.singleInvoice,this.singleInvoice.customerName);
    this.invoiceForm.get('customerName')?.setValue(this.singleInvoice.customerName);
    // this.invoiceForm.get('customerName')?.setValue(this.oneInvoice.customerName);
    this.invoiceForm.get('customerAddr')?.setValue(this.singleInvoice.address);
    this.invoiceForm.get('customerEmail')?.setValue(this.singleInvoice.email);
    this.invoiceForm.get('customerPhno')?.setValue(this.singleInvoice.contactNo);
    this.invoiceForm.get('netAmount')?.setValue(this.singleInvoice.netAmount);
    this.invoiceForm.get('taxValue')?.setValue(this.singleInvoice.taxValue);
    this.invoiceForm.get('subTotal')?.setValue(this.singleInvoice.subTotal);
    this.invoiceForm.get('billDate')?.setValue(this.singleInvoice.billDate);
    
    const control = <FormArray>this.invoiceForm.controls['productArray'];
    control.removeAt(0);
    const prodList = this.productList;
    this.singleInvoice.products.forEach((x: Product) => {
    
    // console.log(prodList);
    var item = prodList.find(function(ele: any) { if(ele.id == x.name.id) return ele;});
    control.push(
      new FormGroup({
        product: new FormControl(item,[Validators.required]),
        productPrice: new FormControl(x.price,[Validators.required]),
        productQty: new FormControl(x.qty,[Validators.required]),
        productAmount: new FormControl(x.amount,[Validators.required])
      })
    );
    
    
    });
    
  });
}

}

  get customerName(){
    return this.invoiceForm.get('customerName') as FormControl
  }
  get customerAddr(){
    return this.invoiceForm.get('customerAddr') as FormControl
  }
  get customerEmail(){
    return this.invoiceForm.get('customerEmail') as FormControl
  }
  get customerPhno(){
    return this.invoiceForm.get('customerPhno') as FormControl
  }
  get billDate(){
    return this.invoiceForm.get('billDate') as FormControl
  }
  get netAmount(){
    return this.invoiceForm.get('netAmount') as FormControl
  }
  get subTotal(){
    return this.invoiceForm.get('subTotal') as FormControl
  }
  get taxValue(){
    return this.invoiceForm.get('taxValue') as FormControl
  }
  get product(){
    return this.invoiceForm.get('product') as FormControl
  }
  
  get productPrice(){
    return this.invoiceForm.get('productPrice') as FormControl
    
  }

  get productQty(){
    return this.invoiceForm.get('productQty') as FormControl
    
  }
  get productAmount(){
    return this.invoiceForm.get('productAmount') as FormControl
    
  }
  
  get productFormGroups () {
    return this.invoiceForm.get('productArray') as FormArray
  }

  

  invoiceModelObj: Invoice = new Invoice();

  //Renders the new formArray on click of + button to the form
  addProduct(){
    
    const control = <FormArray>this.invoiceForm.controls['productArray'];
    
    control.push(
      new FormGroup({
        product: new FormControl('',[Validators.required]),
        productPrice: new FormControl('',[Validators.required]),
        productQty: new FormControl('',[Validators.required]),
        productAmount: new FormControl('',[Validators.required])
      })
    );
    
  }

  //Removes the formArray when close button is clicked
  removeRow(index: number) {
    const control = <FormArray>this.invoiceForm.controls['productArray'];
    control.removeAt(index);
  }

  onSubmit() {
    
  }
  //Calls when the invoice form is submit button is clicked
  postInvoiceDetails() {
    this.invoiceForm.value.subTotal=this.subTot;
    this.invoiceForm.value.taxValue=this.taxVal;
    this.invoiceForm.value.netAmount=this.netPrice;
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
    
    for(let i=0; i<arr.length; i++){
   
      this.invoiceModelObj.products[i]= new Product(
        this.invoiceForm.value.productArray[i].product, 
        this.invoiceForm.value.productArray[i].productPrice, 
        this.invoiceForm.value.productArray[i].productQty, 
        this.invoiceForm.value.productArray[i].productAmount
        );
  }
    //Sending the submitted invoice details to Service 
    this.invoiceService.postInvoices(this.invoiceModelObj).subscribe(data =>{
      // console.log(data);
      alert("Invoice Created");
      this.invoiceForm.reset();
     },
     err=>{
      alert("Error occured while creating invoice");
     })

  }

  updateInvoiceDetails(){
    this.invoiceForm.value.subTotal=this.subTot;
    this.invoiceForm.value.taxValue=this.taxVal;
    this.invoiceForm.value.netAmount=this.netPrice;
    this.invoiceModelObj.customerName = this.invoiceForm.value.customerName;
    this.invoiceModelObj.address = this.invoiceForm.value.customerAddr;
    this.invoiceModelObj.contactNo = this.invoiceForm.value.customerPhno;
    this.invoiceModelObj.email = this.invoiceForm.value.customerEmail;
    this.invoiceModelObj.subTotal = this.invoiceForm.value.subTotal;
    this.invoiceModelObj.taxValue = this.invoiceForm.value.taxValue;
    this.invoiceModelObj.netAmount = this.invoiceForm.value.netAmount;
    this.invoiceModelObj.billDate = this.invoiceForm.value.billDate;
    const arr =this.invoiceForm.value.productArray;
    
    for(let i=0; i<arr.length; i++){
   
      this.invoiceModelObj.products[i]= new Product(
        this.invoiceForm.value.productArray[i].product, 
        this.invoiceForm.value.productArray[i].productPrice, 
        this.invoiceForm.value.productArray[i].productQty, 
        this.invoiceForm.value.productArray[i].productAmount
        );
  }

    this.invoiceService.updateInvoice(this.invoiceModelObj,this.singleInvoice.id).subscribe(data=>{
      alert("Updated Successfully");
    },err=>{
      alert("Error occured while updating invoice");
     })
   }
  // setting the price value according to the product selected
  changeProduct(e: any,index:number) {
    const priceValue=this.invoiceForm.value.productArray[index].product.price;
    const prodControl=(<FormArray>this.invoiceForm.controls['productArray']).at(index);
    prodControl.get('productPrice')?.setValue(priceValue);
    this.calculateAmount(index);
    
  }
  
  
  // Calculate amount according to price and quantity of the product
  calculateAmount(index: number){ 
    const total = this.invoiceForm.value.productArray[index].productPrice * this.invoiceForm.value.productArray[index].productQty;
    const amountControl=(<FormArray>this.invoiceForm.controls['productArray']).at(index);
    amountControl.get('productAmount')?.setValue(total);
  }
  
  
}
