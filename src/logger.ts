import {createLogger, format, transports} from "winston";
import ecsFormat from "@elastic/ecs-winston-format";

const isProdEnvironment = () => process.env.NODE_ENV === "production";
const isLocalDev = () => process.env.NODE_ENV === "local";

const localFormat = format.combine(
    format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
    format.colorize(),
    format.printf((info) => {
        const {timestamp, level, message} = info;

        return `${timestamp} [${level}]: ${message}`;
    })
);

const logger = createLogger({
    level: isProdEnvironment() ? "info" : "debug",
    format: isLocalDev() ? localFormat : ecsFormat({convertReqRes: true}),
    transports: [new transports.Console()]
});

export default logger;
