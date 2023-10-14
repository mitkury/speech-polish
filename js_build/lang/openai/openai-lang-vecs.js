import { getTokenizerBasedOnModel } from "../../info.js";
import { httpRequestWithRetry as fetch } from "../../http-request.js";
import langConstCalc from "../lang-cost-calc.js";
export class OpenAILangVecs {
    constructor(options) {
        this.defaultCalcCost = (inTokens) => {
            return langConstCalc(this.name, inTokens, 0);
        };
        this._config = {
            apiKey: options.apiKey,
            model: "text-embedding-ada-002",
            calcCost: options.customCalcCost || this.defaultCalcCost,
        };
        this.name = this._config.model;
        this._tokenizer = getTokenizerBasedOnModel(this.name);
    }
    async ask(text, onResult) {
        const obj = await fetch("https://api.openai.com/v1/embeddings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this._config.apiKey}`,
            },
            body: JSON.stringify({
                "input": text,
                "model": this.name,
            }),
        }).then((response) => {
            return response.json();
        });
        const vecs = obj.data[0].embedding;
        onResult === null || onResult === void 0 ? void 0 : onResult({
            vector: vecs,
            promptTokens: this._tokenizer.encode(text).length,
            totalCost: this._config.calcCost(this._tokenizer.encode(text).length),
        });
        return vecs;
    }
}
//# sourceMappingURL=openai-lang-vecs.js.map