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
exports.transfer = void 0;
const web3_js_1 = require("@solana/web3.js");
const airdrop_1 = require("../airdrop");
const show_balance_1 = require("../show-balance");
const transfer = (from, to, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = new web3_js_1.Connection("http://127.0.0.1:8899", "confirmed");
    // trasactions can contain multiple instructions
    const transaction = new web3_js_1.Transaction();
    const instruction = web3_js_1.SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: amount * web3_js_1.LAMPORTS_PER_SOL
    });
    transaction.add(instruction);
    // to send to block chain
    yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [from]);
});
exports.transfer = transfer;
(() => __awaiter(void 0, void 0, void 0, function* () {
    const secret = Uint8Array.from([57, 226, 114, 189, 242, 124, 107, 190, 234, 93, 240, 234, 199, 135, 17, 143, 15, 195, 149, 208, 92, 109, 219, 210, 206, 228, 42, 165, 63, 209, 219, 2, 158, 212, 69, 168, 92, 239, 123, 28, 68, 85, 3, 182, 142, 206, 166, 137, 101, 157, 83, 49, 17, 1, 22, 23, 178, 180, 115, 74, 88, 252, 120, 175]);
    const fromKeypair = web3_js_1.Keypair.fromSecretKey(secret);
    const toPublicKey = new web3_js_1.PublicKey("5RJc11HUuKBg8eiBjnLWFKhL5tdEz3VYim3Wjo7QR4iW");
    yield (0, airdrop_1.airdrop)(fromKeypair.publicKey, 20);
    yield (0, exports.transfer)(fromKeypair, toPublicKey, 1);
    yield (0, show_balance_1.showBalance)(fromKeypair.publicKey);
}))();
//# sourceMappingURL=index.js.map