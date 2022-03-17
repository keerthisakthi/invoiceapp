export class Invoice {
  customerName: string = '';
  address: string = '';
  contactNo: number;
  email: string;
  subTotal: number;
  taxValue: number;
  netAmount: number;
  products: Product[] =[];
 constructor() {
//     //  this.products = [];
//     console.log(this.products[0].amount)
// // this.products.push(new Product());
// //    console.log(this.products[0].amount)
//     this.products = new Product();
// console.log("hap",this.products)
    //this.products.push(new Product())
// console.log("hap",this.products)
// console.log(this.products,this.products[0].name);
  }
}

export class Product {

  name: string="";
  price: number;
  qty: number ;
  amount: number;
//   products: { name: string, price: number,qty: number,amount:number }[] ;
    //constructor() {}
    constructor(name: string, price: number,qty: number,amount:number) {
        this.name = name;
        this.price = price;
        this.qty = qty;
        this.amount = amount;
    }
}