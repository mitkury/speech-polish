import { decodeBase64, encodeBytesToBase64 } from "./base64.js";
export function encodeBpe(input, mergeableRanks) {
    const encoder = new TextEncoder();
    const uint8array = encoder.encode(input);
    let parts = Array.from(uint8array).map(b => new Uint8Array([b]));
    while (true) {
        let minIdx = null;
        let minRank = null;
        for (let i = 0; i < parts.length - 1; i++) {
            const pair = new Uint8Array([...parts[i], ...parts[i + 1]]);
            const rank = mergeableRanks.get(encodeBytesToBase64(pair));
            if (rank !== undefined && (minRank === null || rank < minRank)) {
                minIdx = i;
                minRank = rank;
            }
        }
        if (minRank === null) {
            break;
        }
        if (minIdx !== null) {
            const merged = new Uint8Array([...parts[minIdx], ...parts[minIdx + 1]]);
            parts = [...parts.slice(0, minIdx), merged, ...parts.slice(minIdx + 2)];
        }
    }
    const tokens = parts.map(part => mergeableRanks.get(encodeBytesToBase64(part)) || 0);
    return tokens;
}
export function decodeBpe(encodedTokens, decodeArr) {
    let text = "";
    for (const token of encodedTokens) {
        try {
            const base64Str = decodeArr[token];
            const decodedText = decodeBase64(base64Str);
            text += decodedText;
        }
        catch (_) {
            console.error(`Didn't find a match for a token ${token}.`);
        }
    }
    return text;
}
//# sourceMappingURL=tokenizer.js.map