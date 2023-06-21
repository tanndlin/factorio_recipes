import { Item, IOItem, AssemblerType, FurnaceType } from './types/types';

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
        const realNeed = quantity * ingredient.amount;
        totals[ingredient.id] = (totals[ingredient.id] ?? 0) + realNeed;

        // Iterate again to get the ingredients of the ingredients
        let reducedAmount = 0;
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
            (realNeed - reducedAmount) / (ingredientItem.recipe.yield ?? 1),
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
    const ret = items.find((item) => item.id === id);
    if (!ret) {
        // eslint-disable-next-line no-console
        console.error(`Could not find item with id ${id}`);
    }

    return ret;
}

export function removeDuplicates(items: IOItem[]) {
    return items.filter(
        (item, index, self) =>
            self.findIndex((curItem) => curItem.item.id === item.item.id) ===
            index
    );
}

const getAssemblerModifier = (assemblerType: AssemblerType) => {
    switch (assemblerType) {
        case 'assembling-machine-1':
            return 0.5;
        case 'assembling-machine-2':
            return 0.75;
        case 'assembling-machine-3':
            return 1.25;
    }
};

const getFurnaceModifier = (furnaceType: FurnaceType) => {
    switch (furnaceType) {
        case 'stone-furnace':
            return 1;
        case 'steel-furnace':
            return 2;
        case 'electric-furnace':
            return 2;
    }
};

export const getAssemblerCount = (
    item: Item,
    amount: number,
    assemblerType: AssemblerType
) => {
    const time = item.recipe.time ?? 0;
    const yieldAmt = item.recipe.yield ?? 1;

    const unrounded =
        (time * (amount / yieldAmt)) / getAssemblerModifier(assemblerType);

    return Math.ceil(unrounded * 100) / 100;
};

export const getFurnaceCount = (
    item: Item,
    amount: number,
    furnaceType: FurnaceType
) => {
    const time = item.recipe.time ?? 0;
    const yieldAmt = item.recipe.yield ?? 1;

    const unrounded =
        (time * (amount / yieldAmt)) / getFurnaceModifier(furnaceType);

    return Math.ceil(unrounded * 100) / 100;
};
