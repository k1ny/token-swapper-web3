import type React from "react";

export interface CryptoToken {
  symbol: "USDT" | "USDC" | "ETH";
  label: string;
  img: React.ReactNode;
  contractAddress: `0x${string}`;
  decimals: number;
  isNative?: boolean;
  isEvmos?: boolean;
}
