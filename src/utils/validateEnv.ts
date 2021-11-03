import { cleanEnv, str, port } from "envalid";

function validateEnv() {
  cleanEnv(process.env, {
    MONGO_PASSWORD: str(),
    MONGO_PATH: str(),
    MONGO_USER: str(),
    PORT: port(),
  });
}

export default validateEnv;

// str() - Passes string values through, will ensure an value is present unless a default value is given. Note that an empty string is considered a valid value - if this is undesirable you can easily create your own validator (see below)
// bool() - Parses env var strings "1", "0", "true", "false", "t", "f" into booleans
// num() - Parses an env var (eg. "42", "0.23", "1e5") into a Number
// email() - Ensures an env var is an email address
// host() - Ensures an env var is either a domain name or an ip address (v4 or v6)
// port() - Ensures an env var is a TCP port (1-65535)
// url() - Ensures an env var is a url with a protocol and hostname
// json() - Parses an env var with JSON.parse
