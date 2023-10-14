import { LangModelNames } from "../../info";
import { LangChatMessages, LangResultWithMessages, LangResultWithString, LanguageModel } from "../language-model";
export type OpenAILangOptions = {
    apiKey: string;
    model?: LangModelNames;
    systemPrompt?: string;
    customCalcCost?: (inTokens: number, outTokens: number) => string;
};
export type OpenAILangConfig = {
    apiKey: string;
    name: LangModelNames;
    systemPrompt: string;
    calcCost: (inTokens: number, outTokens: number) => string;
};
export declare class OpenAILang extends LanguageModel {
    _config: OpenAILangConfig;
    constructor(options: OpenAILangOptions);
    ask(prompt: string, onResult?: (result: LangResultWithString) => void): Promise<LangResultWithString>;
    chat(messages: LangChatMessages, onResult?: (result: LangResultWithMessages) => void): Promise<LangResultWithMessages>;
}
