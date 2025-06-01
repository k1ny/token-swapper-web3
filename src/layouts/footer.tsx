import { useChains } from "wagmi";
import ArbitrumIcon from "../assets/arbitrum-logo.svg?react";

export const Footer = () => {
  const chains = useChains();
  console.log(chains);
  return (
    <footer className="flex justify-end mt-auto">
      <div className="bg-primary-foreground w-fit p-2 border-2 border-primary rounded-xl">
        <ArbitrumIcon />
      </div>
    </footer>
  );
};
