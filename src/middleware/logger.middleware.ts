import * as express from "express";

function loggerMiddleware(
  request: express.Request,
  response: express.Response,
  next
) {
  console.log(
    `${request.method} ${request.path}, ${JSON.stringify(request.body)}`
  );
  next();
}

export default loggerMiddleware;
