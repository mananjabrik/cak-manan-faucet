import { defineChain } from "viem";

export const pesseTesnet = defineChain({
  id: 7734,
  name: 'pesse',
  nativeCurrency: {
    name: 'PESSE',
    symbol: 'PESSE',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-dev.cakmanan.site'],
      webSocket: ['wss://rpc-dev.cakmanan.site'],
    },
  },
  blockExplorers: {
    default: { name: 'explorer', url: 'https://explorer.cakmanan.site/' },
  },
});