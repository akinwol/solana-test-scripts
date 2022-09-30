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
exports.showBalance = void 0;
const web3_js_1 = require("@solana/web3.js");
const showBalance = (publicKey) => __awaiter(void 0, void 0, void 0, function* () {
    // const wallet = new PublicKey(publicKey);
    const connection = new web3_js_1.Connection("http://127.0.0.1:8899", "confirmed");
    const response = yield connection.getAccountInfo(publicKey);
    const balance = yield connection.getBalance(publicKey);
    console.log({ balance: balance / web3_js_1.LAMPORTS_PER_SOL, response });
});
exports.showBalance = showBalance;
const publicKey = new web3_js_1.PublicKey("5RJc11HUuKBg8eiBjnLWFKhL5tdEz3VYim3Wjo7QR4iW");
(0, exports.showBalance)(publicKey);
//# sourceMappingURL=index.js.map