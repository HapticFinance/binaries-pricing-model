import deployed from "./deployed.json";

export const addresses = {
    owner: "0x315C81fbfECb0E8CEd3e000e2f8817C45d1998c8",
    erc20Tokens: {
      DAI: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      SUSD: "0x8c6f28f2f1a3c87f0f938b96d27520d9751ec8d9",
      USDT: "0x55d398326f99059fF775485246999027B3197955",
      WETH: "0x4200000000000000000000000000000000000006",
    },
    hapticLibrary: deployed.hapticLibrary,
    hapticFactory: deployed.hapticFactory,
    hapticPool: deployed.hapticPool,
    hapticRouter: deployed.hapticRouter,
    hapticEngine: deployed.hapticEngine,
    hapticMarket: deployed.hapticMarket,
    hapticOption: deployed.hapticOption,
    liquidityMath: deployed.liquidityMath,
    liquidityManager: deployed.liquidity,
    testBlackScholes: deployed.testBlackScholes,
    uniswapV3VolOracle: deployed.uniswapV3VolOracle,
    positionController: deployed.positionController,
    NFTManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
    UniswapFactory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
}
