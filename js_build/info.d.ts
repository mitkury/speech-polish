import { Tokenizer } from "./lang/tokens/tokenizer";
/**
 * Supported Language Models.
 */
export type OpenAILangModelNames = "gpt-4" | "gpt-4-32" | "gpt-3.5-turbo" | "gpt-3.5-turbo-16" | "text-embedding-ada-002";
export type AnthropicLangModelNames = "claude-2" | "claude-instant-1";
export type LangModelNames = OpenAILangModelNames | AnthropicLangModelNames;
/**
 * Pricing per token for each model.
 * E.g gpt-4 costs 0.00003 per token for input and 0.00006 per token for output.
 * Note that $0.03 for 1000 tokens is $0.00003 **per token** (plus 2 zeros).
 */
export declare const langPricePerToken: Map<string, [number, number]>;
export declare const getCostPerToken: (model: string) => [number, number];
export declare const getTokenizerBasedOnModel: (model: string) => Tokenizer;
