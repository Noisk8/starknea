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




  if (isLoading || isBalanceLoading) return (
    <div className="flex items-center justify-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );
  
  if (isError || isBalanceError || !data) return (
    <div className="text-red-500 p-4 rounded-lg bg-red-100">
      {error?.message || balanceError?.message}
    </div>
  );

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Primera moneda */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-lg font-semibold text-gray-700">{data.symbol}</div>
          <div className="text-2xl font-bold text-gray-900">{data.value.toString()}</div>
        </div>

        {/* Segunda moneda */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-lg font-semibold text-gray-700">{balanceData?.symbol || 'N/A'}</div>
          <div className="text-2xl font-bold text-gray-900">{balanceData?.formatted || '0'}</div>
        </div>
      </div>
    </div>
  );
}