// import { useBlock } from "@starknet-react/core";
import Header from "./components/Header";
import Balances from "./components/starknet/Balances";

function App() {
  return (
    <main className=" flex flex-col items-center justify-center min-h-screen gap-12">
      <Header />
      <Balances />
     
      <div className="flex flex-row gap-12">
       
      
      </div>
    </main>
  );
}

export default App;
