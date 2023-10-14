import { LangVecsModel, LangVecsResult } from "../lang-vecs";
import { Tokenizer } from "../tokens/tokenizer";
export type OpenAILangOptions = {
    apiKey: string;
    customCalcCost?: (inTokens: number) => string;
};
export type OpenAILangVecsConfig = {
    apiKey: string;
    model: string;
    calcCost: (inTokens: number) => string;
};
export declare class OpenAILangVecs implements LangVecsModel {
    readonly name: string;
    _config: OpenAILangVecsConfig;
    _tokenizer: Tokenizer;
    constructor(options: OpenAILangOptions);
    ask(text: string, onResult?: (result: LangVecsResult) => void): Promise<number[]>;
    defaultCalcCost: (inTokens: number) => string;
}
