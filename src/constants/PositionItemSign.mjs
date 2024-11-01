/**
 * @typedef {Object} PositionItemSign - тип позиции
 *
 * @property {"service"} SERVICE - услуга
 * @property {"product"} PRODUCT - товар
 * @property {"exciseProduct"} EXCISE_PRODUCT - акцизный товар
 * @property {"work"} WORK - работа
 * @property {"gameBet"} GAME_BET - ставка на игру
 * @property {"gameWin"} GAME_WIN - выигрыш ставки
 * @property {"lotteryBet"} LOTTERY_BET - лотерейная ставка
 * @property {"lotteryWin"} LOTTERY_WIN - Выигрыш в лотерею
 * @property {"rid"} RID - todo
 * @property {"pay"} PAY - todo
 * @property {"agentFee"} AGENT_FEE - агентское вознаграждение
 * @property {"composite"} COMPOSITE - todo
 * @property {"other"} OTHER - иное
 */
const PositionItemSign = {
  SERVICE: "service",
  PRODUCT: "product",
  EXCISE_PRODUCT: "exciseProduct",
  WORK: "work",
  GAME_BET: "gameBet",
  GAME_WIN: "gameWin",
  LOTTERY_BET: "lotteryBet",
  LOTTERY_WIN: "lotteryWin",
  RID: "rid",
  PAY: "pay",
  AGENT_FEE: "agentFee",
  COMPOSITE: "composite",
  OTHER: "other",
};

export default PositionItemSign;
