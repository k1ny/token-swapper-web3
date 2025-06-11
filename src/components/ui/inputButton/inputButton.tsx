import { useState } from "react";
import UsdtIcon from "@/assets/usdt-icon.svg?react";
import UsdcIcon from "@/assets/usdc-icon.svg?react";
import EthIcon from "@/assets/eth-icon.svg?react";
import DropDownArrow from "@/assets/dropDownArrow.svg?react";
import { Modal } from "../modal";
import type { CryptoToken } from "./types";

export const ARBITRUM_TOKENS: CryptoToken[] = [
  {
    symbol: "USDT",
    label: "USDT",
    img: <UsdtIcon />,
    contractAddress: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    decimals: 6,
    isNative: false, // ✅ Добавлено
  },
  {
    symbol: "USDC",
    label: "USDC",
    img: <UsdcIcon />,
    contractAddress: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    decimals: 6,
    isNative: false, // ✅ Добавлено
  },
  {
    symbol: "ETH",
    label: "ETH",
    img: <EthIcon />,
    contractAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    decimals: 18,
    isNative: true,
  },
];

interface InputButtonProps {
  disabled?: boolean;
  onSelect?: (crypto: CryptoToken) => void;
  onAmountChange?: (amount: string) => void;
}

export const InputButton: React.FC<InputButtonProps> = ({
  disabled,
  onSelect,
  onAmountChange,
  ...rest
}) => {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoToken | null>(
    null,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState("");

  const handleSelect = (crypto: CryptoToken) => {
    setSelectedCrypto(crypto);
    setModalOpen(false);
    onSelect?.(crypto);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    onAmountChange?.(value);
  };

  return (
    <div className="w-full">
      {!selectedCrypto ? (
        <button
          onClick={() => setModalOpen(true)}
          type="button"
          className="bg-primary-foreground text-dark-brown px-6 py-7 rounded-xl border-2 border-dark-brown w-full text-xl font-medium flex items-center justify-between"
          aria-label="Select asset"
          {...rest}
        >
          Select asset
          <DropDownArrow />
        </button>
      ) : (
        <div className="relative w-full">
          <input
            disabled={disabled}
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="0.0"
            className="w-full px-6 py-7 bg-primary-foreground-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-foreground px-3 py-1 rounded-lg text-2xl flex items-center gap-2"
            aria-label={`Select ${selectedCrypto.symbol} as asset`}
          >
            {selectedCrypto.symbol}
            {selectedCrypto.img}
            <DropDownArrow />
          </button>
        </div>
      )}

      {modalOpen && (
        <Modal>
          <div className="bg-primary-foreground p-6 rounded-[40px] max-w-sm w-full space-y-4 border-4 border-dark-brown">
            {ARBITRUM_TOKENS.map((crypto) => (
              <button
                key={crypto.symbol}
                type="button"
                onClick={() => handleSelect(crypto)}
                className="w-full text-left px-4 py-7 border rounded-2xl flex items-center justify-between text-2xl"
                aria-label={`Select ${crypto.label} as asset`}
              >
                {crypto.label}
                {crypto.img}
              </button>
            ))}
            <button
              onClick={() => setModalOpen(false)}
              className="w-full bg-primary text-primary-foreground rounded-2xl py-6"
              aria-label="Close the cryptocurrency selection modal"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};
