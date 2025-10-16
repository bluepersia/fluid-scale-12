class Counter {
  orderID: number = -1;

  next() {
    this.orderID++;
    return this.orderID;
  }
}

export { Counter };
