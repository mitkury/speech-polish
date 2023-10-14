let _httpRequest = (_url, _options) => {
    throw new Error("Not implemented");
};
export const setHttpRequestImpl = (impl) => {
    _httpRequest = impl;
};
fetch;
export const httpRequest = (url, options) => {
    return _httpRequest(url, options);
};
export const httpRequestWithRetry = async (url, options) => {
    if (options.retries === undefined) {
        options.retries = 6;
    }
    if (options.backoffMs === undefined) {
        options.backoffMs = 100;
    }
    let decision = {
        retry: true,
        consumeReties: true,
    };
    try {
        const response = await httpRequest(url, options);
        if (!response.ok) {
            if (options.onNotOkResponse) {
                decision = options.onNotOkResponse(response, decision);
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response;
    }
    catch (error) {
        if (decision.retry && options.retries > 0) {
            if (decision.consumeReties) {
                options.retries -= 1;
            }
            options.backoffMs *= 2;
            await new Promise((resolve) => setTimeout(resolve, options.backoffMs));
            return httpRequestWithRetry(url, options);
        }
        else {
            throw error;
        }
    }
};
//# sourceMappingURL=http-request.js.map