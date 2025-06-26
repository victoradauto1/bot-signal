import config from "../config";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";

import { Telegraf } from "telegraf";

const bot  = new Telegraf(config.TOKEN_ADDRESS);

async function getPrice(): Promise<Number>{
    const {result} = await Moralis.EvmApi.token.getTokenPrice({
        address: config.TOKEN_ADDRESS,
        chain: EvmChain.ETHEREUM,
        exchange: config.EXCHANGE
    });

    const message = `USD ${result.usdPrice}`
    return result.usdPrice;
    await bot.telegram.sendMessage(config.CHAT_ID, message);
}

async function start(){
    await Moralis.start({
        apiKey: config.APY_KEY,
    });

    const price = await getPrice();

    setInterval(getPrice, config.INTERVAL )
    
};

start();