import { useBalance, useReadContract } from "wagmi";
import { erc20Abi } from "viem";
import { useAccountStore } from "../contexts/accountContext";
import type { CryptoToken } from "../components/ui/inputButton/types";

export function useTokenBalance(token: CryptoToken | null) {
  const { address } = useAccountStore();

  return useBalance({
    address,
    token: token?.isNative
      ? undefined
      : (token?.contractAddress as `0x${string}`),
    query: { enabled: !!address && !!token },
  });
}

export function useTokenAllowance(
  token: CryptoToken | null,
  spender: `0x${string}`,
) {
  const { address } = useAccountStore();

  return useReadContract({
    address: token?.contractAddress as `0x${string}`,
    abi: erc20Abi,
    functionName: "allowance",
    args: [address!, spender],
    query: { enabled: !!address && !!token && !token.isNative },
  });
}
