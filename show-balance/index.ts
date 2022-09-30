import { PublicKey, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js"

export const showBalance = async (publicKey: PublicKey) => {
    // const wallet = new PublicKey(publicKey);
    const connection = new Connection("http://127.0.0.1:8899", "confirmed")
    const response = await connection.getAccountInfo(publicKey)
    const balance = await connection.getBalance(publicKey)
    console.log({ balance: balance/LAMPORTS_PER_SOL, response })
}

const publicKey =  new PublicKey("5RJc11HUuKBg8eiBjnLWFKhL5tdEz3VYim3Wjo7QR4iW")
showBalance(publicKey)