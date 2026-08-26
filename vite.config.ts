import { defineConfig } from "@lovable.dev/vite-tanstack-config";
export default defineConfig({
  vite: {
    base: "/test1/",
  },
  nitro: { preset: "node-server" },
  tanstackStart: {
    server: { entry: "server" },
  },
});
