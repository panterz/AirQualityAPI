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
        return `with t1 as (
                select a.geoid, b.station_id, c.population
                from cartodb-gcp-backend-data-team.code_test.airquality_stations b,
                carto-data.ac_puvhdapm.sub_worldpop_geography_esp_grid100m_v1 a
                inner join carto-data.ac_puvhdapm.sub_worldpop_demographics_population_esp_grid100m_v1_yearly_2010 c
                on a.geoid = c.geoid
                where ST_Contains(a.geom, b.geom)
            )
            select ${filter.statisticalMeasurement}(m.${
            filter.statisticalVariable
        }), t.population, t.station_id
                from cartodb-gcp-backend-data-team.code_test.airquality_measurements m
                inner join t1 t on m.station_id = t.station_id
                where m.timeinstant between '${filter.from.toISOString()}' and '${filter.to.toISOString()}'
                group by t.population, t.station_id`;
    }

    private createSQLForTimeSeries(
        filter: ApiFilter,
        step: Step,
        stationId: string
    ) {
        return (
            `select ${filter.statisticalMeasurement}(${filter.statisticalVariable}), timestamp_trunc(CAST(timeinstant AS TIMESTAMP), ${step}) AS step ` +
            "from cartodb-gcp-backend-data-team.code_test.airquality_measurements " +
            `where station_id = '${stationId}' and timeinstant between '${filter.from.toISOString()}' and '${filter.to.toISOString()}' ` +
            "group by step order by step"
        );
    }
}
