import { OpenAILangVecs } from "./openai/openai-lang-vecs.js";
export class LangVecs {
    static openai(options) {
        return new OpenAILangVecs(options);
    }
}
//# sourceMappingURL=lang-vecs.js.map