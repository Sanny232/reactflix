export const formatSeasons = (data) => {
	const result = [];
	for (let item of data) {
		let currentSeasonIndex = result.indexOf(
			result.find((el) => el.season === item.season)
		);
		if (currentSeasonIndex !== -1) {
			result[currentSeasonIndex].episodes.push(item);
		} else {
			result.push({ season: item.season, episodes: [item] });
		}
	}
	return result;
};
