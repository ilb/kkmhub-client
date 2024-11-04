import Receipt from "../Receipt.mjs";
import PositionNdsType from "../constants/PositionNdsType.mjs";
import PositionItemSign from "../constants/PositionItemSign.mjs";
import PositionTypeSign from "../constants/PositionTypeSign.mjs";
import ReceiptType from "../constants/ReceiptType.mjs";
import ReceiptSumType from "../constants/ReceiptSumType.mjs";

export default class ExampleReceipt extends Receipt {
  constructor(receiptData) {
    super({ applicationId: "project-name" });
    this.receiptData = receiptData;
  }

  getName() {
    return "Игрушки";
  }

  getContractFields() {
    return {
      contractNumber: this.receiptData.id.toString(),
      contractDateString: this.receiptData.date,
      contractEndDateString: this.receiptData.date,
    };
  }

  getCashierFields() {
    return {
      operatorKassirINN: this.receiptData.cashier.inn,
      operatorKassir: this.receiptData.cashier.fullName,
    };
  }

  getPositions() {
    return this.receiptData.products.map(product => ({
      name: product.name,
      amount: product.price,
      quantity: product.quantity,
      ndsType: PositionNdsType.NDS20,
      itemSign: PositionItemSign.PRODUCT,
      typeSign: PositionTypeSign.FULL_PAY,
    }))
  }

  getType() {
    return ReceiptType.SALE;
  }

  getClientPhone() {
    return this.receiptData.buyer.contacts.phone;
  }

  getSumType() {
    return ReceiptSumType.CASHLESS;
  }

  getOperationId() {
    return this.receiptData.uid;
  }

  getPayTimeString() {
    return this.receiptData.date;
  }
}