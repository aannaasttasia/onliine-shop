import { http, createPublicClient, createWalletClient, publicActions, formatEther, parseEther, parseUnits, custom } from 'viem'
import { sepolia } from 'viem/chains'
declare let window: any;

const fetchEthPrice = async () => {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    const data = await response.json();
    return data.ethereum.usd;
};

export  function createClient(account: any){
    return  createWalletClient({
        account: '0xeb75D9dff2FFBC5c8e85bA701AcFDf2e31be80E1',
        chain: sepolia,
        transport: custom(window.ethereum)
    }).extend(publicActions);
}

export async function convertUsdToEth(priceUsd: number){
    const oneEthInUsd = await fetchEthPrice();
    return priceUsd / oneEthInUsd

}

export async function checkBalance(account: any, walletClient: any, ethAmount:bigint) {
    const balance = await walletClient.getBalance({
      address: account,
    });
    if (balance < ethAmount) {
        console.log("Insufficient ETH balance.")
        return {sufficient : false}
    }
    console.log(
        `The balance of the sender (${account.address}) is: ${formatEther(balance)} ETH`
      );
    console.log(formatEther(balance));
    return  {sufficient : true}
}


export async function sendTransaction(amount: bigint, account: any, walletClient: any) {
    const sufficient = (await checkBalance(account, walletClient, amount)).sufficient

    if (!walletClient || !walletClient.account) {
        throw new Error('Account is not provided or not connected.');
    }
    try {
        const hash = await walletClient.sendTransaction({
            to: '0xbCaB34E93435325fFF7d494aA5978C225374467B',
            value: amount,
            account: account
        });
        console.log('Transaction hash:', hash);
        return hash;
        
    } catch (error:any) {
        if (error.message.includes('InvalidInputRpcError')) {
            console.error('Invalid input parameters:', error);
        } else if (error.message.includes('TransactionExecutionError')) {
            console.error('Transaction execution failed:', error);
        } else {
            console.error('Unknown error:', error);
        }
    }
}