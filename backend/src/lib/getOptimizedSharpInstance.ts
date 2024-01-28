import sharp from "sharp";

sharp.cache(false);
sharp.concurrency(1);

const getOptimizedSharpInstance = () => {
	return sharp;
};

export default getOptimizedSharpInstance;
