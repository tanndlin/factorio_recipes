import { Item } from './types';

export function getRecipeSum(item: Item, items: Item[], quantity: number) {
    const { recipe } = item;
    const { ingredients } = recipe;

    const totals: { [key: string]: number } = {};
    totals[item.id] = (totals[item.id] ?? 0) + quantity * (recipe.yield ?? 1);

    ingredients.forEach((ingredient) => {
        totals[ingredient.id] =
            (totals[ingredient.id] ?? 0) + quantity * ingredient.amount;

        const ingredientItem = getItem(ingredient.id, items)!;
        const sum = getRecipeSum(
            ingredientItem,
            items,
            quantity * ingredient.amount
        );

        Object.keys(sum).forEach((key) => {
            if (key !== ingredient.id)
                totals[key] = (totals[key] ?? 0) + sum[key];
        });
    });

    return totals;
}

export function getItem(id: string, items: Item[]) {
    return items.find((item) => item.id === id);
}
