import { useSendTransaction, useAccount, useNetwork, useContract } from "@starknet-react/core";
import { ERC20 as erc20ABI } from "../../ABI's/ERC20";
import { useState } from "react";

import { useMemo } from "react";

// TODO: transferir custom tokens erc20 a una dirección dada en un input por el usuario;
export default function Transactions() {
    const { address: userAddress } = useAccount();
	const { chain } = useNetwork();
    const [recipientAddress, setRecipientAddress] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");

	const { contract } = useContract({
		abi: erc20ABI as any,
		address: chain.nativeCurrency.address,
	});

    const calls = useMemo(() => {
        if (!userAddress || !contract || !recipientAddress || !amount) return [];
        try {
            return [{
                contractAddress: contract.address,
                entrypoint: "transfer",
                calldata: [
                    recipientAddress,
                    amount,
                    "0"
                ]
            }];
        } catch (err) {
            setError("Error al preparar la transacción");
            return [];
        }
    }, [contract, userAddress, recipientAddress, amount]);

	const {
		sendAsync,
		data,
		isPending,
	} = useSendTransaction({
        calls,
	});

    const handleTransfer = async () => {
        if (!recipientAddress || !amount) {
            setError("Por favor completa todos los campos");
            return;
        }
        try {
            await sendAsync();
            setError("");
        } catch (err) {
            setError("Error al enviar la transacción");
        }
    };

    return (
        <div className="transfer-container">
            <h2>Transferir Tokens</h2>
            
            <div className="input-group">
                <label htmlFor="recipient">Dirección del Destinatario:</label>
                <input
                    id="recipient"
                    type="text"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    placeholder="0x..."
                />
            </div>

            <div className="input-group">
                <label htmlFor="amount">Cantidad:</label>
                <input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.0"
                    min="0"
                />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button 
                onClick={handleTransfer}
                disabled={isPending}
                className="transfer-button"
            >
                {isPending ? "Enviando..." : "Transferir"}
            </button>

            {isPending && (
                <div className="status-message">
                    Procesando transacción...
                </div>
            )}

            {data?.transaction_hash && (
                <div className="transaction-info">
                    <p>Transacción enviada:</p>
                    <a 
                        href={`https://sepolia.starkscan.co/tx/${data.transaction_hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Ver en Starkscan
                    </a>
                </div>
            )}
        </div>
    );
}