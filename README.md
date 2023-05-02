# Binary Option Valuation

Binary options, also called "digital options", are a type of derivative contract that is used to speculate on the price movement of an underlying asset. The main advantage of binary options is that the maximum profit or loss is known in advance, usually defined by the type of option and the strike price. Binary options can be priced using the Black-Scholes model. We focus on "asset-or-nothing" and "cash-or-nothing" binary options.
The former pays a unit of the underlying asset when "in-the-money" while the latter pays 1 unit of cash asset. 

## Asset-or-nothing

$C = S{\rm e}^{−r\tau} \Phi(d_{1})$ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Call)

$P = S{\rm e}^{−r\tau} \Phi(−d_{1})$ &nbsp;&nbsp;&nbsp;(Put)


## Cash-or-nothing

$C = {\rm e}^{−r\tau} \Phi(d_{2})$ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Call)

$P = {\rm e}^{−r\tau} \Phi(−d_{2})$ &nbsp;&nbsp;&nbsp;(Put)


For details on the notation and formulas consult the document located in the `pdf/` folder.

## Compile

To compile contracts run:

```bash npx hardhat compile```

## Test

To run tests run:

```bash npx hardhat test```

This will run the tests located under the `test/` folder using the `hardhat` network.


### Alpha Disclaimer
This code is currently in the ALPHA stage of development. It is provided "as is" and may contain errors, bugs, or incomplete functionality. It is NOT recommended to use this code in production environments or for critical tasks.

