import { Tokenizer_claude } from "./lang/tokens/anthropic/tokenizer-claude.js";
import { Tokenizer_cl100k_base } from "./lang/tokens/openai/tokenizer-cl100k_base.js";
/**
 * Pricing per token for each model.
 * E.g gpt-4 costs 0.00003 per token for input and 0.00006 per token for output.
 * Note that $0.03 for 1000 tokens is $0.00003 **per token** (plus 2 zeros).
 */
export const langPricePerToken = new Map([
    /* OpenAI */
    ["gpt-4", [0.00003, 0.00006]],
    ["gpt-4-32", [0.00006, 0.00012]],
    ["gpt-3.5-turbo", [0.0000015, 0.000002]],
    ["gpt-3.5-turbo-16", [0.000003, 0.000004]],
    ["text-embedding-ada-002", [0.0000001, 0]],
    /* Anthropic */
    ["claude-2", [0.00001102, 0.00003268]],
    ["claude-instant-1", [0.00000163, 0.00000551]],
    ["mistral", [0, 0]],
]);
export const getCostPerToken = (model) => {
    if (langPricePerToken.has(model)) {
        return langPricePerToken.get(model);
    }
    else {
        throw new Error(`Unknown model: ${model}`);
    }
};
export const getTokenizerBasedOnModel = (model) => {
    switch (model) {
        case "gpt-4":
        case "gpt-4-32":
        case "gpt-3.5-turbo":
        case "text-embedding-ada-002":
        case "mistral":
            return new Tokenizer_cl100k_base();
        case "claude-2":
        case "claude-instant-1":
            return new Tokenizer_claude();
        default:
            throw new Error(`Unknown model: ${model}`);
    }
};
//# sourceMappingURL=info.js.map