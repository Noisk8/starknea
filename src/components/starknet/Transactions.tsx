import { useSendTransaction, useAccount, useNetwork, useContract } from "@starknet-react/core";
import { ERC20 as erc20ABI } from "../../ABI's/ERC20";

import { useMemo } from "react";

// TODO: transferir custom tokens erc20 a una dirección dada en un input por el usuario;
export default function Transactions() {
    const { address: userAddress } = useAccount();
	const { chain } = useNetwork();

	const { contract } = useContract({
		abi: erc20ABI as any,
		address: chain.nativeCurrency.address,
	});

    const calls = useMemo(() => {
		if (!userAddress || !contract) return [];
		return [{
			contractAddress: contract.address,
			entrypoint: "transfer",
			calldata: [
				"0x0439a1914224696de450a2e9de25f9481bcc69958e2853072238a778ecaec6f3",
				"1",
				"0"
			]
		}];
	}, [contract, userAddress]);

	const {
		sendAsync,
		data,
		isPending,
	} = useSendTransaction({
        calls,
	});

    return (
		<>
		<button onClick={() => sendAsync()} style={{ border: '2px solid red', padding: '5px'}}>Transfer</button>
		<p>status: {isPending && <div>Submitting...</div>}</p>
		<p>hash:<a href={`https://sepolia.starkscan.co/tx/${data?.transaction_hash}`} target='blank'>{data?.transaction_hash}</a></p>
		</>
	);
}