export default defineConfig({
  base: "/test1/",
  nitro: {
    baseURL: "/test1",
  },
  tanstackStart: {
    server: { entry: "server" },
  },
});
