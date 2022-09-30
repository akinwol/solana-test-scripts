"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const airdrop_1 = require("../airdrop");
const handleCreateMint = (mintWallet) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = new web3_js_1.Connection("http://127.0.0.1:8899", 'confirmed');
    // const creatorToken = await createMint(connection, mintWallet, mintWallet.publicKey, null, 8,); //TOKEN_PROGRAM_ID
    const creatorTokenPublicKey = yield (0, spl_token_1.createMint)(connection, mintWallet, mintWallet.publicKey, null, 8); // creating a mint and you can create more tokens as  you want 
    return creatorTokenPublicKey; // return the public key/address of the mint
});
const transferTokens = (tokenAddress, mintWallet, receiver) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = new web3_js_1.Connection("http://127.0.0.1:8899", 'confirmed');
    // const creatorToken = new Token(connection, tokenAddress, TOKEN_PROGRAM_ID, mintWallet);
    const mintTokenAccount = yield (0, spl_token_1.getOrCreateAssociatedTokenAccount)(connection, mintWallet, tokenAddress, mintWallet.publicKey); // this is creating a data account for the mint wallet for the token 
    console.log({ mintTokenAccount });
    yield (0, spl_token_1.mintTo)(connection, mintWallet, tokenAddress, mintTokenAccount.address, mintWallet.publicKey, 100000000); // create supply of these tokens and mint them to the new account above
    const receiverTokenAccount = yield (0, spl_token_1.getOrCreateAssociatedTokenAccount)(connection, mintWallet, tokenAddress, receiver); // this is creating a data account for the receiver wallet for the token
    console.log(`ReceiverTokenAccount address: ${receiverTokenAccount.address}`, { receiverTokenAccount });
    const transaction = new web3_js_1.Transaction().add((0, spl_token_1.createTransferInstruction)(mintTokenAccount.address, //account you want to send data from 
    receiverTokenAccount.address, //account you want to send data to
    mintWallet.publicKey, 100000000));
    console.log({ transaction });
    yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [mintWallet], { commitment: "confirmed" });
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    const mintWallet = yield web3_js_1.Keypair.generate(); // mint wallet has the authority to create new tokens or create fresh supply of tokens - this gives you the public and private keys
    yield (0, airdrop_1.airdrop)(mintWallet.publicKey, 4);
    const creatorTokenAddress = yield handleCreateMint(mintWallet); // returns the public address of the new mint
    // until you initiate a transfer the supply of the tokens is 0 no one owns any tokens not even the mint wallet
    // need to create a supply for the tokens as in mint the tokens then transfer them to the receiver
    yield transferTokens(creatorTokenAddress, mintWallet, new web3_js_1.PublicKey("5RJc11HUuKBg8eiBjnLWFKhL5tdEz3VYim3Wjo7QR4iW"));
    console.log(`Creator token address: ${creatorTokenAddress}`);
    console.log(`mintWallet address: ${mintWallet.publicKey}, mintwallet:${mintWallet}`);
}))();
//# sourceMappingURL=index.js.map