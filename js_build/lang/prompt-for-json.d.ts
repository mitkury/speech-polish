export type PromptForObject = {
    title?: string;
    description?: string;
    instructions: string[];
    objectExamples: object[];
    content?: {
        [key: string]: string;
    };
};
export declare function buildPromptForGettingJSON(prompt: PromptForObject): string;
