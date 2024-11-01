import KkmGate from "./KkmGate.mjs";

export default class KkmService {
  /**
   * @param {string} kkmhubUrl - Путь к kkmhub
   * @param {*} certConfig - сертификат
   */
  constructor({ kkmhubUrl, certConfig }) {
    this.kkmGate = new KkmGate({ kkmhubUrl, certConfig });
  }

  /**
   * Создает чек в kkmhub и возвращает его идентификатор.
   *
   * @param {object} receipt - экземпляр класса отнаследованного от Receipt
   * @returns {Promise<number>}
   */
  async createReceipt(receipt) {
    const receiptData = receipt.format();
    const order = await this.kkmGate.generateReceipt(receiptData);

    return order.checkId;
  }

  /**
   * Возвращает чек в pdf формате (Buffer) по переданному идентификатору.
   *
   * @param {number} checkId - идентификатор чека
   * @returns {Promise<Buffer>}
   */
  async getReceiptDocument(checkId) {
    return this.kkmGate.getOrder(checkId);
  }
}
