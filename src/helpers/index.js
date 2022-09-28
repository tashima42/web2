import { buildCryptoHelper } from "./crypto.js";
import { buildJwtHelper } from "./jwt.js";

const cryptoHelper = buildCryptoHelper()
const jwtHelper = buildJwtHelper("secret")

export {
  cryptoHelper,
  jwtHelper,
}
