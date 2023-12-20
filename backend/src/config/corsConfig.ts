import { CorsOptions } from "cors";

const whitelist: string[] =
	process.env.NODE_ENV !== "production"
		? [
				"http://localhost:3000",
				"http://127.0.0.1:3000",
				"http://localhost:5173",
				"http://127.0.0.1:5173",
		  ]
		: [process.env.NODE_ENV];

const corsConfig: CorsOptions = {
	origin: function (origin, callback) {
		if (!origin || whitelist.indexOf(origin) !== -1) {
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
