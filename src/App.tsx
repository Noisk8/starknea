// import { useBlock } from "@starknet-react/core";
import Header from "./components/Header";
import Balances from "./components/starknet/Balances";
import  Transactions from "./components/starknet/Transactions";

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="wallet-dashboard">
        <div className="dashboard-section">
          <Balances />
        </div>
        <div className="dashboard-section">
          <Transactions />
        </div>
      </div>
    </div>
  );
}

export default App;
