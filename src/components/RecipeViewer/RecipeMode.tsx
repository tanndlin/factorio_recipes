import React from 'react';
import { getItem } from '../../common/CalculatorUtils';
import { Item, IOItem, ManufacturingTypes } from '../../common/types/types';
import CalculatedRecipe from './CalculatedRecipe';

interface BaseProps {
    inputItems: IOItem[];
    items: Item[];
    manufacturingTypes: ManufacturingTypes;
    depth?: number;
}

interface WrapperProps extends BaseProps {
    outputItems: IOItem[];
}

interface SingleProps extends BaseProps {
    item: Item;
    quantity: number;
}

const RecipeMode = (props: WrapperProps) => {
    const { inputItems, outputItems, items, depth, manufacturingTypes } = props;
    const inputItemsCopy: IOItem[] = JSON.parse(JSON.stringify(inputItems));

    return (
        <div className="hierarchy">
            {outputItems.map((outputItem) => {
                const { item, amount } = outputItem;
                const { recipe } = item;
                const { ingredients } = recipe;

                let realAmount = amount / (recipe.yield ?? 1);
                const foundItem = inputItemsCopy.find(
                    (inputItem) => inputItem.item.id === item.id
                );
                if (foundItem) {
                    if (foundItem.amount < amount) {
                        realAmount = Math.max(0, amount - foundItem.amount);
                        foundItem.amount = 0;
                    } else {
                        realAmount = 0;
                        foundItem.amount -= amount;
                    }
                }

                return (
                    <CalculatedRecipe
                        key={`${item.id}-${depth ?? 0}`}
                        item={item}
                        items={items}
                        manufacturingTypes={manufacturingTypes}
                        amount={realAmount}
                        depth={depth ? depth + 1 : 0}
                    >
                        {realAmount > 0 &&
                            ingredients.map((ingredient) => (
                                <RecipeModeSingle
                                    key={ingredient.id}
                                    item={getItem(ingredient.id, items)!}
                                    inputItems={inputItemsCopy}
                                    items={items}
                                    manufacturingTypes={manufacturingTypes}
                                    quantity={
                                        (realAmount * ingredient.amount) /
                                        (item.recipe.yield ?? 1)
                                    }
                                    depth={(depth ?? 0) + 1}
                                />
                            ))}
                    </CalculatedRecipe>
                );
            })}
        </div>
    );
};

const RecipeModeSingle = (props: SingleProps) => {
    const { item, quantity, items, depth, inputItems, manufacturingTypes } =
        props;

    let realAmount = quantity;
    const foundItem = inputItems.find(
        (inputItem) => inputItem.item.id === item.id
    );
    if (foundItem && foundItem.amount > 0) {
        if (foundItem.amount <= quantity) {
            // Return 2 CalculatedRecipes
            const foundItemAmount = +`${foundItem.amount}`;
            realAmount = Math.max(0, quantity - foundItem.amount);
            foundItem.amount = 0;
            return (
                <>
                    {/* one for the inputted items */}
                    <CalculatedRecipe
                        item={item}
                        items={items}
                        manufacturingTypes={manufacturingTypes}
                        amount={foundItemAmount}
                        depth={depth ? depth + 1 : 0}
                    />
                    {/* one for the remainder */}
                    {realAmount > 0 && (
                        <CalculatedRecipeWithIngredients
                            item={item}
                            items={items}
                            manufacturingTypes={manufacturingTypes}
                            quantity={realAmount}
                            depth={depth}
                            inputItems={inputItems}
                        />
                    )}
                </>
            );
        } else {
            foundItem.amount -= quantity;
            return (
                <CalculatedRecipe
                    item={item}
                    items={items}
                    manufacturingTypes={manufacturingTypes}
                    amount={realAmount}
                    depth={depth ? depth + 1 : 0}
                />
            );
        }
    }

    return (
        <CalculatedRecipeWithIngredients
            item={item}
            items={items}
            manufacturingTypes={manufacturingTypes}
            quantity={realAmount}
            depth={depth}
            inputItems={inputItems}
        />
    );
};

const CalculatedRecipeWithIngredients = (props: SingleProps) => {
    const { item, quantity, items, depth, inputItems, manufacturingTypes } =
        props;
    const { ingredients } = item.recipe;

    return (
        <CalculatedRecipe
            item={item}
            items={items}
            manufacturingTypes={manufacturingTypes}
            amount={quantity}
            depth={depth ? depth + 1 : 0}
        >
            {quantity > 0 &&
                ingredients.map((ingredient) => (
                    <RecipeModeSingle
                        key={`${ingredient.id}-${depth ?? 0}-sub`}
                        item={getItem(ingredient.id, items)!}
                        inputItems={inputItems}
                        items={items}
                        manufacturingTypes={manufacturingTypes}
                        quantity={
                            (quantity * ingredient.amount) /
                            (item.recipe.yield ?? 1)
                        }
                        depth={(depth ?? 0) + 1}
                    />
                ))}
        </CalculatedRecipe>
    );
};

export default RecipeMode;
