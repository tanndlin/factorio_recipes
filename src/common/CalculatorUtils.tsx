import { Item, IOItem } from './types';

export function getRecipeSumAll(
    inputItems: IOItem[],
    outputItems: IOItem[],
    items: Item[]
) {
    const inputItemsCopy: IOItem[] = [];
    inputItems.forEach((inputItem) => {
        inputItemsCopy.push({ ...inputItem });
    });

    console.log('Original', inputItems);
    console.log('Copy', inputItemsCopy);

    const totals: { [key: string]: number } = {};

    outputItems.forEach((item) => {
        const sum = getRecipeSum(item.item, items, item.amount, inputItemsCopy);

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

    ingredients.forEach((ingredient) => {
        let reducedAmount = 0;

        const foundInput = inputItems.find(
            (inputItem) => inputItem.item.id === ingredient.id
        );
        if (foundInput) {
            console.log('Found input', foundInput);

            if (foundInput.amount >= ingredient.amount) {
                inputItems[inputItems.indexOf(foundInput)].amount -=
                    ingredient.amount;
                return;
            } else {
                reducedAmount = foundInput.amount;
                inputItems.splice(inputItems.indexOf(foundInput), 1);
            }
        }
        totals[ingredient.id] =
            (totals[ingredient.id] ?? 0) +
            quantity * ingredient.amount -
            reducedAmount;

        const ingredientItem = getItem(ingredient.id, items)!;
        const sum = getRecipeSum(
            ingredientItem,
            items,
            quantity * ingredient.amount - reducedAmount,
            inputItems
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
