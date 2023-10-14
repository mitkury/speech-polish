import { encodeBpe, decodeBpe } from "../tokenizer.js";
import { tokensBase64, tokensOffset } from './encoding-claude.js';
const claudeTokensWithoutOffset = tokensBase64.split(' ');
const decodingBase64Arr = new Array(tokensOffset).fill('').concat(claudeTokensWithoutOffset);
const encodingBase64Map = new Map();
for (let i = 0; i < decodingBase64Arr.length; i++) {
    encodingBase64Map.set(decodingBase64Arr[i], i);
}
export class Tokenizer_claude {
    constructor() {
        this.name = 'claude';
    }
    encode(text) {
        return encodeBpe(text, encodingBase64Map /*, splitRegex*/);
    }
    decode(tokens) {
        return decodeBpe(tokens, decodingBase64Arr);
    }
}
//# sourceMappingURL=tokenizer-claude.js.map