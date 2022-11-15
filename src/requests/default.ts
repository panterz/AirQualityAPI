import https from "https";

interface HeadersConfig {
    [name: string]: any;
}

const httpsAgent = new https.Agent({
    rejectUnauthorized: false
});

const headerConfig: HeadersConfig = {
    Accept: "application/json",
    "Content-Type": "application/json"
};

export const getHeadersConfig = (correlationId = "") => {
    if (correlationId) {
        return {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Correlation-id": correlationId
        };
    }
    return {
        Accept: "application/json",
        "Content-Type": "application/json"
    };
};

export const getUrlConfig = (
    addHttps = true,
    method = "GET",
    headersConfig: HeadersConfig = headerConfig,
    body = ""
) => {
    const bodyObject = body ? {body} : {};

    const urlConfig = Object.assign(bodyObject, {
        method,
        headers: headersConfig,
        agent: httpsAgent
    });

    if (!addHttps) {
        delete urlConfig.agent;
    }

    return urlConfig;
};

export const urlConfig = getUrlConfig();
