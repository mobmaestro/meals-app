export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const FILTER_MEALS = "FILTER_MEALS";

export const toggleFavorite = (mealId) => {
	return {
		type: TOGGLE_FAVORITE,
		payload: {
			mealId,
		},
	};
};

export const filterMeals = (filters) => {
	return {
		type: FILTER_MEALS,
		payload: {
			filterState: filters,
		},
	};
};
