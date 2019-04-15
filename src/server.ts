import bodyParser from "body-parser";
import cluster from "cluster";
import express from "express";
import os from "os";
import swaggerUi from "swagger-ui-express";
import SwagRoute from "../swag/SwagRoute";
import SwagUiComponent from "../swag/SwagUiComponent";
import routes from "./routes";
import swaggerDocument from "./swaggerDocument.json";

const numCPUs = os.cpus().length;
const WORKER_COUNT = 1 || numCPUs;
const PORT = process.env.PORT || 3000;

const ui = new SwagUiComponent();
ui.addRoute(new SwagRoute().path("/api/v1/test").mehthod("get").print())
  .addRoute(
    new SwagRoute()
      .path("/api/v1/test/{testId}")
      .mehthod("get")
      .addParameter({
        name: "testId",
        foundIn: "path",
        description: "the test id",
        required: true,
        type: "integer"
      })
  )
  .print();

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

  // const route = null;
  // const routez: any[] = [];

  // app._router.stack.forEach((middleware: any) => {
  //     if (middleware.route) { // routes registered directly on the app
  //         routez.push(middleware.route);
  //     } else if (middleware.name === "router") { // router middleware
  //         middleware.handle.stack.forEach((handler: any) => {
  //             route = handler.route;
  //             if (route) { routez.push(route); } else if (handler.name === "router") { // router middleware
  //               handler.handle.stack.forEach((h: any) => {
  //                   route = h.route;
  //                   if (route) { routez.push(route); }
  //               });
  //             }
  //         });
  //     }
  // });

  app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.error(
      `Node cluster worker ${process.pid}: listening on port ${PORT}`
    );
  });
}
