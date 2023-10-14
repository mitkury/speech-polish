import { Tokenizer } from "../tokenizer";
export declare class Tokenizer_claude implements Tokenizer {
    name: string;
    encode(text: string): number[];
    decode(tokens: number[]): string;
}
