import type { MiddlewareCreator } from "./common.js";

// This convension is just one idea.

const rewriteRsc: MiddlewareCreator = () => {
  return async (req, _res, next) => {
    const url = new URL(req.url || "", "http://" + req.headers.host);
    const rscId = url.searchParams.get("rsc_id");
    if (rscId) {
      req.headers["x-react-server-component-id"] = rscId;
      req.headers["x-react-server-component-props"] =
        url.searchParams.get("props") || undefined;
    }
    const rsfId = url.searchParams.get("rsf_id");
    if (rsfId) {
      req.headers["x-react-server-function-id"] = rsfId;
      req.headers["x-react-server-function-name"] =
        url.searchParams.get("name") || "default";
    }
    await next();
  };
};

export default rewriteRsc;
