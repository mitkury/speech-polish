import { LangModelNames } from "../../info";
import { LangChatMessages, LangResultWithMessages, LangResultWithString, LanguageModel } from "../language-model";
export type AnthropicLangOptions = {
    apiKey: string;
    model?: LangModelNames;
    customCalcCost?: (inTokens: number, outTokens: number) => string;
};
export type AnthropicLangConfig = {
    apiKey: string;
    name: LangModelNames;
    calcCost: (inTokens: number, outTokens: number) => string;
};
export declare class AnthropicLang extends LanguageModel {
    readonly name: string;
    _config: AnthropicLangConfig;
    constructor(options: AnthropicLangOptions);
    ask(prompt: string, onResult?: (result: LangResultWithString) => void): Promise<LangResultWithString>;
    chat(messages: LangChatMessages, onResult?: (result: LangResultWithMessages) => void): Promise<LangResultWithMessages>;
    private _generate_internal;
}
