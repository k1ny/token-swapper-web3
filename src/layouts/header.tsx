import { CustomConnectButton } from "../components/customConnectButton";
import Logo from "@/assets/Logo-pirate.svg?react";

export const Header = () => {
  return (
    <header className="flex justify-between items-center">
      <Logo />
      <CustomConnectButton />
    </header>
  );
};
