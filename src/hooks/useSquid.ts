import { Squid } from "@0xsquid/sdk";

const squid = new Squid({
  baseUrl: "https://api.squidrouter.com", // прод или staging
  integratorId: "your-integrator-id", // можно пропустить для теста
});

await squid.init(); // обязательно!
export default squid;
