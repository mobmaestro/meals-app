import React from "react";
import MealList from "../components/mealList";
import { useSelector } from "react-redux";

import { View, StyleSheet } from "react-native";
import { Paragraph } from "react-native-paper";
export default function MealsScreen(props) {
	const meals = useSelector((state) => state.mealsReducer.filteredMeals);
	const catId = props.route.params.categoryId;
	const mealsToDisplay = meals.filter((meal) =>
		meal.categoryIds.includes(catId)
	);

	const handleMealSelect = (mealId) => {
		props.navigation.navigate("Recipes", {
			mealId,
			mealTitle: mealsToDisplay.filter((meal) => meal.id === mealId)[0].title,
			catColor: props.route.params.color,
			catTextColor: props.route.params.textColor,
		});
	};

	return (
		<View style={styles.container}>
			{mealsToDisplay.length > 0 ? (
				<MealList
					onMealSelect={handleMealSelect}
					mealsToDisplay={mealsToDisplay}
				/>
			) : (
				<Paragraph>There are no meals based on filters selected</Paragraph>
			)}
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
