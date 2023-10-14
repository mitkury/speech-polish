import { LangChatMessages, LangResultWithMessages, LangResultWithString, LanguageModel } from "../language-model";
export type OllamaLangOptions = {
    url?: string;
    model?: string;
    systemPrompt?: string;
    customCalcCost?: (inTokens: number, outTokens: number) => string;
};
export type OllamaLangConfig = {
    url: string;
    name: string;
    systemPrompt: string;
    calcCost: (inTokens: number, outTokens: number) => string;
};
export declare class OllamaLang extends LanguageModel {
    _config: OllamaLangConfig;
    constructor(options: OllamaLangOptions);
    ask(prompt: string, onResult?: (result: LangResultWithString) => void): Promise<LangResultWithString>;
    chat(messages: LangChatMessages, onResult: (result: LangResultWithMessages) => void): Promise<LangResultWithMessages>;
}
