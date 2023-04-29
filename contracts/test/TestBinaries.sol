//SPDX-License-Identifier: ISC
pragma solidity 0.8.18;

import "../Binaries.sol";
import "../BlackScholes.sol";

contract TestBinaries {

    function testBlackScholes(
        uint tAnnualised,
        uint volatility,
        uint spot,
        uint strikePrice,
        int rate
    ) external pure returns (int, int) {
        return BlackScholes.d1d2(
            tAnnualised, 
            volatility, 
            spot, 
            strikePrice, 
            rate
        );
    }

    function testCashOrNothingPrice(
        BlackScholes.BlackScholesInputs memory bsInput
    ) external pure returns (uint call, uint put) {

        (call, put) = Binaries._cashOrNothingPrices(
            bsInput
        );
    }

    function testAssetOrNothingPrice(
        BlackScholes.BlackScholesInputs memory bsInput
    ) external pure returns (uint call, uint put) {

        (call, put) = Binaries._assetOrNothingPrices(
            bsInput
        );
    }

    function testOptionPrices(
        BlackScholes.BlackScholesInputs memory bsInput
    ) external pure returns (uint call, uint put) {
        return BlackScholes.optionPrices(bsInput);
    }

}
