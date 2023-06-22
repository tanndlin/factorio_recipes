import { Item, IOItem, MachineType, TimeUnit, BeltType } from './types/types';

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

const getModifier = (machineType: MachineType) => {
    switch (machineType) {
        case 'assembling-machine-1':
            return 0.5;
        case 'assembling-machine-2':
            return 0.75;
        case 'assembling-machine-3':
            return 1.25;
        case 'stone-furnace':
            return 1;
        case 'steel-furnace':
            return 2;
        case 'electric-furnace':
            return 2;
    }
};

export const getManufacturerCount = (
    item: Item,
    amount: number,
    machineType: MachineType,
    timeUnit: TimeUnit
) => {
    const time = item.recipe.time ?? 0;
    const yieldAmt = item.recipe.yield ?? 1;

    const unrounded =
        (time * (amount / yieldAmt)) /
        getModifier(machineType) /
        timeUnitToRatio(timeUnit);
    return Math.ceil(unrounded * 100) / 100;
};

const getBeltSpeed = (beltType: BeltType) => {
    switch (beltType) {
        case 'transport-belt':
            return 15;
        case 'fast-transport-belt':
            return 30;
        case 'express-transport-belt':
            return 45;
    }
};

export const getBeltCount = (
    amount: number,
    beltType: BeltType,
    timeUnit: TimeUnit
) => {
    const unrounded =
        amount / getBeltSpeed(beltType) / timeUnitToRatio(timeUnit);
    return Math.ceil(unrounded * 100) / 100;
};

export const calculateTimeRatio = (before: TimeUnit, after: TimeUnit) => {
    const berforeRatio = timeUnitToRatio(before);
    const afterRatio = timeUnitToRatio(after);

    return afterRatio / berforeRatio;
};

export const timeUnitToRatio = (timeUnit: TimeUnit) => {
    switch (timeUnit) {
        case 'sec':
            return 1;
        case 'min':
            return 60;
        case 'hr':
            return 3600;
    }
};
