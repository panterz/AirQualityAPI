import cartoConfig from "./config.json";
import fetch, {Response} from "node-fetch";
import {BASE_URL} from "../../properties";
import {getUrlConfig} from "../default";
import {HTTP400Error, HTTP404Error} from "../../error/BaseError";
import {AirQuality} from "../../models/AirQuality";

const _processTitleResponse = (response: Response): Promise<AirQuality> => {
    if (response.ok) {
        return response.json();
    } else if (response.status === 404) {
        throw new HTTP404Error(cartoConfig.messages.notFound);
    } else {
        throw new HTTP400Error(cartoConfig.messages.requestFailed);
    }
};

const USE_HTTPS = true;

const _getRequestUrl = (q: string) => {
    return `${BASE_URL}/${cartoConfig.version}${cartoConfig.baseUrl}/${cartoConfig.serviceApi}?q=${q}`;
};

export default class CartoRequest {
    async getQuery(q: string, authToken: string): Promise<AirQuality> {
        const requestUrl = _getRequestUrl(q);
        const headersConfig = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
            "Cache-Control": "max-age=300"
        };

        const response = await fetch(
            requestUrl,
            getUrlConfig(USE_HTTPS, "GET", headersConfig)
        );

        return _processTitleResponse(response);
    }
}
