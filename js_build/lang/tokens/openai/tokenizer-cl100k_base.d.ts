import { Tokenizer } from "../tokenizer";
export declare class Tokenizer_cl100k_base implements Tokenizer {
    name: string;
    encode(text: string): number[];
    decode(tokens: number[]): string;
}
