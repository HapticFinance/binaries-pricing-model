# Binary Option Pricing

This repository contains a set of smart contracts that implement the Black-Scholes formulas for binary option valuations. The contracts are written in Solidity and tested using Hardhat.

Binary options are a type of derivative contract that is used to speculate on the price movement of an underlying asset. The main advantage of binary options is that the maximum profit or loss is known in advance, usually defined by the type of option and the strike price. Binary options can be priced using the Black-Scholes model or alternative approaches such as the binomial method. 

We focus on *"asset-or-nothing"* and *"cash-or-nothing"* binary options. The former pays a unit of the underlying asset when "in-the-money" while the latter pays one unit of cash asset. The Black-Scholes formulas for binary option valuations are [1]:

#### Asset-or-nothing

$C = S{\rm e}^{−r\tau} \Phi(d_{1})$ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Call)

$P = S{\rm e}^{−r\tau} \Phi(−d_{1})$ &nbsp;&nbsp;&nbsp;(Put)


#### Cash-or-nothing

$C = {\rm e}^{−r\tau} \Phi(d_{2})$ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Call)

$P = {\rm e}^{−r\tau} \Phi(−d_{2})$ &nbsp;&nbsp;&nbsp;(Put)


For details on the notation and formulas consult the document located in the `pdf/` folder. 
If you have R installed you can also generate the pdf by running `./gen.r`. The source is located in the `gen.rmd` file. 

## Install dependencies

To install dependencies run:

``` npm install ```

## Compile

To compile contracts run:

``` npx hardhat compile```

## Test

To run tests run:

``` npx hardhat test```

This will run the tests located under the `test/` folder using the `hardhat` network.

## Bibliography

[1] Binary options, available at https://en.wikipedia.org/wiki/Binary_option

### Disclaimer
*This code is currently in the ALPHA stage of development. It is provided "as is" and may contain errors, bugs, or incomplete functionality. It is NOT recommended to use this code in production environments or for critical tasks.*

