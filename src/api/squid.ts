import axios from "axios";

const INTEGRATOR_ID =  "noxlabs-test";

export const getSwapQuote = async (
  fromToken: string,
  toToken: string,
  amount: string,
  address: string,
) => {
  try {
    const response = await axios.post(
      "https://v2.api.squidrouter.com/v2/route",
      {
        fromChain: "arbitrum",
        toChain: "arbitrum",
        fromToken,
        toToken,
        fromAmount: amount,
        fromAddress: address,
        toAddress: address,
        slippage: 1, // 1% slippage
        enableBoost: true,
      },
      {
        headers: {
          "x-integrator-id": INTEGRATOR_ID,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data || !response.data.route) {
      throw new Error("Invalid response from Squid API");
    }

    return {
      ...response.data,
      requestId: response.headers["x-request-id"],
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Route not found. Please try different tokens or amount.");
      }
      throw new Error(error.response?.data?.message || error.message);
    }
    throw error;
  }
};
