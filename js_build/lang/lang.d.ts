import { OpenAILang, OpenAILangOptions } from "./openai/openai-lang";
import { AnthropicLang, AnthropicLangOptions } from "./anthropic/anthropic-lang";
import { OllamaLang, OllamaLangOptions } from "./ollama/ollama-lang";
/**
 * Lang is a factory class for using language models from different providers.
 */
export declare abstract class Lang {
    static openai(options: OpenAILangOptions): OpenAILang;
    static anthropic(options: AnthropicLangOptions): AnthropicLang;
    static ollama(options: OllamaLangOptions): OllamaLang;
}
