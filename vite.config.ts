import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      include: "**/*.svg?react",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  base: "/token-swapper-web3/",
  optimizeDeps: {
    include: ["@0xsquid/sdk", "ethers", "viem"],
  },
});
