import hre from "hardhat";
import { addresses } from "../scripts/common/constants.ts";
import { yellow, red, gray, fromBN, toBN, compareResults, combineArrays } from "../scripts/common/utils.ts";
import IERC20 from '../artifacts/contracts/interfaces/IERC20.sol/IERC20.json';
import {
    callDelta,
    callPrice,
    d1,
    d2,
    optionPrices,
    putDelta,
    putPrice,
    stdNormal,
    stdNormalCDF,
    stdVega,
    vega,
  } from './utils/BlackScholes.ts';

const { ethers } = hre;

const TOKEN_IDS = [
    365620, //WETH/DAI pool 0.3% fee
    365818
]

const SUSD = addresses.erc20Tokens.SUSD;
const WETH = addresses.erc20Tokens.WETH;

const TOKENS = [
  addresses.erc20Tokens.WETH,
  addresses.erc20Tokens.SUSD
]

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
const HOUR_SEC = 60 * 60;
const DAY_SEC = 24 * HOUR_SEC;
const WEEK_SEC = 7 * DAY_SEC;

const testData = {
    thorough: {
      timeToExp: [0.00001, 0.0001, 0.001, 1],
      volatility: [0.0002, 0.02, 2, 20, 200, 2000],
      low_spot: [0.000003, 0.0003, 3],
      high_spot: [3e12, 3e16, 3e20],
      low_strikePrice: [0.000007, 0.0007, 7],
      high_strikePrice: [7e12, 7e16, 7e20],
      rate: [-50, -5, -0.05, 0, 0.05, 5, 50],
    },
    quick: {
      timeToExp: [0.00001, 0.0001, 0.001],
      volatility: [0.02, 2],
      low_spot: [0.000003, 0.0003],
      high_spot: [3e12, 3e16],
      low_strikePrice: [0.000007, 0.0007],
      high_strikePrice: [7e12, 7e16],
      rate: [-0.05, 0, 0.05],
    },
  };
  
  // NOTE: change this to `thorough` for more test cases, `quick` for less
  const dataToTestWith = testData.quick;
  
  const combinedTestDataArrays = [
    ...combineArrays([
      dataToTestWith.timeToExp,
      dataToTestWith.volatility,
      dataToTestWith.low_spot,
      dataToTestWith.low_strikePrice,
      dataToTestWith.rate,
    ]),
    ...combineArrays([
      dataToTestWith.timeToExp,
      dataToTestWith.volatility,
      dataToTestWith.high_spot,
      dataToTestWith.high_strikePrice,
      dataToTestWith.rate,
    ]),
  ];

const main = async () => {

    const [
        account0
    ] = await ethers.getSigners();

    const defaultParams = {
        timeToExp: WEEK_SEC * 2,
        vol: 0.5,
        spot: 1800,
        strike: 1900,
        rate: 0.05,
      };


    const BlackScholesTest = await hre.ethers.getContractAt(
        "BlackScholesTest",
        addresses.testBlackScholes
    );

    let results = { good: 0, bad: 0, unacceptable: 0 };

    for (const val of combinedTestDataArrays) {
        
        const [timeToExpiry, volatility, spot, strikePrice, rate] = val;

        let d1d2 = await BlackScholesTest.testBlackScholes(
            toBN(timeToExpiry.toString()).mul(1e9),
            toBN(volatility.toString()).mul(1e9),
            toBN(spot.toString()).mul(1e9),
            toBN(strikePrice.toString()).mul(1e9),
            toBN(rate.toString()).mul(1e9),
        );
        const expectedD1 = d1(timeToExpiry, volatility, spot, strikePrice, rate);
        const expectedD2 = d2(timeToExpiry, volatility, spot, strikePrice, rate);

        results = compareResults(d1d2[0], toBN(expectedD1.toString()), results, val);
        results = compareResults(d1d2[1], toBN(expectedD2.toString()), results, val);
    }

    const bsInput = {
        rateDecimal: toBN(defaultParams.rate.toString()),
        spotDecimal: toBN(defaultParams.spot.toString()),
        strikePriceDecimal: toBN(defaultParams.strike.toString()),
        timeToExpirySec: defaultParams.timeToExp,
        volatilityDecimal: toBN(defaultParams.vol.toString()),
    };

    console.log(bsInput)

    const prices = await BlackScholesTest.testCashOrNothingPrice(
        bsInput
    );

    console.log(`Call Price: ${ethers.utils.formatUnits(prices[0])}`);
    console.log(`Put Price: ${ethers.utils.formatUnits(prices[1])}`);

    const pricesAon = await BlackScholesTest.testAssetOrNothingPrice(
        bsInput
    );

    console.log(`Call Price: ${ethers.utils.formatUnits(pricesAon[0])}`);
    console.log(`Put Price: ${ethers.utils.formatUnits(pricesAon[1])}`);


}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

