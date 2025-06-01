import { useAccountStore } from "../contexts/accountContext";
import { InputButton } from "./ui/inputButton";

export const ExchangeForm = () => {
  const { address, connector, isConnected, isDisconnected, status } =
    useAccountStore();

  return (
    <form className="bg-primary-foreground border-2 border-primary rounded-xl flex flex-col min-w-[500px] h-[388px] justify-between items-center py-8">
      <div className="w-full flex flex-col gap-8 px-6">
        <label className="font-bold">From</label>
        <InputButton />
      </div>

      <div className="w-full flex flex-col gap-8 px-6">
        <label className="font-bold">To</label>
        <InputButton disabled={true} />
      </div>
    </form>
  );
};
