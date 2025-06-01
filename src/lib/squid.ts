import { Squid } from "@0xsquid/sdk";

(async () => {
  // instantiate the SDK
  const squid = new Squid();

  squid.setConfig({
    baseUrl: "https://api.0xsquid.com",
    integratorId: "your-integrator-id",
  });

  // init the SDK
  await squid.init();
  console.log("Squid inited");
})();
