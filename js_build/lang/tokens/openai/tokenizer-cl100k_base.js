import { encodeBpe, decodeBpe } from "../tokenizer.js";
import { tokensBase64 } from './encoding-cl100k_base.js';
const decodingBase64Arr = tokensBase64.split(' ');
const encodingBase64Map = new Map();
for (let i = 0; i < decodingBase64Arr.length; i++) {
    encodingBase64Map.set(decodingBase64Arr[i], i);
}
export class Tokenizer_cl100k_base {
    constructor() {
        this.name = 'cl100k_base';
    }
    encode(text) {
        return encodeBpe(text, encodingBase64Map);
    }
    decode(tokens) {
        return decodeBpe(tokens, decodingBase64Arr);
    }
}
//# sourceMappingURL=tokenizer-cl100k_base.js.map