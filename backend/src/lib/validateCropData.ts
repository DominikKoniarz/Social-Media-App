import { CropData } from "../../../types/socket.io";

const validateCropData = (cropData: CropData): boolean => {
	const { height, width, x, y, scaleX, scaleY } = cropData;

	if (height < 0 || width < 0 || x < 0 || y < 0 || scaleX < 0 || scaleY < 0)
		return false;

	return true;
};

export default validateCropData;
