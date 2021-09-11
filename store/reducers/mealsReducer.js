import { MEALS as meals } from "../../resources/data.js";
import { FILTER_MEALS, TOGGLE_FAVORITE } from "../actions/mealsActions.js";

const initialState = {
	meals: meals,
	filteredMeals: meals,
	favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_FAVORITE:
			const mealId = action.payload.mealId;
			if (state.favoriteMeals.length < 0) {
				return {
					...state,
					favoriteMeals: [
						...state.favoriteMeals,
						state.meals.find((meal) => meal.id === mealId),
					],
				};
			} else {
				const index = state.favoriteMeals.findIndex(
					(meal) => meal.id === mealId
				);
				if (index === -1) {
					return {
						...state,
						favoriteMeals: [
							...state.favoriteMeals,
							state.meals.find((meal) => meal.id === mealId),
						],
					};
				} else {
					const updatedMeals = [...state.favoriteMeals];
					updatedMeals.splice(index, 1);
					return {
						...state,
						favoriteMeals: updatedMeals,
					};
				}
			}
		case FILTER_MEALS: {
			const filters = action.payload.filterState;
			const appliedFilters = filters.filter(
				(filterApplied) => filterApplied.status
			);
			if (appliedFilters.length === 0) {
				return {
					...state,
					filteredMeals: meals,
				};
			} else {
				const filterList = {};
				for (let filter of appliedFilters) {
					filterList[filter.label] = true;
				}
				const updatedFilteredMeals = state.meals.filter((meal) => {
					if (filterList["Vegan"] && !meal.isVegan) {
						return false;
					}
					if (filterList["Gluten-Free"] && !meal.isGlutenFree) {
						return false;
					}
					if (filterList["Lactose-Free"] && !meal.isLactoseFree) {
						return false;
					}
					if (filterList["Vegetarian"] && !meal.isVegeterian) {
						return false;
					}
					return true;
				});
				return {
					...state,
					filteredMeals: updatedFilteredMeals,
				};
			}
		}
		default:
			return state;
	}
};

export default mealsReducer;
