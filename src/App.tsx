import "./App.css";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { arbitrum } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import MainPage from "./pages/mainPage";
import { AccountProvider } from "./contexts/accountContext";
import { Header } from "./layouts/header";
import { Footer } from "./layouts/footer";

const config = getDefaultConfig({
  appName: "noxlabs-test",
  projectId: "test",
  chains: [arbitrum],
});

export default function App() {
  return (
    <WagmiConfig config={config}>
      <AccountProvider>
        <RainbowKitProvider>
          <div className="bg-[url(/page-bg.png)] bg-cover bg-no-repeat min-h-screen w-full px-10 py-8 flex flex-col">
            <Header />
            <MainPage />
            <Footer />
          </div>
        </RainbowKitProvider>
      </AccountProvider>
    </WagmiConfig>
  );
}
