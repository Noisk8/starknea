import { mainnet, sepolia } from "@starknet-react/chains";


import { jsonRpcProvider } from "@starknet-react/core";
import {
  StarknetConfig,
  argent,
  braavos,
  useInjectedConnectors,
} from "@starknet-react/core";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.css";

function rpc() {
  return {
    nodeUrl: "https://starknet-sepolia.public.blastapi.io/rpc/v0_7"
  }
}
 


export default function Root({ children }: { children: React.ReactNode }) {
  const chains = [sepolia, mainnet];
  const provider = jsonRpcProvider({ rpc });
  const { connectors } = useInjectedConnectors({
    // Show these connectors if the user has no connector installed.
    recommended: [argent(), braavos()],
    // Randomize the order of the connectors.
    order: "random",
  });

  console.log(provider)
  return (
    <StarknetConfig
      autoConnect
      chains={chains}
      provider={provider}
      connectors={connectors}
    >
      {children}
    </StarknetConfig>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Root>
      <App />
    </Root>
  </React.StrictMode>,
);
