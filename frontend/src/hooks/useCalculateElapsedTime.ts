const useCalculateElapsedTime = (releaseDate: Date): string => {
	const diffMs = Date.now() - releaseDate.getTime();

	const elapsedYears = Math.floor(diffMs / 31536000000);
	const elapsedMonths = Math.floor(diffMs / 2629800000);
	const elapsedDays = Math.floor(diffMs / 86400000);
	const elapsedHours = Math.floor((diffMs % 86400000) / 3600000);
	const elapsedMinutes = Math.floor(((diffMs % 86400000) % 3600000) / 60000);
	const elapsedSeconds = Math.floor(diffMs / 1000);

	if (elapsedYears > 0)
		return elapsedYears === 1 ? `1 year ago` : `${elapsedYears} years ago`;
	else if (elapsedMonths > 0)
		return elapsedMonths === 1 ? `1 month ago` : `${elapsedMonths} months ago`;
	else if (elapsedDays > 0)
		return elapsedDays === 1 ? `Yesterday` : `${elapsedDays} days ago`;
	else if (elapsedHours > 0)
		return elapsedHours === 1 ? `1 hour ago` : `${elapsedHours} hours ago`;
	else if (elapsedMinutes > 0)
		return elapsedMinutes === 1
			? `1 minute ago`
			: `${elapsedMinutes} minutes ago`;
	else if (elapsedSeconds >= 15) return `${elapsedSeconds} seconds ago`;
	else if (elapsedSeconds >= 0) return `Just now`;
	else return `Scheduled for ${releaseDate.toLocaleString()}`;
};

export default useCalculateElapsedTime;
