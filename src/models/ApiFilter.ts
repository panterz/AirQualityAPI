import {StatisticalMeasurement} from "../enums/StatisticalMeasurement";
import {AirQualityVariable} from "../enums/AirQualityVariable";

export interface ApiFilter {
    from: Date;
    to: Date;
    statisticalVariable: AirQualityVariable;
    statisticalMeasurement: StatisticalMeasurement;
}
