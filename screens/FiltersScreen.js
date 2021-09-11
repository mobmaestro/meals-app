import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList, Switch } from "react-native";
import { Button, List } from "react-native-paper";
import colors from "../styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { filterMeals } from "../store/actions/mealsActions";
export default function FiltersScreen(props) {
	const [filters, setFilters] = useState([
		{
			id: 1,
			label: "Gluten-Free",
			status: false,
		},
		{
			id: 2,
			label: "Vegan",
			status: false,
		},
		{
			id: 3,
			label: "Vegetarian",
			status: false,
		},
		{
			id: 4,
			label: "Lactose-Free",
			status: false,
		},
	]);
	const dispatch = useDispatch();
	const handleFilterChange = (id) => {
		setFilters((oldFilterState) => {
			return oldFilterState.map((filterState) => {
				if (filterState.id === id) {
					return {
						...filterState,
						status: !filterState.status,
					};
				} else {
					return filterState;
				}
			});
		});
	};

	const handleProceed = () => {
		dispatch(filterMeals(filters));
		props.navigation.navigate("Categories");
	};

	return (
		<View style={styles.container}>
			<List.Section>
				<List.Subheader>Available Filters</List.Subheader>
				<FlatList
					contentContainerStyle={{ padding: 20 }}
					data={filters}
					renderItem={(itemData) => (
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								margin: 5,
							}}
						>
							<Text>{itemData.item.label}</Text>
							<Switch
								value={itemData.item.status}
								onChange={() => handleFilterChange(itemData.item.id)}
								trackColor={colors.primary}
							/>
						</View>
					)}
				/>
			</List.Section>
			<View style={{ padding: 20, alignItems: "flex-end" }}>
				<Button
					style={{ width: "30%" }}
					mode="outlined"
					color={colors.primary}
					icon={() => <Ionicons name="arrow-forward" color={colors.primary} />}
					onPress={handleProceed}
					contentStyle={{ flexDirection: "row-reverse" }}
				>
					Proceed
				</Button>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-between",
	},
});
