import currency from "currency.js";
import MethodNotDefinedException from "./exceptions/MethodNotDefinedException.mjs";
import ReceiptValidator from "./ReceiptValidator.mjs";

/**
 * Базовый класс для формирования чека в kkmhub
 */
export default class Receipt {
  /**
   * @param {string} applicationId - идентификатор организации
   */
  constructor({ applicationId }) {
    this.applicationId = applicationId;
    this.validator = new ReceiptValidator();
  }

  #methodNotDefined(methodName) {
    throw new MethodNotDefinedException(methodName, this.constructor.name);
  }

  /**
   * Легаси. Но должно быть.
   * Возвращает название чека
   *
   * @returns {string}
   */
  getName() { // легаси, можно вписать, если есть
    this.#methodNotDefined("getName");
  };

  /**
   * Легаси. Но должно быть.
   *
   * contractNumber - номер договора, непустая строка
   * contractDateString - дата начала договора в формате YYYY-MM-DD
   * contractEndDateString - дата окончания договора в формате YYYY-MM-DD
   *
   * @returns {{
   *   contractNumber: string,
   *   contractDateString: string,
   *   contractEndDateString: string,
   * }}
   */
  getContractFields() {
    this.#methodNotDefined("getContractFields");
  }

  /**
   * Легаси. Но должно быть.
   *
   * @returns {{
   *   creditContractNumber: string,
   *   creditContractDateString: string,
   * }}
   */
  getCreditFields() {
    return {
      creditContractNumber: "",
      creditContractDateString: "",
    };
  }

  /**
   * Легаси. Но должно быть.
   *
   * @return {number}
   */
  getQuantity() {
    return 1;
  }

  /**
   * Возвращает обьект с ФИО и ИНН кассира
   *
   * @returns {{operatorKassirINN: string, operatorKassir: string}}
   */
  getCashierFields() {
    this.#methodNotDefined("getCashierFields");
  };

  /**
   * Возвращает перечень товаров/услуг входящих в чек.
   *
   * @returns {array<ReceiptPosition>}
   */
  getPositions() {
    this.#methodNotDefined("getPositions");
  };

  /**
   * Возвращает тип чека, см. ReceiptType.
   *
   * @returns {string}
   */
  getType() {
    this.#methodNotDefined("getType");
  };

  /**
   * Возвращает сумму чека.
   *
   * @param {array<ReceiptPosition>} positions
   * @returns {number}
   */
  getAmount(positions) {
    let amount = currency(0);

    positions.forEach(position => {
      const positionAmount = currency(parseFloat(position.amount));
      const positionPrice = positionAmount.multiply(parseFloat(position.quantity));
      amount = amount.add(positionPrice);
    });

    return amount.value;
  };

  /**
   * Возвращает информацию по клиенту.
   *
   * initials - ФИО (легаси, можно передавать пустую строку)
   * address - адрес (легаси, можно передавать пустую строку)
   * email - почта
   * mobilePhone - телефон
   *
   * Почта и/или телефон нужны, чтобы отправить чек клиенту.
   * Можно передавать пустую строку, но, потом, у клиента могут быть претензии, что ему не передали чек.
   *
   * @returns {{
   *   initials: string,
   *   address: string,
   *   mobilePhone: (string|""),
   *   email: (string|"")
   * }}
   */
  getClient() {
    return {
      initials: "",
      address: "",
      mobilePhone: this.getClientPhone(),
      email: this.getClientEmail(),
    };
  };

  /**
   * Возвращает номер телефона клиента. Может быть пустым.
   *
   * @returns {string}
   */
  getClientPhone() {
    return "";
  }

  /**
   * Возвращает адрес электронной почты клиента. Может быть пустым.
   *
   * @returns {string}
   */
  getClientEmail() {
    return "";
  }

  /**
   * Возвращает тип денежного расчета, см. ReceiptSumType
   *
   * @returns {string}
   */
  getSumType() {
    this.#methodNotDefined("getSumType");
  };

  /**
   * Возвращает уникальный идентификатор под которым будет создана запись в kkmhub
   *
   * @returns {string} - строка длиной 32 символа
   */
  getOperationId() {
    this.#methodNotDefined("getOperationId");
  };

  /**
   * Возвращает способ оплаты. Печатается в чеке рядом с суммой (наверно).
   */
  getPayWay() {
    return "БЕЗНАЛИЧНЫМИ";
  };

  /**
   * Возвращает дату оплаты в формате YYYY-MM-DD
   *
   * @returns {string}
   */
  getPayTimeString() {
    this.#methodNotDefined("getPayTimeString");
  }

  /**
   * Возвращает обьект отформатированный для отправки в kkmhub
   *
   * @return {*&{
   * amount: number,
   * quantity: number,
   * payTimeString: string,
   * summ: number,
   * summType: ReceiptSumType.CASHLESS,
   * name: string,
   * client: {
   *   initials: (string|""),
   *   address: (string|""),
   *   mobilePhone: (string|""),
   *   email: (string|"")
   * },
   * payWay: string,
   * operationId: string,
   * positions: Array<ReceiptPosition>,
   * applicationId: string,
   * type: (ReceiptType.SALE|ReceiptType.BUY)
   * }}
   */
  format() {
    const positions = this.getPositions();
    const amount = this.getAmount(positions);

    const receiptData = {
      amount,
      positions,
      summ: amount,

      applicationId: this.applicationId,

      name: this.getName(),
      type: this.getType(),
      client: this.getClient(),
      payWay: this.getPayWay(),
      summType: this.getSumType(),
      quantity: this.getQuantity(),
      operationId: this.getOperationId(),
      payTimeString: this.getPayTimeString(),

      ...this.getCreditFields(),
      ...this.getCashierFields(),
      ...this.getContractFields(),

    };

    this.validator.validate(receiptData);

    return receiptData;
  }
}
