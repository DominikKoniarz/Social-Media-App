export const originsWhitelist: string[] =
	process.env.NODE_ENV !== "production"
		? [
				"http://localhost:3000",
				"http://127.0.0.1:3000",
				"http://localhost:5173",
				"http://127.0.0.1:5173",
		  ]
		: [`${process.env.APP_HOSTNAME}`];
