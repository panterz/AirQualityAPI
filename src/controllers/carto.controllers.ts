import {Request, Response} from "express";
import {StatisticalMeasurement} from "../enums/StatisticalMeasurement";
import {HttpStatusCode} from "../enums/HttpStatusCode";
import {HTTP400Error} from "../error/BaseError";
import logger from "../logger";
import {AirQualityVariable} from "../enums/AirQualityVariable";
import {ApiFilter} from "../models/ApiFilter";
import {StatisticalMeasurementService} from "../services/StatisticalMeasurementService";
import {Step} from "../enums/Step";

const getDate = (req: Request, param: string): Date => {
    const parameter = req.query[param];

    if (parameter) {
        if (
            /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]$/.test(
                parameter.toString().trim()
            )
        ) {
            throw new HTTP400Error(
                `The format of the parameter ${param} is not valid. It should follow the format YYYY-MM-DD HH:MM:SS`
            );
        }
        return new Date(`${parameter.toString()} UTC`);
    }
    throw new HTTP400Error(
        `The parameter ${param}  (timestamp) should be present`
    );
};

const getFrom = (req: Request) => getDate(req, "from");

const getTo = (req: Request) => getDate(req, "to");

const getStatisticalMeasurement = (req: Request): StatisticalMeasurement => {
    const param = req.query.statisticalMeasurement;
    const allowedValues = Object.values(StatisticalMeasurement).filter((v) =>
        isNaN(Number(v))
    );

    if (param) {
        const keyEnum = Object.keys(StatisticalMeasurement).find(
            (v) => v === param.toString().toUpperCase()
        );
        const result: StatisticalMeasurement =
            StatisticalMeasurement[
                keyEnum as keyof typeof StatisticalMeasurement
            ];
        if (result) {
            return result;
        }
    }
    throw new HTTP400Error(
        `The parameter statisticalMeasurement should be present. Allowed values: (${allowedValues.join(
            ","
        )})`
    );
};

const getAirQualityVariable = (req: Request): AirQualityVariable => {
    const param = req.query.variable;
    const allowedValues = Object.values(AirQualityVariable).filter((v) =>
        isNaN(Number(v))
    );

    if (param) {
        const keyEnum = Object.keys(AirQualityVariable).find(
            (v) => v === param.toString().toUpperCase()
        );
        const result: AirQualityVariable =
            AirQualityVariable[keyEnum as keyof typeof AirQualityVariable];
        if (result) {
            return result;
        }
    }
    throw new HTTP400Error(
        `The parameter variable should be present. Allowed values: (${allowedValues.join(
            ","
        )})`
    );
};

const getStep = (req: Request): Step => {
    const param = req.query.step;
    const allowedValues = Object.values(Step).filter((v) => isNaN(Number(v)));

    if (param) {
        const keyEnum = Object.keys(Step).find(
            (v) => v === param.toString().toUpperCase()
        );
        const result: Step = Step[keyEnum as keyof typeof Step];
        if (result) {
            return result;
        }
    }
    throw new HTTP400Error(
        `The parameter step should be present. Allowed values: (${allowedValues.join(
            ","
        )})`
    );
};

const getStationId = (req: Request): string => {
    const stationId: string = req.query.station_id.toString();

    if (!stationId) {
        throw new HTTP400Error("The stationId should be passed");
    }
    return stationId;
};

export const getMeasurement = async (req: Request, res: Response) => {
    try {
        const filter: ApiFilter = {
            from: getFrom(req),
            to: getTo(req),
            statisticalMeasurement: getStatisticalMeasurement(req),
            statisticalVariable: getAirQualityVariable(req)
        };
        const data = await new StatisticalMeasurementService().getMeasurement(
            filter
        );

        res.status(HttpStatusCode.OK).send(data);
    } catch (e) {
        logger.error(e);
        res.status(e.httpCode).send(e.message);
    }
};

export const getTimeSeries = async (req: Request, res: Response) => {
    try {
        const filter: ApiFilter = {
            from: getFrom(req),
            to: getTo(req),
            statisticalMeasurement: getStatisticalMeasurement(req),
            statisticalVariable: getAirQualityVariable(req)
        };
        const step: Step = getStep(req);
        const stationId: string = getStationId(req);
        const data = await new StatisticalMeasurementService().getTimeSeries(
            filter,
            step,
            stationId
        );

        res.status(HttpStatusCode.OK).send(data);
    } catch (e) {
        logger.error(e);
        res.status(e.httpCode).send(e.message);
    }
};
