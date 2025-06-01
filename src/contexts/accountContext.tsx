import { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";

type AccountContextType = {
  address: string | null;
  connector: object | null;
  isConnected: boolean;
  isDisconnected: boolean;
  status: string | null;
  chain: object | null;
};

const AccountContext = createContext<AccountContextType | null>(null);

export const AccountProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { address, connector, isConnected, isDisconnected, status, chain } =
    useAccount();

  const [wallet, setWallet] = useState<AccountContextType>({
    address: null,
    connector: null,
    isConnected: false,
    isDisconnected: false,
    status: null,
    chain: null,
  });

  useEffect(() => {
    setWallet({
      address: address || null,
      connector: connector || null,
      isConnected,
      isDisconnected,
      status: status || null,
      chain: chain || null,
    });
  }, [address, connector, isConnected, isDisconnected, status, chain]);

  return (
    <AccountContext.Provider value={wallet}>{children}</AccountContext.Provider>
  );
};

export const useAccountStore = () => {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error("useWallet must be used inside WalletProvider");
  return ctx;
};
