import {register} from "node:module";
import {pathToFileURL} from "node:url";
import {setUncaughtExceptionCaptureCallback} from "node:process"

register("ts-node/esm", pathToFileURL("./"));
setUncaughtExceptionCaptureCallback((err) => {
  console.error(err);
  process.exit(1);
});