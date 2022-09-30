import { PublicKey, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js"

export const airdrop = async (address: PublicKey, amount: number) => {
    // initialize public key
    const wallet = new PublicKey(address);

    // create a connection to rpc server
    const connection = new Connection("http://127.0.0.1:8899", "confirmed")
    const signature = await connection.requestAirdrop(wallet, amount * LAMPORTS_PER_SOL)
    await connection.confirmTransaction(signature)
    console.log({ signature })

} 

const publicKey =  new PublicKey("5RJc11HUuKBg8eiBjnLWFKhL5tdEz3VYim3Wjo7QR4iW")
airdrop(publicKey, 3)
// (async () => {
//     await airdrop(publicKey, 3)
// })

// npx tsc compiles the typescript file to javascript
// node dist/index.js runs the javascript file