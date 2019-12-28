/*****************************************************************************
 * Environment Configuration Loader
 *
 * - Uses the dotenv package to load an .env file
 *   located in the server root directory.
 *****************************************************************************/

import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(__dirname, "../../*.env") });

export default process.env;
