import numeral from "numeral";
import Big from "big.js";

export function toMoney(money, symbol = "RMB", format = "0,0") {
  return `${symbol} ${numeral(money).format(format)}`;
}

export function toFloat(float, format = "0,0") {
  return numeral(float).format(format);
}