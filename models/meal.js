export default class Meal {
	constructor(
		id,
		categoryIds,
		title,
		affordability,
		complexity,
		imgUrl,
		duration,
		ingredients,
		steps,
		isGlutenFree,
		isVegan,
		isVegeterian,
		isLactoseFree
	) {
		this.id = id;
		this.categoryIds = categoryIds;
		this.title = title;
		this.affordability = affordability;
		this.complexity = complexity;
		this.imgUrl = imgUrl;
		this.duration = duration;
		this.ingredients = ingredients;
		this.steps = steps;
		this.isGlutenFree = isGlutenFree;
		this.isVegan = isVegan;
		this.isVegeterian = isVegeterian;
		this.isLactoseFree = isLactoseFree;
	}
}
