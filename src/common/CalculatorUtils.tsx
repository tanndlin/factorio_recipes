import React from 'react';
import CalculatedRecipe from '../components/RecipeViewer/CalculatedRecipe';
import { Item } from './types';

export function getRecipeRecurse(
    item: Item,
    items: Item[],
    amount: number,
    depth?: number
): React.ReactNode {
    const { recipe } = item;
    const { ingredients } = recipe;

    console.log(item.name, depth);

    return (
        <CalculatedRecipe
            item={item}
            amount={amount}
            depth={depth ? depth + 1 : 0}
        >
            {ingredients.map((ingredient) => {
                return getRecipeRecurse(
                    getItem(ingredient.id, items)!,
                    items,
                    amount * ingredient.amount,
                    (depth ?? 0) + 1
                );
            })}
        </CalculatedRecipe>
    );
}

export function getRecipeSum(item: Item, items: Item[], quantity: number) {
    const { recipe } = item;
    const { ingredients } = recipe;

    const totals: { [key: string]: number } = {};
    totals[item.id] = (totals[item.id] ?? 0) + quantity;

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
