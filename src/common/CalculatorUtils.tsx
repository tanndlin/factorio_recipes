import { Item, IOItem } from './types/types';

export function getRecipeSumAll(
    inputItems: IOItem[],
    outputItems: IOItem[],
    items: Item[]
) {
    const inputItemsCopy: IOItem[] = [];
    inputItems.forEach((inputItem) => {
        inputItemsCopy.push({ ...inputItem });
    });

    const totals: { [key: string]: number } = {};

    outputItems.forEach((outputItem) => {
        const { item, amount } = outputItem;
        const { recipe } = item;

        const sum = getRecipeSum(
            item,
            items,
            amount / (recipe.yield ?? 1),
            inputItemsCopy
        );

        Object.keys(sum).forEach((key) => {
            totals[key] = (totals[key] ?? 0) + sum[key];
        });
    });

    return totals;
}

export function getRecipeSum(
    item: Item,
    items: Item[],
    quantity: number,
    inputItems: IOItem[]
) {
    const { recipe } = item;
    const { ingredients } = recipe;

    const totals: { [key: string]: number } = {};
    totals[item.id] = (totals[item.id] ?? 0) + quantity * (recipe.yield ?? 1);

    // BFS to get the main ingredients first
    ingredients.forEach((ingredient) => {
        let reducedAmount = 0;
        const realNeed = quantity * ingredient.amount;
        const foundInput = inputItems.find(
            (inputItem) => inputItem.item.id === ingredient.id
        );
        if (foundInput) {
            if (foundInput.amount >= realNeed) {
                inputItems[inputItems.indexOf(foundInput)].amount -= realNeed;
                return;
            } else {
                reducedAmount = foundInput.amount;
                inputItems.splice(inputItems.indexOf(foundInput), 1);
            }
        }
        totals[ingredient.id] =
            (totals[ingredient.id] ?? 0) + realNeed - reducedAmount;
    });

    // Iterate again to get the ingredients of the ingredients
    ingredients.forEach((ingredient) => {
        let reducedAmount = 0;
        const realNeed = quantity * ingredient.amount;
        const foundInput = inputItems.find(
            (inputItem) => inputItem.item.id === ingredient.id
        );
        if (foundInput) {
            if (foundInput.amount >= realNeed) {
                inputItems[inputItems.indexOf(foundInput)].amount -= realNeed;
                return;
            } else {
                reducedAmount = foundInput.amount;
                inputItems.splice(inputItems.indexOf(foundInput), 1);
            }
        }
        const ingredientItem = getItem(ingredient.id, items)!;
        const sum = getRecipeSum(
            ingredientItem,
            items,
            realNeed - reducedAmount,
            inputItems
        );

        Object.keys(sum).forEach((key) => {
            if (key !== ingredient.id) {
                totals[key] = (totals[key] ?? 0) + sum[key];
            }
        });
    });

    return totals;
}

export function getItem(id: string, items: Item[]) {
    return items.find((item) => item.id === id);
}

export function removeDuplicates(items: IOItem[]) {
    return items.filter(
        (item, index, self) =>
            self.findIndex((curItem) => curItem.item.id === item.item.id) ===
            index
    );
}
