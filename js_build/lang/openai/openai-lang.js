import { LangResultWithMessages, LangResultWithString, LanguageModel, } from "../language-model.js";
import { httpRequestWithRetry as fetch, } from "../../http-request.js";
import { processResponseStream } from "../../process-response-stream.js";
export class OpenAILang extends LanguageModel {
    constructor(options) {
        const modelName = options.model || "gpt-4";
        super(modelName);
        this._config = {
            apiKey: options.apiKey,
            name: modelName,
            systemPrompt: options.systemPrompt || `You are a helpful assistant.`,
            calcCost: options.customCalcCost || this.defaultCalcCost,
        };
    }
    async ask(prompt, onResult) {
        const tokensInSystemPrompt = 0; //this.tokenizer.encode(this._config.systemPrompt).length;
        const tokensInPrompt = 0; //this.tokenizer.encode(prompt).length;
        const result = new LangResultWithString(prompt, tokensInSystemPrompt + tokensInPrompt);
        const onData = (data) => {
            if (data.finished) {
                result.finished = true;
                onResult === null || onResult === void 0 ? void 0 : onResult(result);
                return;
            }
            if (data.choices !== undefined) {
                const deltaContent = data.choices[0].delta.content
                    ? data.choices[0].delta.content
                    : "";
                result.answer += deltaContent;
                result.totalTokens = tokensInSystemPrompt + tokensInPrompt +
                    /*this.tokenizer.encode(result.answer).length;*/ 0;
                // We do it from the config because users may want to set their own price calculation function.
                result.totalCost = this._config.calcCost(tokensInSystemPrompt + tokensInPrompt, /*this.tokenizer.encode(result.answer).length*/ 0);
                onResult === null || onResult === void 0 ? void 0 : onResult(result);
            }
        };
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this._config.apiKey}`,
            },
            body: JSON.stringify({
                model: this._config.name,
                messages: [
                    {
                        role: "system",
                        content: this._config.systemPrompt,
                    },
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
                stream: true,
            }),
            onNotOkResponse: (res, decision) => {
                if (res.status === 401) {
                    // We don't retry if the API key is invalid.
                    decision.retry = false;
                    throw new Error("API key is invalid. Please check your API key and try again.");
                }
                if (res.status === 400) {
                    // We don't retry if the model is invalid.
                    decision.retry = false;
                    throw new Error("Bad Request. Please make sure you send valid data. Could be that the message is too large.");
                }
                return decision;
            },
        })
            .catch((err) => {
            throw new Error(err);
        });
        await processResponseStream(response, onData);
        return result;
    }
    async chat(messages, onResult) {
        const tokensInSystemPrompt = this.tokenizer.encode(this._config.systemPrompt).length;
        // @TODO: check if this is an accurate way to feed tokens to the encoder
        let messagesStrForCountingTokens = '';
        messages.forEach((message, _) => {
            messagesStrForCountingTokens += `${message.content}\n`;
        });
        const tokensInPrompt = this.tokenizer.encode(messagesStrForCountingTokens).length;
        const result = new LangResultWithMessages(messages, tokensInSystemPrompt + tokensInPrompt);
        const onData = (data) => {
            if (data.finished) {
                result.finished = true;
                onResult === null || onResult === void 0 ? void 0 : onResult(result);
                return;
            }
            if (data.choices !== undefined) {
                const deltaContent = data.choices[0].delta.content
                    ? data.choices[0].delta.content
                    : "";
                result.answer += deltaContent;
                result.totalTokens = tokensInSystemPrompt + tokensInPrompt +
                    this.tokenizer.encode(result.answer).length;
                // We do it from the config because users may want to set their own price calculation function.
                result.totalCost = this._config.calcCost(tokensInSystemPrompt + tokensInPrompt, this.tokenizer.encode(result.answer).length);
                result.messages = [...messages, {
                        role: "assistant",
                        content: result.answer,
                    }];
                onResult === null || onResult === void 0 ? void 0 : onResult(result);
            }
        };
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this._config.apiKey}`,
            },
            body: JSON.stringify({
                model: this._config.name,
                messages,
                stream: true,
            }),
            onNotOkResponse: (res, decision) => {
                if (res.status === 401) {
                    // We don't retry if the API key is invalid.
                    decision.retry = false;
                    throw new Error("API key is invalid. Please check your API key and try again.");
                }
                if (res.status === 400) {
                    // We don't retry if the model is invalid.
                    decision.retry = false;
                    throw new Error("Bad Request. Please make sure you send valid data. Could be that the message is too large.");
                }
                return decision;
            },
        })
            .catch((err) => {
            throw new Error(err);
        });
        await processResponseStream(response, onData);
        return result;
    }
}
//# sourceMappingURL=openai-lang.js.map