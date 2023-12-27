import { HelmetOptions } from "helmet";

const helmetConfig: HelmetOptions = {
	contentSecurityPolicy: {
		useDefaults: true,
		directives: {
			scriptSrc: ["'self'"],
			styleSrc: [
				"'self'",
				"'unsafe-inline'",
				"fonts.googleapis.com",
				"fonts.cdnfonts.com",
			],
		},
	},
	// cors needs origin
	referrerPolicy: {
		policy: ["origin"],
	},
};

export default helmetConfig;
