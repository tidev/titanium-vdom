export function isNumeric(value: any) {
  value = '' + value;
  return !isNaN(value) && !isNaN(parseFloat(value));
}

export function toNumber(value: any) {
  if (Number.isSafeInteger(value)) {
    return Number.parseInt(value, 10);
  } else {
    return Number.parseFloat(value);
  }
}
