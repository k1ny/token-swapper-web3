import { useEffect, useMemo, useState } from "react";
import { useAccountStore } from "../contexts/accountContext";
import { InputButton } from "./ui/inputButton/inputButton";
import type { CryptoToken } from "./ui/inputButton/types";
import { getSwapQuote } from "../api/squid";
import { useTokenAllowance, useTokenBalance } from "../hooks/useWallet";
import { useSendTransaction, useWriteContract } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { erc20Abi } from "viem";

export const ExchangeForm = () => {
  const { address, chain } = useAccountStore();
  const [fromToken, setFromToken] = useState<CryptoToken | null>(null);
  const [toToken, setToToken] = useState<CryptoToken | null>(null);
  const [amount, setAmount] = useState("");
  const [swapQuote, setSwapQuote] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);
  console.log(fromToken);
  console.log(toToken);

  const { data: balance } = useTokenBalance(fromToken);
  console.log(balance, "balance");
  const { data: allowance } = useTokenAllowance(
    fromToken,
    address as `0x${string}`,
  );
  console.log(allowance, "allowance");
  const { sendTransaction } = useSendTransaction();
  const { writeContract } = useWriteContract();
  console.log(chain, "chain");

  const parsedAmount = useMemo(() => {
    try {
      return fromToken ? parseUnits(amount || "0", fromToken.decimals) : 0n;
    } catch {
      return 0n;
    }
  }, [amount, fromToken]);

  const isAllowable =
    allowance && fromToken && (fromToken.isNative || parsedAmount <= allowance);

  const isSufficientBalance =
    balance && fromToken && parsedAmount <= balance.value;

  useEffect(() => {
    if (fromToken && toToken && amount && address) {
      const fetchQuote = async () => {
        try {
          setIsLoading(true);
          setError(null);

          const quote = await getSwapQuote(
            fromToken?.contractAddress,
            toToken?.contractAddress,
            parsedAmount.toString(),
            address,
          );
          console.log("QUOTE RESPONSE", quote);
          console.log("QUOTE ROUTE", quote.route);
          if (!quote || !quote.route) {
            throw new Error("Invalid route response from Squid API");
          }

          setSwapQuote(quote.route);
          setRequestId(quote.requestId);
        } catch (err) {
          console.error("Failed to fetch swap quote:", err);
          setError(
            err instanceof Error ? err.message : "Failed to get swap quote",
          );
          setSwapQuote(null);
          setRequestId(null);
        } finally {
          setIsLoading(false);
        }
      };

      fetchQuote();
    } else {
      setSwapQuote(null);
      setRequestId(null);
    }
  }, [fromToken, toToken, parsedAmount, address]);

  const handleSwap = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fromToken || !toToken || !amount || !address || !swapQuote) return;

    const tx = swapQuote.transactionRequest;
    if (!tx || !tx.target || !tx.data) {
      setError("Invalid transaction data from Squid");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      if (!fromToken.isNative && !isAllowable) {
        await writeContract({
          address: fromToken.contractAddress as `0x${string}`,
          abi: erc20Abi,
          functionName: "approve",
          args: [tx.target as `0x${string}`, parsedAmount],
        });
      }

      if (fromToken.isNative) {
        await sendTransaction({
          to: tx.target as `0x${string}`,
          value: parsedAmount,
          data: tx.data as `0x${string}`,
        });
      } else {
        await writeContract({
          address: tx.target as `0x${string}`,
          abi: tx.abi || erc20Abi,
          functionName: tx.functionName,
          args: tx.params,
          value: tx.value || 0n,
        });
      }

      console.log("Swap completed successfully");
    } catch (err) {
      console.error("Swap failed:", err);
      setError(
        err instanceof Error ? err.message : "Swap failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="bg-primary-foreground border-2 border-primary rounded-xl flex flex-col min-w-[500px] h-[388px] justify-between items-center py-8"
      onSubmit={handleSwap}
    >
      <div className="w-full flex flex-col gap-8 px-6">
        <div className="flex justify-between items-center">
          <label className="font-bold">From</label>
          {balance && fromToken && (
            <span className="text-sm">
              Balance: {formatUnits(balance.value, fromToken.decimals)}
            </span>
          )}
        </div>
        <InputButton onSelect={setFromToken} onAmountChange={setAmount} />
      </div>

      <div className="w-full flex flex-col gap-8 px-6">
        <div className="flex justify-between items-center">
          <label className="font-bold">To</label>
          {swapQuote && toToken && swapQuote.toAmount && (
            <span className="text-sm">
              Estimated:{" "}
              {formatUnits(BigInt(swapQuote.toAmount), toToken.decimals)}
            </span>
          )}
        </div>
        <InputButton onSelect={setToToken} disabled={true} />
      </div>

      {error && (
        <div className="text-red-500 text-sm px-6 mt-2 text-center">
          {error}
        </div>
      )}

      {fromToken && toToken && (
        <div className="w-full px-6">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-3 rounded-xl mt-4 w-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
            disabled={
              !amount || isLoading || !isSufficientBalance || !swapQuote
            }
          >
            {isLoading
              ? "Processing..."
              : !isSufficientBalance
                ? "Insufficient Balance"
                : !isAllowable
                  ? "Approve"
                  : "Swap"}
          </button>
        </div>
      )}
    </form>
  );
};
