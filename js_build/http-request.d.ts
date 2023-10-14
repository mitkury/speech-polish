export interface HttpRequestInit {
    body?: object | string | null;
    cache?: string;
    credentials?: string;
    headers?: Record<string, string>;
    /**
     * A cryptographic hash of the resource to be fetched by request. Sets
     * request's integrity.
     */
    integrity?: string;
    /**
     * A boolean to set request's keepalive.
     */
    keepalive?: boolean;
    /**
     * A string to set request's method.
     */
    method?: string;
    /**
     * A string to indicate whether the request will use CORS, or will be
     * restricted to same-origin URLs. Sets request's mode.
     */
    mode?: string;
    /**
     * A string indicating whether request follows redirects, results in an error
     * upon encountering a redirect, or returns the redirect (in an opaque
     * fashion). Sets request's redirect.
     */
    redirect?: string;
    /**
     * A string whose value is a same-origin URL, "about:client", or the empty
     * string, to set request's referrer.
     */
    referrer?: string;
    /**
     * A referrer policy to set request's referrerPolicy.
     */
    referrerPolicy?: string;
}
export interface HttpResponseWithRetries extends HttpRequestInit {
    retries?: number;
    backoffMs?: number;
    onNotOkResponse?: (res: Response, decision: DecisionOnNotOkResponse) => DecisionOnNotOkResponse;
}
export declare const setHttpRequestImpl: (impl: (url: string | URL, options: object) => Promise<Response>) => void;
export declare const httpRequest: (url: string | URL, options: HttpRequestInit) => Promise<Response>;
export type DecisionOnNotOkResponse = {
    retry: boolean;
    consumeReties: boolean;
};
export declare const httpRequestWithRetry: (url: string | URL, options: HttpResponseWithRetries) => Promise<Response>;
