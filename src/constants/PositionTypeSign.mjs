/**
 * @typedef {Object} PositionTypeSign - тип оплаты позиции
 *
 * @property {"fullPay"} FULL_PAY - полный расчет
 * @property {"advance"} ADVANCE - аванс
 * @property {"prePay100"} PREPAY100 - полная предоплата
 * @property {"prePay"} PREPAY - предоплата
 * @property {"partPay"} PART_PAY - частичная оплата
 * @property {"credit"} CREDIT - кредит
 * @property {"payCredit"} PAY_CREDIT - todo
 */
const PositionTypeSign = {
  FULL_PAY: "fullPay",
  ADVANCE: "advance",
  PREPAY100: "prePay100",
  PREPAY: "prePay",
  PART_PAY: "partPay",
  CREDIT: "credit",
  PAY_CREDIT: "payCredit",
};

export default PositionTypeSign;
