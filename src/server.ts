import errorHandler from "errorhandler";
import app from "./app";
import logger from "./logger";
import {PORT} from "./properties";

const port = PORT;

/**
 * Error Handler. Provides full stack
 */
if (process.env.NODE_ENV === "development") {
    app.use(errorHandler());
}

/**
 * Start Express server.
 */
const server = app.listen(port, () => {
    logger.info(
        `App is running at http://localhost:${PORT} in ${app.get("env")} mode`
    );
    logger.info("  Press CTRL-C to stop\n");
});

export default server;
