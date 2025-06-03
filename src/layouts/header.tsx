import { CustomConnectButton } from "../components/customConnectButton";

export const Header = () => {
  return (
    <header className="flex justify-between items-center">
      <img src="/logo-pirate.png" />
      <CustomConnectButton />
    </header>
  );
};
