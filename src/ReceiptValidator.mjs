import InvalidReceiptDataException from "./exceptions/InvalidReceiptDataException.mjs";
import ReceiptType from "./constants/ReceiptType.mjs";
import ReceiptSumType from "./constants/ReceiptSumType.mjs";
import PositionNdsType from "./constants/PositionNdsType.mjs";
import PositionItemSign from "./constants/PositionItemSign.mjs";
import PositionTypeSign from "./constants/PositionTypeSign.mjs";

export default class ReceiptValidator {
  errors = [];

  validate(receiptData) {
    if (!receiptData.applicationId) {
      this.addError("Не заполнено поле applicationId");
    }

    if (!receiptData.name) {
      this.addError("Не заполнено поле name");
    }

    if (!receiptData.type) {
      this.addError("Не заполнено поле type");
    }

    if (!this.isValidConstant(receiptData.type, ReceiptType)) {
      this.addError("Некорректное значение type, см. ReceiptType");
    }

    if (!receiptData.payWay) {
      this.addError("Не заполнено поле payWay");
    }

    if (!receiptData.summType) {
      this.addError("Не заполнено поле summType");
    }

    if (!this.isValidConstant(receiptData.summType, ReceiptSumType)) {
      this.addError("Некорректное значение type, см. ReceiptSumType");
    }

    if (!receiptData.operationId) {
      this.addError("Не заполнено поле operationId");
    }

    if (!receiptData.payTimeString) {
      this.addError("Не заполнено поле payTimeString");
    }

    if (!receiptData.client.hasOwnProperty("initials")) {
      this.addError("Не определено поле client.initials");
    }

    if (!receiptData.client.hasOwnProperty("address")) {
      this.addError("Не определено поле client.address");
    }

    if (!receiptData.hasOwnProperty("creditContractNumber")) {
      this.addError("Не определено поле creditContractNumber");
    }

    if (!receiptData.hasOwnProperty("creditContractDateString")) {
      this.addError("Не определено поле creditContractDateString");
    }

    if (!receiptData.operatorKassirINN) {
      this.addError("Не заполнено поле operatorKassirINN");
    }

    if (!receiptData.operatorKassir) {
      this.addError("Не заполнено поле operatorKassir");
    }

    if (!receiptData.contractNumber) {
      this.addError("Не заполнено поле contractNumber");
    }

    if (!receiptData.contractDateString) {
      this.addError("Не заполнено поле contractDateString");
    }

    if (!receiptData.contractEndDateString) {
      this.addError("Не заполнено поле contractEndDateString");
    }

    if (!this.isValidDate(receiptData.payTimeString)) {
      this.addError("Некорректная дата payTimeString");
    }

    if (!this.isValidDate(receiptData.contractDateString)) {
      this.addError("Некорректная дата contractDateString");
    }

    if (!this.isValidDate(receiptData.contractEndDateString)) {
      this.addError("Некорректная дата contractEndDateString");
    }

    if (!Array.isArray(receiptData.positions)) {
      this.addError("positions должно быть массивом");
    }

    if (receiptData.positions === 0) {
      this.addError("positions не должен быть пустым");
    }

    receiptData.positions.forEach((position, i) => {
      if (!position.name) {
        this.addError(`Не заполнено поле position[${i}].name`);
      }

      if (!position.amount) {
        this.addError(`Не заполнено поле position[${i}].amount`);
      }

      if (!position.quantity) {
        this.addError(`Не заполнено поле position[${i}].quantity`);
      }

      if (!this.isValidConstant(position.ndsType, PositionNdsType)) {
        this.addError(`Некорректное значение position[${i}].ndsType, см. PositionNdsType`);
      }

      if (!this.isValidConstant(position.itemSign, PositionItemSign)) {
        this.addError(`Некорректное значение position[${i}].itemSign, см. PositionItemSign`);
      }

      if (!this.isValidConstant(position.typeSign, PositionTypeSign)) {
        this.addError(`Некорректное значение position[${i}].typeSign, см. PositionTypeSign`);
      }
    });

    if (this.hasErrors()) {
      throw new InvalidReceiptDataException(this.errors.join('; '));
    }
  }

  addError(errorText) {
    this.errors.push(errorText);
  }

  hasErrors() {
    return this.errors.length > 0;
  }

  isValidDate(date) {
    return /\d{4}-\d{2}-\d{2}/.test(date);
  }

  isValidConstant(value, constantEnum) {
    return Object.values(constantEnum).includes(value);
  }
}