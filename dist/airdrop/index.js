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
exports.airdrop = void 0;
const web3_js_1 = require("@solana/web3.js");
const airdrop = (address, amount) => __awaiter(void 0, void 0, void 0, function* () {
    // initialize public key
    const wallet = new web3_js_1.PublicKey(address);
    // create a connection to rpc server
    const connection = new web3_js_1.Connection("http://127.0.0.1:8899", "confirmed");
    const signature = yield connection.requestAirdrop(wallet, amount * web3_js_1.LAMPORTS_PER_SOL);
    yield connection.confirmTransaction(signature);
    console.log({ signature });
});
exports.airdrop = airdrop;
const publicKey = new web3_js_1.PublicKey("5RJc11HUuKBg8eiBjnLWFKhL5tdEz3VYim3Wjo7QR4iW");
(0, exports.airdrop)(publicKey, 3);
// (async () => {
//     await airdrop(publicKey, 3)
// })
// npx tsc compiles the typescript file to javascript
// node dist/index.js runs the javascript file
//# sourceMappingURL=index.js.map