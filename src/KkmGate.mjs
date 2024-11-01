import fetch from "isomorphic-fetch";
import https from "https";
import CreateReceiptError from "./exceptions/CreateReceiptError.mjs";

export default class KkmGate {
  constructor({ kkmhubUrl, certConfig }) {
    this.kkmhubUrl = kkmhubUrl;
    this.certConfig = certConfig;
    this.count = 3;
    this.step = 0;
  }

  /**
   * Скачивает чек в формате pdf из kkmhub
   *
   * @param {number} checkId checkId from KKM service
   * @returns {Buffer}
   */
  async getOrder(checkId) {
    const url = this.kkmhubUrl + `/api/v1/checkPDF/${checkId}`;
    const options = {
      agent: () => new https.Agent(this.certConfig),
      headers: {
        Accept: "application/pdf",
      },
    };
    const response = await fetch(url, options);

    if (response.status !== 200) {
      throw new CreateReceiptError("Ошибка загрузки чека, повторите запрос позднее");
    }

    return response.buffer();
  }

  /**
   * Создает чек в kkmhub
   *
   * @param {Object} data data from orderAdapter
   * @returns
   */
  async generateReceipt(data) {
    if (data) {
      const url = this.kkmhubUrl + "/api/v1/order";
      const options = {
        method: "POST",
        body: JSON.stringify(data),
        agent: () => new https.Agent(this.certConfig),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      };
      const response = await fetch(url, options);

      if (this.step > this.count) {
        const err = await response.text();
        throw new CreateReceiptError(`Ошибка отправки чека, повторите запрос позднее ${err}`);
      }

      if (!response.ok) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        this.step++;
        return this.generateReceipt(data);
      }

      return response.json();
    }
  }
}
