import {CARTO_KEY} from "../properties";
import {ApiFilter} from "../models/ApiFilter";
import CartoRequest from "../requests/carto/carto-request";
import {Step} from "../enums/Step";

export class StatisticalMeasurementService {
    cartoRequest: CartoRequest;
    constructor() {
        this.cartoRequest = new CartoRequest();
    }

    async getMeasurement(filter: ApiFilter) {
        return this.cartoRequest.getQuery(
            this.createSQLForMeasurement(filter),
            CARTO_KEY
        );
    }

    async getTimeSeries(filter: ApiFilter, step: Step, stationId: string) {
        return this.cartoRequest.getQuery(
            this.createSQLForTimeSeries(filter, step, stationId),
            CARTO_KEY
        );
    }

    private createSQLForMeasurement(filter: ApiFilter) {
        return (
            `select ${filter.statisticalMeasurement}(${filter.statisticalVariable}) ` +
            "from cartodb-gcp-backend-data-team.code_test.airquality_measurements where timeinstant " +
            `between '${filter.from.toISOString()}' and '${filter.to.toISOString()}'`
        );
    }

    private createSQLForTimeSeries(
        filter: ApiFilter,
        step: Step,
        stationId: string
    ) {
        return (
            `select ${filter.statisticalMeasurement}(${filter.statisticalVariable}), timestamp_trunc(CAST(timeinstant AS TIMESTAMP), ${step}) AS step ` +
            `from cartodb-gcp-backend-data-team.code_test.airquality_measurements where station_id = '${stationId}' ` +
            "group by step order by step"
        );
    }
}
