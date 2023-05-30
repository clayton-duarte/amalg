import Big, { BigSource } from 'big.js';

import { ALMOST_ZERO, ZERO } from './consts';

export function isNumber(value: BigSource) {
  return value && !isNaN(Number(value));
}

export function isZero(value: BigSource) {
  return isNumber(value) && new Big(value).eq(0);
}

export function notZero(value: BigSource) {
  if (!isNumber(value) || isZero(value)) {
    return ALMOST_ZERO;
  }

  return value;
}

export function validNumberOrZero(value: BigSource) {
  return isNumber(value) ? value : ZERO;
}
