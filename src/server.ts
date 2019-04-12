import bodyParser from "body-parser";
import cluster from "cluster";
import express from "express";
import os from "os";
import swaggerUi from "swagger-ui-express";
import routes from "./routes";
import swaggerDocument from "./swaggerDocument";

const numCPUs = os.cpus().length;
const WORKER_COUNT = process.env.WEB_CONCURRENCY || numCPUs;
const PORT = process.env.PORT || 3000;

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  // tslint:disable-next-line:no-console
  console.info(`Node cluster master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < WORKER_COUNT; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    // tslint:disable-next-line:no-console
    console.info(
      `Node cluster worker ${
        worker.process.pid
      } exited: code ${code}, signal ${signal}`
    );
  });
} else {
  // serever
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use("/api/v1/", routes);

  app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.error(
      `Node cluster worker ${process.pid}: listening on port ${PORT}`
    );
  });
}
