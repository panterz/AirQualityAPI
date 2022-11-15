import express from "express";
import actuator from "express-actuator";
import compression from "compression";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger";
import CartoRouter from "./routes/carto.routes";
import {BODY_SIZE_LIMIT} from "./properties";

const app = express();

app.use(express.json({limit: BODY_SIZE_LIMIT}));
app.use(compression());
app.use(helmet());
app.use(actuator());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/carto", CartoRouter);

export default app;
