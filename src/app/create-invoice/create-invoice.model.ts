export class Invoice {
  customerName: string;
  address: string;
  contactNo: number;
  email: string;
  subTotal: number;
  taxValue: number;
  netAmount: number;
  billDate: number;
  products: Product[] = [];
  constructor() {}
}

export class Product {
  name: any;
  price: number;
  qty: number;
  amount: number;

  constructor(name: any, price: number, qty: number, amount: number) {
    this.name = name;
    this.price = price;
    this.qty = qty;
    this.amount = amount;
  }
}
