/**
 * @typedef {Object} ReceiptSumType - тип расчета
 *
 * @property {"hardcash"} HARD_CASH - наличные
 * @property {"card"} CARD - карта
 * @property {"cashless"} CASHLESS - безналичный расчет
 * @property {"prepaid"} PREPAID - предоплата
 * @property {"credit"} CREDIT - кредит
 */
const ReceiptSumType = {
  HARD_CASH: "hardcash",
  CARD: "card",
  CASHLESS: "cashless",
  PREPAID: "prepaid",
  CREDIT: "credit",
};

export default ReceiptSumType;
