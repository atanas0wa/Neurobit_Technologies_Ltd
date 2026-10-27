import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
// No client sends compressed request bodies, so refuse them before any
// decompression stream is created (defense in depth for GHSA-27r3-jxmh-p828).
app.use(express.json({ inflate: false }));
app.use(express.urlencoded({ extended: true, inflate: false }));

app.use("/api", router);

export default app;
