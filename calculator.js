class Calculator {
  constructor() {
    this.clear();
    this.currentOperand = 0;
    this.operator = null;
    this.nextOperand = null;
  }

  clear() {
    this.currentOperand = 0;
    this.operator = null;
    this.nextOperand = null;
  }

  setCurrentOperand(value) {
    this.currentOperand = value;
  }

  setOperator(operator) {
    this.operator = operator;
  }

  setNextOperand(value) {
    this.nextOperand = value;
  }

  isReadyToCount() {
    if (
      this.currentOperand !== null &&
      this.operator &&
      this.nextOperand !== null
    )
      return true;
    return false;
  }
}

export { Calculator };
