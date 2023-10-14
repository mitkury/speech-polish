import { OpenAILang } from "./openai/openai-lang.js";
import { AnthropicLang } from "./anthropic/anthropic-lang.js";
import { OllamaLang } from "./ollama/ollama-lang.js";
/**
 * Lang is a factory class for using language models from different providers.
 */
export class Lang {
    static openai(options) {
        return new OpenAILang(options);
    }
    static anthropic(options) {
        return new AnthropicLang(options);
    }
    static ollama(options) {
        return new OllamaLang(options);
    }
}
//# sourceMappingURL=lang.js.map