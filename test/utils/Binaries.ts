import {
    stdNormalCDF,
    d1,
    d2,
    PV
} from './BlackScholes';


export function cashCallPrice(tAnnualised, vol, spot, strikePrice, rate) {

    const rfCompFactor = PV(1, rate, tAnnualised);
    const _d2 = d2(tAnnualised, vol, spot, strikePrice, rate);
    const call = rfCompFactor * stdNormalCDF(_d2) ;
    
    return call
}

export function cashPutPrice(tAnnualised, vol, spot, strikePrice, rate) {

    const rfCompFactor = PV(1, rate, tAnnualised);
    const _d2 = d2(tAnnualised, vol, spot, strikePrice, rate);
    const put = rfCompFactor * stdNormalCDF(-_d2) ;
    
    return put
}



