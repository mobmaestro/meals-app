import React from "react";
import {
	StyleSheet,
	View,
	Text,
	FlatList,
	TouchableOpacity,
} from "react-native";
import { CATEGORIES } from "../resources/data";

export default function CategoriesScreen(props) {
	return (
		<View style={{ padding: 20 }}>
			<FlatList
				numColumns={2}
				data={CATEGORIES}
				renderItem={(itemData) => (
					<TouchableOpacity
						style={styles.gridItem}
						onPress={() => {
							props.navigation.navigate("MealsScreen", {
								categoryId: itemData.item.id,
								title: itemData.item.title,
								color: itemData.item.color,
								textColor: itemData.item.textColor,
							});
						}}
					>
						<View
							style={{
								...styles.categoryTitleView,
								backgroundColor: itemData.item.color,
							}}
						>
							<Text
								style={{
									...styles.categoryTitleText,
									color: itemData.item.textColor,
								}}
							>
								{itemData.item.title}
							</Text>
						</View>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	gridItem: {
		flex: 1,
		minHeight: 150,
	},
	categoryTitleView: {
		flex: 1,
		margin: 10,
		borderRadius: 15,
		shadowColor: "#999",
		shadowOffset: { width: 0, height: 0 },
		shadowRadius: 10,
		shadowOpacity: 0.3,
		elevation: 4,
		justifyContent: "flex-end",
		alignItems: "flex-end",
		padding: 15,
	},

	categoryTitleText: {
		fontSize: 18,
		fontWeight: "bold",
		fontFamily: "sans-serif",
	},
});
