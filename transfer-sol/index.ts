import { PublicKey, Connection, LAMPORTS_PER_SOL, Keypair, Transaction, SystemProgram, sendAndConfirmTransaction } from "@solana/web3.js"
import { airdrop } from "../airdrop";
import { showBalance } from "../show-balance";

export const transfer = async (from: Keypair, to: PublicKey, amount: number) => {
    const connection = new Connection("http://127.0.0.1:8899", "confirmed")
    // trasactions can contain multiple instructions

    const transaction = new Transaction();
    const instruction = SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: amount * LAMPORTS_PER_SOL
    })
    transaction.add(instruction)

    // to send to block chain
    await sendAndConfirmTransaction(connection, transaction, [from])

}



(async () => {
    const secret = Uint8Array.from([57,226,114,189,242,124,107,190,234,93,240,234,199,135,17,143,15,195,149,208,92,109,219,210,206,228,42,165,63,209,219,2,158,212,69,168,92,239,123,28,68,85,3,182,142,206,166,137,101,157,83,49,17,1,22,23,178,180,115,74,88,252,120,175])
    const fromKeypair = Keypair.fromSecretKey(secret)
    const toPublicKey = new PublicKey("5RJc11HUuKBg8eiBjnLWFKhL5tdEz3VYim3Wjo7QR4iW")
    await airdrop(fromKeypair.publicKey, 20)
    await transfer(fromKeypair, toPublicKey, 1)
    await showBalance(fromKeypair.publicKey)
})()
