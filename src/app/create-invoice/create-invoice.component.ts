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
  Today: number = Date.now();
  // productlist: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan'];
  productList:any;
  // constructor(private fb: FormBuilder) {}
  constructor( private invoiceService: InvoiceService) {
    // console.log("in cons",this.invoiceModelObj.products[0].name);
   }
  ngOnInit() {
    // this.createForm();
    this.invoiceForm = new FormGroup({
      customerName: new FormControl(null, [Validators.required,Validators.maxLength(20),Validators.minLength(8),Validators.pattern('[a-zA-Z ]*')]),
      customerAddr: new FormControl(null, [Validators.required,Validators.minLength(10),Validators.maxLength(30)]),
      customerEmail: new FormControl(null, [Validators.required,Validators.email]),
      customerPhno: new FormControl(null, [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      billDate:new FormControl(null,Validators.required),
      productArray: new FormArray([
        new FormGroup({
         // productName: new FormControl('', [Validators.required]),
          product: new FormControl('', [Validators.required]),
          productPrice: new FormControl('', Validators.required),
          productQty: new FormControl('', Validators.required),
          productAmount: new FormControl('', Validators.required)
        })
      ]),
      netAmount: new FormControl(null,[Validators.required]),
      subTotal: new FormControl(null ,[Validators.required]),
      taxValue: new FormControl(null,[Validators.required])
      
    });

    this.invoiceService.getProductLists().subscribe(data => {
      this.productList = data;
      console.log("productfood",this.productList)
      console.log(this.productList[0].prodName)
  })
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
  get productPrice() {

    return this.invoiceForm.controls['productArray'].get('productPrice') as FormControl
    
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

  addProduct(){
    
    const control = <FormArray>this.invoiceForm.controls['productArray'];
    
    control.push(
      new FormGroup({
        //productName: new FormControl(''),
        product: new FormControl('',[Validators.required]),
        productPrice: new FormControl('',[Validators.required]),
        productQty: new FormControl('',[Validators.required]),
        productAmount: new FormControl('',[Validators.required])
      })
    );
    // control.get('productPrice')?.setValue('240');
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
    
    for(let i=0; i<arr.length; i++){
    //  debugger;
      this.invoiceModelObj.products[i]= new Product(
        this.invoiceForm.value.productArray[i].product, 
        this.invoiceForm.value.productArray[i].productPrice, 
        this.invoiceForm.value.productArray[i].productQty, 
        this.invoiceForm.value.productArray[i].productAmount
        );
  }

    this.invoiceService.postInvoices(this.invoiceModelObj).subscribe(data =>{
      console.log(data);
      alert("Invoice Created");
     },
     err=>{
      alert("Error occured while creating invoice");
     })
  }

  changeProduct(e: any,index:number) {
    console.log("price",e.target.value);
    const priceValue=this.invoiceForm.value.productArray[index].product.price;
    const prodControl=(<FormArray>this.invoiceForm.controls['productArray']).at(index);
    prodControl.get('productPrice')?.setValue(priceValue);
    // this.invoiceForm.controls['productArray'].get('productPrice')?.setValue("20", {
    //     onlySelf: true,
    //   });

      // const faControl = 
      // (<FormArray>this.pmForm.controls['bundleDetails']).at(index);
      // faControl['controls'].bsku.setValue(sku);
     
    // this.invoiceForm.get('productArray').patchValue(e.target.value);
    // this.invoiceForm.get('productPrice')?.setValue('20');
    // this.invoiceForm.controls['prouctArray'].get('productPrice')?.setValue('25');
    // console.log(this.invoiceForm.controls.productFormGroups)
    //  this.invoiceForm.controls['prouctArray'].get('productPrice')?.setValue(25);
    //     onlySelf: true,
    //   });
    // this.Price = e.target.value
    // debugger;
    // this.invoiceForm.get('productName')?.setValue(e.target.value, {
    //   onlySelf: true,
    // });
    // this.invoiceForm.value.productArray[0].product.price=1000;
    // this.invoiceForm.value.productArray[0].productprice=1000;

    // const control = <FormArray>this.invoiceForm.controls['productArray'];
    
    // control.push(
    //   new FormGroup({
    //     //productName: new FormControl(''),
    //     product: new FormControl(''),
    //     productPrice: new FormControl('2'),
    //     productQty: new FormControl(''),
    //     productAmount: new FormControl('')
    //   })
    // );
    // this.invoiceForm.value.subTotal=20;
    // console.log("event",this.invoiceForm.value('subTotal'))
    //  this.invoiceForm.value.productArray[0].productPrice=this.invoiceForm.value.productArray[0].product.price;
    //  console.log("hi",this.invoiceForm.value.productArray[0].productPrice)
    //  this.invoiceForm.value('subTotal')?.setValue(20)
    // .setValue(this.invoiceForm.value.productArray[0].productPrice,
    //   {
    //   onlySelf: true,
    // }
    // );
   //console.log("price",this.invoiceForm.controls['prouctArray'],this.invoiceForm.controls['productArray'],this.invoiceForm.get('productPrice'),this.invoiceForm.value.productArray[0].product.price)
  }
  // get product() {

  //   return this.invoiceForm.get('product');
    
  // }
  
  
  calculateAmount(index: number){
    // console.log("price",e.target.value);
    // const priceValue=this.invoiceForm.value.productArray[index].product.price;
    // const prodControl=(<FormArray>this.invoiceForm.controls['productArray']).at(index);
    // prodControl.get('productPrice')?.setValue(priceValue);
    const total = this.invoiceForm.value.productArray[index].productPrice * this.invoiceForm.value.productArray[index].productQty;
    const amountControl=(<FormArray>this.invoiceForm.controls['productArray']).at(index);
    amountControl.get('productAmount')?.setValue(total);
    // const total = this.invoiceForm.value.productArray[index].productPrice * this.invoiceForm.value.productArray[index].productQty;
    //  this.invoiceForm.value.productArray[index].get('productAmount').setValue(total);
    // this.invoiceForm.controls['productArray'].value.productAmount.setValue(total);
    // this.invoiceForm.value.productArray[index].productAmount=total;
    // console.log(this.invoiceForm)
    //debugger;
    // const total= this.invoiceForm
    // .get('productQty')?.value * this.invoiceForm.get('productPrice')?.value;
    // console.log("v",total,this.invoiceForm
    // .get('productQty')?.value)
  }
  
}
// (this.form.get('controls') as FormArray).at(index) as FormGroup).get('description').patchValue(item.description);
// this.invoiceForm.controls['productArray'].value
// this.invoiceForm.controls['productArray'].controls[0].value.productPrice=this.invoiceForm.controls['productArray'].controls[0].value.product.price