import { createMint,TOKEN_PROGRAM_ID, createTransferInstruction, mintTo, getOrCreateAssociatedTokenAccount, } from "@solana/spl-token";
import {Keypair, Transaction, sendAndConfirmTransaction, PublicKey, Connection, clusterApiUrl} from '@solana/web3.js';
import {airdrop} from "../airdrop";

const handleCreateMint = async(mintWallet) => {
    const connection = new Connection("http://127.0.0.1:8899", 'confirmed');
    // const creatorToken = await createMint(connection, mintWallet, mintWallet.publicKey, null, 8,); //TOKEN_PROGRAM_ID
    const creatorTokenPublicKey = await createMint(connection, mintWallet, mintWallet.publicKey, null, 8,) // creating a mint and you can create more tokens as  you want 
    return creatorTokenPublicKey; // return the public key/address of the mint
}

const transferTokens = async (tokenAddress: PublicKey, mintWallet: Keypair, receiver: PublicKey) => {
    const connection = new Connection("http://127.0.0.1:8899", 'confirmed');
    // const creatorToken = new Token(connection, tokenAddress, TOKEN_PROGRAM_ID, mintWallet);

    const mintTokenAccount = await getOrCreateAssociatedTokenAccount(connection, mintWallet, tokenAddress, mintWallet.publicKey); // this is creating a data account for the mint wallet for the token 
    console.log({ mintTokenAccount })
    await mintTo(connection, mintWallet, tokenAddress, mintTokenAccount.address, mintWallet.publicKey, 100000000); // create supply of these tokens and mint them to the new account above
//can set mint authority to null to avoid creating more and more tokens

    const receiverTokenAccount = await getOrCreateAssociatedTokenAccount(connection, mintWallet, tokenAddress, receiver); // this is creating a data account for the receiver wallet for the token

    console.log(`ReceiverTokenAccount address: ${receiverTokenAccount.address}`, {receiverTokenAccount});
    const transaction = new Transaction().add(
        createTransferInstruction(
            mintTokenAccount.address, //account you want to send data from 
            receiverTokenAccount.address, //account you want to send data to
            mintWallet.publicKey,
            100000000
        )
    );
    // console.log({ transaction })
    await sendAndConfirmTransaction(connection, transaction, [mintWallet], { commitment: "confirmed" });
}

(async () => {
    const mintWallet = await Keypair.generate(); // mint wallet has the authority to create new tokens or create fresh supply of tokens - this gives you the public and private keys
    await airdrop(mintWallet.publicKey, 4);
    const creatorTokenAddress = await handleCreateMint(mintWallet); // returns the public address of the new mint
    // until you initiate a transfer the supply of the tokens is 0 no one owns any tokens not even the mint wallet
    // need to create a supply for the tokens as in mint the tokens then transfer them to the receiver
    await transferTokens(creatorTokenAddress, mintWallet, new PublicKey("5RJc11HUuKBg8eiBjnLWFKhL5tdEz3VYim3Wjo7QR4iW"))

    console.log(`Creator token address: ${creatorTokenAddress}`);
    console.log(`mintWallet address: ${mintWallet.publicKey}, mintwallet:${mintWallet}`);
})();



