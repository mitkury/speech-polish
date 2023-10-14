import { langPricePerToken } from "../info.js";
export const langConstCalc = (modelName, inTokens, outTokens) => {
    let inPricePerToken = 0;
    let outPricePerToken = 0;
    if (langPricePerToken.has(modelName)) {
        [inPricePerToken, outPricePerToken] = langPricePerToken.get(modelName);
    }
    else {
        throw new Error(`Unknown model: ${modelName}`);
    }
    return (inTokens * inPricePerToken + outTokens * outPricePerToken).toFixed(10);
};
export default langConstCalc;
//# sourceMappingURL=lang-cost-calc.js.map