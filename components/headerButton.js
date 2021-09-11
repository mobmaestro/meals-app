import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButton } from "react-navigation-header-buttons";

export default function headerButton(props) {
	return (
		<HeaderButton
			IconComponent={Ionicons}
			iconSize={23}
			color={props.color}
			style={{ margin: 0 }}
			{...props}
		/>
	);
}
