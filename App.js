import React, { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { Stack } from "./navigation/navigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import CategoriesScreen from "./screens/CategoriesScreen";
import MealsScreen from "./screens/MealsScreen";
import RecipesScreen from "./screens/RecipesScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import FiltersScreen from "./screens/FiltersScreen";
import colors from "./styles/colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import headerButton from "./components/headerButton";
import { Ionicons } from "@expo/vector-icons";
import { createStore, combineReducers } from "redux";
import mealsReducer from "./store/reducers/mealsReducer";
import { Provider } from "react-redux";
import { DeviceEventEmitter } from "react-native";
import { color } from "react-native-reanimated";

const store = createStore(
	combineReducers({
		mealsReducer,
	})
);

const fetchFonts = () => {
	Font.loadAsync({
		"open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
		"open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
	});
};

export default function App() {
	const [fontLoaded, setFontLoaded] = useState(false);

	if (!fontLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setFontLoaded(true)}
				onError={() => console.log("Crashed")}
			/>
		);
	}

	const Tab = createBottomTabNavigator();

	const Drawer = createDrawerNavigator();

	const MealsStackScreen = ({ navigation }) => {
		return (
			<Stack.Navigator>
				<Stack.Screen
					name="Categories"
					component={CategoriesScreen}
					options={{
						headerStyle: {
							backgroundColor:
								Platform.OS === "android" ? colors.primary : "white",
						},
						headerTintColor:
							Platform.OS === "android" ? "white" : colors.primary,
						headerLeft: () => (
							<HeaderButtons HeaderButtonComponent={headerButton}>
								<Item
									iconName="ios-menu"
									color={Platform.OS === "android" ? "white" : colors.primary}
									onPress={() => {
										navigation.toggleDrawer();
									}}
								/>
							</HeaderButtons>
						),
					}}
				/>
				<Stack.Screen
					name="MealsScreen"
					component={MealsScreen}
					options={({ route }) => ({
						title: route.params.title,
						headerStyle: {
							backgroundColor:
								Platform.OS === "android" ? route.params.color : "white",
						},
						headerTintColor:
							Platform.OS === "android"
								? route.params.textColor
								: route.params.color,
					})}
				/>
				<Stack.Screen
					name="Recipes"
					component={RecipesScreen}
					options={({ route }) => ({
						title: route.params.mealTitle,
						headerStyle: {
							backgroundColor:
								Platform.OS === "android" ? colors.primary : "white",
						},
						headerTintColor: Platform.OS === "android" ? "white" : colors.text,
					})}
				/>
			</Stack.Navigator>
		);
	};

	const FavoriteStackScreen = ({ navigation }) => {
		return (
			<Stack.Navigator>
				<Stack.Screen
					name="Favorites"
					component={FavoritesScreen}
					options={{
						headerStyle: {
							backgroundColor:
								Platform.OS === "android" ? colors.primary : "white",
						},
						headerTintColor:
							Platform.OS === "android" ? "white" : colors.primary,
						headerLeft: () => (
							<HeaderButtons HeaderButtonComponent={headerButton}>
								<Item
									iconName="ios-menu"
									color={Platform.OS === "android" ? "white" : colors.primary}
									onPress={() => {
										navigation.toggleDrawer();
									}}
								/>
							</HeaderButtons>
						),
					}}
				/>
				<Stack.Screen
					name="Recipes"
					component={RecipesScreen}
					options={({ route }) => ({
						title: route.params.mealTitle,
						headerStyle: {
							backgroundColor:
								Platform.OS === "android" ? colors.primary : "white",
						},
						headerTintColor:
							Platform.OS === "android" ? "white" : colors.primary,
						headerRight: () => (
							<HeaderButtons HeaderButtonComponent={headerButton}>
								<Item iconName="ios-star-outline" color="yellow" />
							</HeaderButtons>
						),
					})}
				/>
			</Stack.Navigator>
		);
	};

	const FiltersPage = ({ navigation }) => {
		return (
			<Stack.Navigator>
				<Stack.Screen
					name="FiltersScreen"
					component={FiltersScreen}
					options={{
						headerStyle: {
							backgroundColor:
								Platform.OS === "android" ? colors.primary : "white",
						},
						headerTintColor:
							Platform.OS === "android" ? "white" : colors.primary,
						headerLeft: () => (
							<HeaderButtons HeaderButtonComponent={headerButton}>
								<Item
									iconName="ios-menu"
									color={Platform.OS === "android" ? "white" : colors.primary}
									onPress={() => {
										navigation.toggleDrawer();
									}}
								/>
							</HeaderButtons>
						),
					}}
				/>
			</Stack.Navigator>
		);
	};
	const MealsPage = () => {
		return (
			<Tab.Navigator
				screenOptions={{
					headerShown: false,
					tabBarActiveTintColor:
						Platform.OS === "ios" ? colors.primary : "white",
					tabBarActiveBackgroundColor:
						Platform.OS === "ios" ? "white" : colors.primary,
					tabBarInactiveTintColor: "black",
					tabBarLabelStyle: { fontSize: 13 },
				}}
			>
				<Tab.Screen
					name="Meals"
					component={MealsStackScreen}
					options={{
						tabBarIcon: (tabInfo) => (
							<Ionicons name="ios-restaurant" color={tabInfo.color} />
						),
					}}
				/>
				<Tab.Screen
					name="Favorites"
					component={FavoriteStackScreen}
					options={{
						tabBarIcon: (tabInfo) => (
							<Ionicons name="ios-star" color={tabInfo.color} />
						),
					}}
				/>
			</Tab.Navigator>
		);
	};

	return (
		<Provider store={store}>
			<NavigationContainer>
				<Drawer.Navigator
					initialRouteName="Home"
					screenOptions={{
						headerShown: false,
						drawerActiveBackgroundColor: colors.primary,
						drawerActiveTintColor: "white",
						drawerInactiveTintColor: "black",
					}}
				>
					<Drawer.Screen
						name="Home"
						component={MealsPage}
						options={{
							drawerIcon: (drawerInfo) => (
								<Ionicons
									name="ios-home"
									color={drawerInfo.focused ? "white" : "black"}
								/>
							),
						}}
					/>
					<Drawer.Screen
						name="Filters"
						component={FiltersPage}
						options={{
							drawerIcon: (drawerInfo) => (
								<Ionicons
									name="ios-filter"
									color={drawerInfo.focused ? "white" : "black"}
								/>
							),
						}}
					/>
				</Drawer.Navigator>
			</NavigationContainer>
		</Provider>
	);
}

const styles = StyleSheet.create({});
