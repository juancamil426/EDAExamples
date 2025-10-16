export class Order {
  id: string;
  customerId: string;
  total: number;

  constructor(id: string, customerId: string, total: number) {
    this.id = id;
    this.customerId = customerId;
    this.total = total;
  }
}
