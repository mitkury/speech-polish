export interface Tokenizer {
    readonly name: string;
    encode(text: string): number[];
    decode(tokens: number[]): string;
}
export declare function encodeBpe(input: string, mergeableRanks: Map<string, number>): number[];
export declare function decodeBpe(encodedTokens: number[], decodeArr: string[]): string;
