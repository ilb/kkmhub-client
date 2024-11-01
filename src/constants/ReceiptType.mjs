/**
 * @typedef {Object} ReceiptType - тип чека
 *
 * @property {"sale"} SALE - Приход
 * @property {"buy"} BUY - Расход
 * @property {"returnSale"} RETURN_SALE - Возврат прихода
 * @property {"returnBuy"} RETURN_BUY - Возврат расхода
 */
const ReceiptType = {
  SALE: "sale",
  BUY: "buy",
  RETURN_SALE: "returnSale",
  RETURN_BUY: "returnBuy",
};

export default ReceiptType;
