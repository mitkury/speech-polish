import * as info from "../info.js";
import { buildPromptForGettingJSON } from "./prompt-for-json.js";
import extractJSON from "./json/extract-json.js";
import langConstCalc from "./lang-cost-calc.js";
/**
 * LanguageModel is an abstract class that represents a language model and
 * its basic functionality.
 */
export class LanguageModel {
    constructor(name) {
        this.defaultCalcCost = (inTokens, outTokens) => {
            return langConstCalc(this.name, inTokens, outTokens);
        };
        this.name = name;
        this.tokenizer = info.getTokenizerBasedOnModel(name);
    }
    async askForObject(promptObj, onResult) {
        let trialsLeft = 3;
        const trials = trialsLeft;
        const prompt = buildPromptForGettingJSON(promptObj);
        const result = new LangResultWithObject(prompt, this.tokenizer.encode(prompt).length);
        while (trialsLeft > 0) {
            trialsLeft--;
            const res = await this.ask(prompt, (r) => {
                result.answer = r.answer;
                result.totalTokens = r.totalTokens;
                result.totalCost = r.totalCost;
                result.finished = r.finished;
                onResult === null || onResult === void 0 ? void 0 : onResult(result);
            });
            const jsonObj = extractJSON(res.answer);
            if (jsonObj !== null) {
                result.answerObj = jsonObj;
            }
            // @TODO: validate the object against the schema from exampleOutputs
            if (result.answerObj !== null) {
                break;
            }
            else if (result.answerObj === null && trialsLeft <= 0) {
                throw new Error(`Failed to parse JSON after ${trials} trials`);
            }
        }
        result.finished = true;
        // Calling it one more time after parsing JSON to return a valid JSON string
        onResult === null || onResult === void 0 ? void 0 : onResult(result);
        return result;
    }
}
export class LangResultWithString {
    // durationMs: number;
    constructor(prompt, promptTokens) {
        this.totalCost = "0";
        this.finished = false;
        this.prompt = prompt;
        this.answer = "";
        this.totalTokens = 0;
        this.promptTokens = promptTokens;
        this.finished;
    }
    toString() {
        return this.answer;
    }
    abort() {
        throw new Error("Not implemented yet");
    }
}
export class LangResultWithObject {
    constructor(prompt, promptTokens) {
        this.answerObj = {};
        this.answer = "";
        this.totalCost = "0";
        this.finished = false;
        this.prompt = prompt;
        this.totalTokens = 0;
        this.promptTokens = promptTokens;
        this.finished;
    }
    toString() {
        if (Object.keys(this.answerObj).length === 0) {
            return this.answer;
        }
        return JSON.stringify(this.answerObj);
    }
}
export class LangResultWithMessages {
    constructor(messages, promptTokens) {
        this.messages = [];
        this.totalCost = "0";
        this.finished = false;
        // The prompt is the latest message
        this.prompt = messages.length > 0 ? messages[messages.length - 1].content : "";
        this.answer = "";
        this.totalTokens = 0;
        this.promptTokens = promptTokens;
        this.finished;
    }
    toString() {
        return this.answer;
    }
    abort() {
        throw new Error("Not implemented yet");
    }
}
//# sourceMappingURL=language-model.js.map