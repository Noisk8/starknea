import { useAccount, useBalance } from "@starknet-react/core";

export default function Balances() {
  const { address } = useAccount();
  const { isLoading, isError, error, data } = useBalance({
    address,
    
    watch: true,
  });

  const  { isLoading: isBalanceLoading, isError: isBalanceError, error: balanceError, data: balanceData } = useBalance({

    token: "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
    address,
    watch: true
  })




  if (isLoading || isBalanceLoading  ) return <div>Loading...</div>;
  if (isError || isBalanceError ||   !data) return <div>{error?.message || balanceError?.message }</div>;

  return (
    <div className="fixed">
 {data.symbol} 
      <p>{data.value.toString()} </p>
     
      <br/>
      <br/>
      
      <p>{balanceData?.symbol}</p>
   
      {balanceData?.formatted} 


    </div>
  );
}