import { erf } from 'mathjs';

export function stdNormalCDF(x) {
  return (1.0 - erf(-x / Math.sqrt(2))) / 2.0;
}

export function stdNormal(x) {
  return Math.exp((-x * x) / 2.0) / Math.sqrt(2.0 * Math.PI);
}

export function d1(tAnnualised, vol, spot, strikePrice, rate) {
  return (Math.log(spot / strikePrice) + (rate + (vol * vol) / 2.0) * tAnnualised) / (vol * Math.sqrt(tAnnualised));
}

export function d2(tAnnualised, vol, spot, strikePrice, rate) {
  return d1(tAnnualised, vol, spot, strikePrice, rate) - vol * Math.sqrt(tAnnualised);
}

export function PV(value, rate, tAnnualised) {
  return value * Math.exp(-rate * tAnnualised);
}

export function callPrice(tAnnualised, vol, spot, strikePrice, rate) {
  return (
    stdNormalCDF(d1(tAnnualised, vol, spot, strikePrice, rate)) * spot -
    stdNormalCDF(d2(tAnnualised, vol, spot, strikePrice, rate)) * PV(strikePrice, rate, tAnnualised)
  );
}

export function putPrice(tAnnualised, vol, spot, strikePrice, rate) {
  return (
    stdNormalCDF(-d2(tAnnualised, vol, spot, strikePrice, rate)) * PV(strikePrice, rate, tAnnualised) -
    stdNormalCDF(-d1(tAnnualised, vol, spot, strikePrice, rate)) * spot
  );
}

export function optionPrices(tAnnualised, vol, spot, strikePrice, rate) {
  return [callPrice(tAnnualised, vol, spot, strikePrice, rate), putPrice(tAnnualised, vol, spot, strikePrice, rate)];
}

export function callDelta(tAnnualised, vol, spot, strikePrice, rate) {
  return stdNormalCDF(d1(tAnnualised, vol, spot, strikePrice, rate));
}

export function putDelta(tAnnualised, vol, spot, strikePrice, rate) {
  return callDelta(tAnnualised, vol, spot, strikePrice, rate) - 1.0;
}

export function vega(tAnnualised, vol, spot, strikePrice, rate) {
  return spot * stdNormal(d1(tAnnualised, vol, spot, strikePrice, rate)) * Math.sqrt(tAnnualised);
}

export function stdVega(tAnnualised, vol, spot, strikePrice, rate) {
  const minStandardisation = 7 / 365;
  const daysToExpiry = Math.floor((tAnnualised < minStandardisation ? minStandardisation : tAnnualised) * 365);
  const normalisationFactor = Math.sqrt(30 / daysToExpiry) / 100;

  return vega(tAnnualised, vol, spot, strikePrice, rate) * normalisationFactor;
}

export function gamma(tAnnualised, vol, spot, strikePrice, rate) {
  return stdNormal(d1(tAnnualised, vol, spot, strikePrice, rate)) / (spot * vol * Math.sqrt(tAnnualised));
}

export function theta(tAnnualized, vol, spot, strikePrice, rate, isCall) {
  if (isCall) {
    return (
      (-spot * stdNormal(d1(tAnnualized, vol, spot, strikePrice, rate)) * vol) / (2 * Math.sqrt(tAnnualized)) -
      rate * strikePrice * Math.exp(-rate * tAnnualized) * stdNormalCDF(d2(tAnnualized, vol, spot, strikePrice, rate))
    );
  } else {
    return (
      (-spot * stdNormal(d1(tAnnualized, vol, spot, strikePrice, rate)) * vol) / (2 * Math.sqrt(tAnnualized)) +
      rate * strikePrice * Math.exp(-rate * tAnnualized) * stdNormalCDF(-d2(tAnnualized, vol, spot, strikePrice, rate))
    );
  }
}

export function rho(tAnnualised, vol, spot, strikePrice, rate, isCall) {
  if (isCall) {
    return (
      strikePrice *
      tAnnualised *
      Math.exp(-rate * tAnnualised) *
      stdNormalCDF(d2(tAnnualised, vol, spot, strikePrice, rate))
    );
  } else {
    return (
      -strikePrice *
      tAnnualised *
      Math.exp(-rate * tAnnualised) *
      stdNormalCDF(-d2(tAnnualised, vol, spot, strikePrice, rate))
    );
  }
}

