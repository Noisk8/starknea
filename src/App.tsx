// import { useBlock } from "@starknet-react/core";
import Header from "./components/Header";
import Balances from "./components/starknet/Balances";
import  Transactions from "./components/starknet/Transactions";

function App() {
  return (
    <main className=" flex flex-col items-center justify-center min-h-screen gap-12">
      <Header />
      <Balances />


      <br></br>
     
     <Transactions />
      <div className="flex flex-row gap-12">
       
  
      </div>
    </main>
  );
}

export default App;
