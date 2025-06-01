import { ConnectButton } from "@rainbow-me/rainbowkit";
import DropDownArrow from "../assets/dropDownArrow.svg?react";
import { useAccountStore } from "../contexts/accountContext";

export const CustomConnectButton = () => {
  const { connector } = useAccountStore();

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;

        const connected = ready && account && chain;
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="bg-primary rounded-2xl px-6 py-4 text-primary-foreground"
                  >
                    connect wallet
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <button
                  onClick={openAccountModal}
                  type="button"
                  className="flex items-center text-xl gap-2.5 text-primary-foreground bg-primary w-fit rounded-2xl px-6 py-4 "
                >
                  <img src={connector?.icon} className="w-6" />
                  {account.displayName}
                  <DropDownArrow className="w-4 h-4 text-primary-foreground" />
                </button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
