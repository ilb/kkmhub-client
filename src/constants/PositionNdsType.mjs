/**
 * @typedef {Object} PositionNdsType - тип НДС позиции
 *
 * @property {"nds20"} NDS20 - НДС 20%
 * @property {"nds18"} NDS18 - НДС 18%
 * @property {"nds10"} NDS10 - НДС 10%
 * @property {"nds0"} NDS0 - НДС 0%
 * @property {"nonds"} NONDS - без НДС
 */
const PositionNdsType = {
  NDS20: "nds20",
  NDS18: "nds18",
  NDS10: "nds10",
  NDS0: "nds0",
  NONDS: "nonds",
}

export default PositionNdsType;
