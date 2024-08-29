declare let window: any;

export async function requestAccounts(){
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Connected account:', accounts[0]);
        return accounts
    } catch (error) {
        console.log('Error connecting to wallet:', error) 
    }
}
