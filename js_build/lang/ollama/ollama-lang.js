import { LangResultWithString, LanguageModel } from "../language-model.js";
import { httpRequestWithRetry as fetch } from "../../http-request.js";
import { processResponseStream } from "../../process-response-stream.js";
export class OllamaLang extends LanguageModel {
    constructor(options) {
        const modelName = options.model || "mistral";
        super(modelName);
        this._config = {
            url: options.url || "http://localhost:11434/",
            name: modelName,
            systemPrompt: options.systemPrompt || `You are a helpful assistant.`,
            calcCost: options.customCalcCost || this.defaultCalcCost,
        };
    }
    async ask(prompt, onResult) {
        const tokensInSystemPrompt = this.tokenizer.encode(this._config.systemPrompt).length;
        const tokensInPrompt = this.tokenizer.encode(prompt).length;
        const result = new LangResultWithString(prompt, tokensInSystemPrompt + tokensInPrompt);
        const onData = (data) => {
            if (data.finished) {
                result.finished = true;
                onResult === null || onResult === void 0 ? void 0 : onResult(result);
                return;
            }
            if (data.response !== undefined) {
                const deltaContent = data.response
                    ? data.response
                    : "";
                result.answer += deltaContent;
                result.totalTokens = tokensInSystemPrompt + tokensInPrompt +
                    this.tokenizer.encode(result.answer).length;
                // We do it from the config because users may want to set their own price calculation function.
                result.totalCost = this._config.calcCost(tokensInSystemPrompt + tokensInPrompt, this.tokenizer.encode(result.answer).length);
                onResult === null || onResult === void 0 ? void 0 : onResult(result);
            }
        };
        const response = await fetch(`${this._config.url}api/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: this._config.name,
                prompt,
            }),
        })
            .catch((err) => {
            throw new Error(err);
        });
        await processResponseStream(response, onData);
        return result;
    }
    chat(messages, onResult) {
        throw new Error("Not implemented yet");
    }
}
//# sourceMappingURL=ollama-lang.js.map