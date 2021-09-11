import React from "react";
import MealList from "../components/mealList";
import { useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import { Paragraph } from "react-native-paper";
export default function FavoritesScreen(props) {
	const mealsToDisplay = useSelector(
		(state) => state.mealsReducer.favoriteMeals
	);

	const handleMealSelect = (mealId) => {
		props.navigation.navigate("Recipes", {
			mealId,
			mealTitle: mealsToDisplay.filter((meal) => meal.id === mealId)[0].title,
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
				<Paragraph>There are no favorites to display!</Paragraph>
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
