import { httpRequestWithRetry as fetch } from "../../http-request.js";
import { processResponseStream } from "../../process-response-stream.js";
import { LangResultWithMessages, LangResultWithString, LanguageModel, } from "../language-model.js";
export class AnthropicLang extends LanguageModel {
    constructor(options) {
        const modelName = options.model || "claude-2";
        super(modelName);
        this._config = {
            apiKey: options.apiKey,
            name: modelName,
            calcCost: options.customCalcCost || this.defaultCalcCost,
        };
        this.name = this._config.name;
    }
    async ask(prompt, onResult) {
        const tokensInPrompt = this.tokenizer.encode(prompt).length;
        const result = new LangResultWithString(prompt, tokensInPrompt);
        await this._generate_internal(
        // Format messages in the way that Anthropic expects chats to be formatted.
        `\n\nHuman: ${prompt}\n\nAssistant:`, (res, finished) => {
            result.finished = finished;
            result.answer = res;
            result.totalTokens = tokensInPrompt +
                this.tokenizer.encode(result.answer).length;
            // We do it from the config because users may want to set their own price calculation function.
            result.totalCost = this._config.calcCost(tokensInPrompt, this.tokenizer.encode(result.answer).length);
            onResult === null || onResult === void 0 ? void 0 : onResult(result);
        });
        return result;
    }
    async chat(messages, onResult) {
        // Turn messages into: "\n\nHuman: Hello, Claude\n\nAssistant: Hello, world\n\nHuman: How many toes do dogs have?"
        const messagesStr = messages.reduce((acc, message) => {
            return acc +
                `{systemPromptMsgs}\n\n${getAnhropicRole(message.role)}: ${message.content}`;
        }, "") + "\n\nAssistant:";
        const prevMessagesTokens = this.tokenizer.encode(messagesStr).length;
        const result = new LangResultWithMessages(messages, prevMessagesTokens);
        await this._generate_internal(messagesStr, (res, finished) => {
            result.finished = finished;
            result.answer = res;
            result.totalTokens = prevMessagesTokens +
                this.tokenizer.encode(result.answer)
                    .length;
            // We do it from the config because users may want to set their own price calculation function.
            result.totalCost = this._config.calcCost(prevMessagesTokens, this.tokenizer.encode(result.answer).length);
            result.messages = [...messages, {
                    role: "assistant",
                    content: result.answer,
                }];
            onResult === null || onResult === void 0 ? void 0 : onResult(result);
        });
        return result;
    }
    async _generate_internal(prompt, onResponse) {
        let fullResponse = "";
        const onData = (data) => {
            if (data.finished) {
                onResponse === null || onResponse === void 0 ? void 0 : onResponse(fullResponse, true);
                return;
            }
            if (data.completion !== undefined) {
                const content = data.completion;
                fullResponse += content;
                onResponse === null || onResponse === void 0 ? void 0 : onResponse(fullResponse, false);
            }
        };
        // @TODO: add onNotOkResponse handler
        const response = await fetch("https://api.anthropic.com/v1/complete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "anthropic-version": "2023-06-01",
                "x-api-key": this._config.apiKey,
            },
            body: JSON.stringify({
                model: this._config.name,
                prompt,
                max_tokens_to_sample: 1000000,
                stream: true,
            }),
        })
            .catch((err) => {
            throw new Error(err);
        });
        await processResponseStream(response, onData);
        return fullResponse;
    }
}
function getAnhropicRole(normalizedRole) {
    // Just in case
    const r = normalizedRole.toLowerCase();
    switch (r) {
        case "system":
        case "assistant":
            return "Assistant";
        case "user":
            return "Human";
        default:
            throw new Error(`Unknown role: ${normalizedRole}`);
    }
}
//# sourceMappingURL=anthropic-lang.js.map