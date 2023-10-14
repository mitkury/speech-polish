import { PromptForObject } from "./prompt-for-json";
import { Tokenizer } from "../lang/tokens/tokenizer";
/**
 * LanguageModel is an abstract class that represents a language model and
 * its basic functionality.
 */
export declare abstract class LanguageModel {
    readonly name: string;
    readonly tokenizer: Tokenizer;
    constructor(name: string);
    abstract ask(prompt: string, onResult: (result: LangResultWithString) => void): Promise<LangResultWithString>;
    abstract chat(messages: LangChatMessages, onResult: (result: LangResultWithMessages) => void): Promise<LangResultWithMessages>;
    askForObject(promptObj: PromptForObject, onResult?: (result: LangResultWithObject) => void): Promise<LangResultWithObject>;
    defaultCalcCost: (inTokens: number, outTokens: number) => string;
}
interface LangProcessingResult {
    prompt: string;
    totalTokens: number;
    promptTokens: number;
    totalCost: string;
    finished: boolean;
}
export declare class LangResultWithString implements LangProcessingResult {
    prompt: string;
    answer: string;
    totalTokens: number;
    promptTokens: number;
    totalCost: string;
    finished: boolean;
    constructor(prompt: string, promptTokens: number);
    toString(): string;
    abort(): void;
}
export declare class LangResultWithObject implements LangProcessingResult {
    answerObj: object;
    answer: string;
    prompt: string;
    totalTokens: number;
    promptTokens: number;
    totalCost: string;
    finished: boolean;
    constructor(prompt: string, promptTokens: number);
    toString(): string;
}
export type LangChatMessages = {
    role: string;
    content: string;
}[];
export declare class LangResultWithMessages implements LangProcessingResult {
    prompt: string;
    answer: string;
    messages: LangChatMessages;
    totalTokens: number;
    promptTokens: number;
    totalCost: string;
    finished: boolean;
    constructor(messages: LangChatMessages, promptTokens: number);
    toString(): string;
    abort(): void;
}
export {};
