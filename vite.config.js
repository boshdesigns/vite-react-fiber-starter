import { resolve } from "path";
import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";
import react from "@vitejs/plugin-react";

// This is required for Vite to work correctly with CodeSandbox
const server = {};

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const isWatch = command === "serve";

  return {
    server: server,
    resolve: {
      alias: {
        "@src": resolve(__dirname, "./src"),
      },
    },
    plugins: [glsl(), react()],
    define: {
      IS_WATCH: isWatch,
    },
  };
});
