import axios from "axios";

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
        fromChain: "42161",
        toChain: "42161",
        fromToken: fromToken,
        toToken: toToken,
        fromAmount: amount,
        fromAddress: address,
        toAddress: address,
        enableBoost: true,
        slippage: 1,
        slippageConfig: {
          autoMode: 1,
        },
      },
      {
        headers: {
          "x-integrator-id": "test-e353013d-ffaa-45c5-b898-31e6a5e7e024",
          "Content-Type": "application/json",
        },
      },
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
        throw new Error(
          "Route not found. Please try different tokens or amount.",
        );
      }
      throw new Error(error.response?.data?.message || error.message);
    }
    throw error;
  }
};
