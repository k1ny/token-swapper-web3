import { useState, type ReactElement } from "react";
import UsdtIcon from "../../assets/usdt-icon.svg?react";
import UsdcIcon from "../../assets/usdc-icon.svg?react";
import EthIcon from "../../assets/eth-icon.svg?react";
import DropDownArrow from "../../assets/dropDownArrow.svg?react";
import { Modal } from "./modal";

const cryptos = [
  { symbol: "USDT", label: "USDT", img: <UsdtIcon /> },
  { symbol: "USDC", label: "USDC", img: <UsdcIcon /> },
  { symbol: "ETH", label: "ETH", img: <EthIcon /> },
];

interface InputButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled: boolean;
}

export const InputButton: React.FC<InputButtonProps> = ({
  disabled,
  ...rest
}) => {
  const [selectedCrypto, setSelectedCrypto] = useState<null | {
    symbol: string;
    label: string;
    img: ReactElement;
  }>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState("");

  const handleSelect = (crypto: {
    symbol: string;
    label: string;
    img: ReactElement;
  }) => {
    setSelectedCrypto(crypto);
    setModalOpen(false);
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
            onChange={(e) => setAmount(e.target.value)}
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
            {cryptos.map((crypto) => (
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
