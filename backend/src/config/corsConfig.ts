import { CorsOptions } from "cors";
import { originsWhitelist } from "./originsWhitelist";

const corsConfig: CorsOptions = {
	origin: function (origin, callback) {
		if (!origin || originsWhitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
	optionsSuccessStatus: 204,
};

export default corsConfig;
