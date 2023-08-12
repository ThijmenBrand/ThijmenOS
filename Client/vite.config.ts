import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import path from "path";

export default defineConfig({
  plugins: [eslintPlugin()],
  server: {
    cors: false,
  },
  resolve: {
    alias: {
      "@ostypes": path.resolve(__dirname, "./src/types/"),
      "@core": path.resolve(__dirname, "./src/core/"),
      "@providers": path.resolve(__dirname, "./src/providers"),
      "@utils": path.resolve(__dirname, "./src/utils/"),
      "@inversify": path.resolve(__dirname, "./"),
      "@thijmen-os/common": path.resolve(__dirname, "../Common"),
    },
  },
});
