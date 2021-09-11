import React from "react";
import {
	View,
	FlatList,
	StyleSheet,
	TouchableNativeFeedback,
	TouchableOpacity,
	Platform,
} from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

export default function MealList(props) {
	const TouchableComponent =
		Platform.OS == "android" && Platform.Version >= 21
			? TouchableNativeFeedback
			: TouchableOpacity;

	const renderMealItem = (itemData) => {
		return (
			<TouchableComponent onPress={() => props.onMealSelect(itemData.item.id)}>
				<View style={styles.mealContainer}>
					<Card>
						<Card.Cover
							source={{ uri: itemData.item.imgUrl }}
							style={{ width: 350 }}
						/>
						<Card.Content>
							<Title style={{ fontSize: 18 }}>{itemData.item.title}</Title>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
									margin: 5,
								}}
							>
								<Paragraph>{itemData.item.duration}m</Paragraph>
								<Paragraph>{itemData.item.complexity.toUpperCase()}</Paragraph>
								<Paragraph>
									{itemData.item.affordability.toUpperCase()}
								</Paragraph>
							</View>
						</Card.Content>
					</Card>
				</View>
			</TouchableComponent>
		);
	};
	return <FlatList data={props.mealsToDisplay} renderItem={renderMealItem} />;
}

const styles = StyleSheet.create({
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
