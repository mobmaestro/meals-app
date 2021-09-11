import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, FlatList } from "react-native";
import { Card, Title, Paragraph, List } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import colors from "../styles/colors";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../store/actions/mealsActions";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import headerButton from "../components/headerButton";
export default function RecipesScreen(props) {
	const meals = useSelector((state) => state.mealsReducer.meals);
	const mealId = props.route.params.mealId;
	const isCurrentMealFav = useSelector((state) =>
		state.mealsReducer.favoriteMeals.some((meal) => meal.id === mealId)
	);
	const selectedMeal = meals.filter((meal) => meal.id === mealId)[0];
	const dispatch = useDispatch();
	const handleToggleFavorite = (mealId) => {
		console.log("found");
		dispatch(toggleFavorite(mealId));
	};

	useLayoutEffect(() => {
		console.log(isCurrentMealFav);
		props.navigation.setOptions({
			headerRight: () => (
				<HeaderButtons HeaderButtonComponent={headerButton}>
					<Item
						iconName={isCurrentMealFav ? "ios-star" : "ios-star-outline"}
						color="yellow"
						onPress={() => handleToggleFavorite(selectedMeal.id)}
					/>
				</HeaderButtons>
			),
		});
	}, [props.navigation, isCurrentMealFav]);

	return (
		<ScrollView>
			<View style={styles.container}>
				<View style={styles.mealContainer}>
					<Card>
						<Card.Cover source={{ uri: selectedMeal.imgUrl }} />
						<Card.Content>
							<Title style={{ fontSize: 18 }}>{selectedMeal.title}</Title>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
									margin: 5,
								}}
							>
								<Paragraph>{selectedMeal.duration}m</Paragraph>
								<Paragraph>{selectedMeal.complexity.toUpperCase()}</Paragraph>
								<Paragraph>
									{selectedMeal.affordability.toUpperCase()}
								</Paragraph>
							</View>
						</Card.Content>
						<Card.Content>
							<List.Section>
								<List.Subheader>Ingredients</List.Subheader>
								<FlatList
									numColumns={2}
									data={selectedMeal.ingredients}
									renderItem={(itemData) => (
										<View
											style={{
												flex: 1,
												flexDirection: "row",
												margin: 5,
											}}
										>
											<Ionicons
												name="color-fill"
												color={colors.primary}
												size={15}
											/>
											<Text style={{ letterSpacing: 1, marginLeft: 5 }}>
												{itemData.item}
											</Text>
										</View>
									)}
								/>
							</List.Section>
						</Card.Content>
						<Card.Content>
							<List.Section>
								<List.Subheader>Steps</List.Subheader>
								<FlatList
									data={selectedMeal.steps}
									renderItem={(itemData) => (
										<View
											style={{
												flexDirection: "row",
												margin: 5,
											}}
										>
											<Ionicons
												name="radio-button-on"
												color={colors.primary}
												size={15}
											/>
											<Text style={{ letterSpacing: 0.5, marginLeft: 5 }}>
												{itemData.item}
											</Text>
										</View>
									)}
								/>
							</List.Section>
						</Card.Content>
					</Card>
				</View>
			</View>
		</ScrollView>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	mealContainer: {
		margin: 10,
		borderRadius: 15,
		shadowColor: "#999",
		shadowOffset: { width: 0, height: 0 },
		shadowRadius: 10,
		shadowOpacity: 0.3,
		elevation: 4,
	},
});
