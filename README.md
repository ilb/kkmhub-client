# SDK для kkmhub

## Использование

```js
/**
 kkmhubUrl - путь к kkmhub
 certConfig - сертификат
 */
const kkmService = new KkmService({ kkmhubUrl, certConfig });

/**
 Необходимо отнаследовать класс от Receipt и переопределить в нем методы getOperationId, getName,
 getContractFields, getCashierFields, getPositions, getType, getSumType, getPayTimeString.

 См. пример ExampleReceipt (src/example/ExampleReceipt.mjs).
 Возвращаемые значения этих функций описаны в класе Receipt (src/Receipt.mjs).
 */
const receipt = new ExampleReceipt("project-name", offer);

/**
 * Создание чека
 */
const checkId = await kkmService.createReceipt(receipt);

/**
 * Получение pdf чека
 */
const buffer = await kkmService.getReceiptDocument(checkId);
```

## Константы

### ReceiptSumType - тип расчета

| Свойство  | Значение   | Описание           |
 |-----------|------------|--------------------|
| HARD_CASH | "hardcash" | Наличные           |
| CARD      | "card"     | Карта              |
| CASHLESS  | "cashless" | Безналичный расчет |
| PREPAID   | "prepaid"  | Предоплата         |
| CREDIT    | "credit"   | Кредит             |

### ReceiptType - тип чека

| Свойство    | Значение     | Описание        |
 |-------------|--------------|-----------------|
| SALE        | "sale"       | Приход          |
| BUY         | "buy"        | Расход          |
| RETURN_SALE | "returnSale" | Возврат прихода |
| RETURN_BUY  | "returnBuy"  | Возврат расхода | 

### PositionItemSign - тип позиции

| Свойство       | Значение        | Описание                 |
 |----------------|-----------------|--------------------------|
| SERVICE        | "service"       | Услуга                   |
| PRODUCT        | "product"       | Товар                    |
| EXCISE_PRODUCT | "exciseProduct" | Акцизный товар           |
| WORK           | "work"          | Работа                   |
| GAME_BET       | "gameBet"       | Ставка на игру           |
| GAME_WIN       | "gameWin"       | Выигрыш ставки           |
| LOTTERY_BET    | "lotteryBet"    | Лотерейная ставка        |
| LOTTERY_WIN    | "lotteryWin"    | Выигрыш в лотерею        |
| RID            | "rid"           |                          |
| PAY            | "pay"           |                          |
| AGENT_FEE      | "agentFee"      | Агентское вознаграждение |
| COMPOSITE      | "composite"     |                          |
| OTHER          | "other"         | Иное                     |

### PositionNdsType - тип НДС позиции

| Свойство | Значение | Описание |
 |----------|----------|----------|
| NDS20    | "nds20"  | НДС 20%  |
| NDS18    | "nds18"  | НДС 18%  |
| NDS10    | "nds10"  | НДС 10%  |
| NDS0     | "nds0"   | НДС 0%   |
| NONDS    | "nonds"  | Без НДС  |

### PositionTypeSign - тип оплаты позиции

| Свойство   | Значение    | Описание          |
 |------------|-------------|-------------------|
| FULL_PAY   | "fullPay"   | Полный расчет     |
| ADVANCE    | "advance"   | Аванс             |
| PREPAY100  | "prePay100" | Полная предоплата |
| PREPAY     | "prePay"    | Предоплата        |
| PART_PAY   | "partPay"   | Частичная оплата  |
| CREDIT     | "credit"    | Кредит            |
| PAY_CREDIT | "payCredit" |                   |
