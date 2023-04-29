import hre from "hardhat";
import {
    addresses
} from "../scripts/common/constants.ts";
import {
    yellow,
    red,
    gray,
    fromBN,
    toBN,
    compareResults,
    combineArrays
} from "../scripts/common/utils.ts";

import {
    ZERO_ADDRESS,
    HOUR_SEC,
    DAY_SEC,
    WEEK_SEC,
    YEAR_SEC
} from './utils/constants.ts';

import {
    assertCloseToPercentage,
    getPercentageDiff
} from './utils/assert';

import IERC20 from '../artifacts/contracts/interfaces/IERC20.sol/IERC20.json';
import {
    cashCallPrice,
    cashPutPrice
} from './utils/Binaries.ts';

import {
    expect
} from './utils/testSetup.ts';

global.HEAVY_TESTS = true;

const defaultParams = {
    timeToExp: WEEK_SEC * 2,
    vol: 0.7,
    spot: 2998.7,
    strike: 3100,
    rate: 0.05,
};

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
        timeToExp: [120960, 1209600],
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

describe('Binaries - values', () => {
    let account: Signer;
    let blackScholes: BlackScholes;
    let testBlackScholes: TestBlackScholes;
    let testBinaries: TestBinaries;

    beforeEach(async () => {
        const signers = await ethers.getSigners();
        account = signers[0];

        blackScholes = await (await ethers.getContractFactory('BlackScholes')).connect(account).deploy();
        testBinaries = (await (
                await ethers.getContractFactory('TestBinaries', {
                    libraries: {
                        BlackScholes: blackScholes.address,
                    },
                })
            )
            .connect(account)
            .deploy()) as TestBinaries;
    });

    describe('binaryPrices', async () => {
        it('calculate binaries prices with respect to changes in parameters', async () => {
            if (!(global as any).HEAVY_TESTS) {
                return;
            }
            let results = {
                good: 0,
                bad: 0,
                unacceptable: 0
            };

            for (const val of combinedTestDataArrays) {
                const [timeToExpiry, volatility, spot, strikePrice, rate] = val;
                const expectedCallPrice = toBN(cashCallPrice(timeToExpiry, volatility, spot, strikePrice, rate).toString());
                const expectedPutPrice = toBN(cashPutPrice(timeToExpiry, volatility, spot, strikePrice, rate).toString());

                console.log({
                    timeToExpiry: timeToExpiry,
                    volatility: volatility,
                    spot: spot,
                    strikePrice: strikePrice,
                    rate: rate,
                    expectedCallPrice: expectedCallPrice,
                    expectedPutPrice: expectedPutPrice
                });

                const bsInput: BlackScholesInputsStruct = {
                    rateDecimal: toBN(rate.toString()),
                    spotDecimal: toBN(spot.toString()),
                    strikePriceDecimal: toBN(strikePrice.toString()),
                    timeToExpirySec: timeToExpiry,
                    volatilityDecimal: toBN(volatility.toString()),
                };

                // console.log(bsInput)

                const optionPrices = await testBinaries.testCashOrNothingPrice(bsInput);

                assertCloseToPercentage(optionPrices[0], expectedCallPrice);
                assertCloseToPercentage(optionPrices[1], expectedPutPrice);
            }
        });
    });

});