import React from 'react';
import { getItem } from '../../common/CalculatorUtils';
import { Item, IOItem } from '../../common/types';
import CalculatedRecipe from './CalculatedRecipe';

interface Props {
    inputItems: IOItem[];
    outputItems: IOItem[];
    items: Item[];
    depth?: number;
}

interface SingleProps {
    item: Item;
    inputItems: IOItem[];
    items: Item[];
    quantity: number;
    depth?: number;
}

const RecipeMode = (props: Props) => {
    const { inputItems, outputItems, items, depth } = props;

    const inputItemsCopy: IOItem[] = JSON.parse(JSON.stringify(inputItems));

    return (
        <div className="hierarchy">
            {outputItems.map((outputItem) => {
                const { item, amount } = outputItem;
                const { recipe } = item;
                const { ingredients } = recipe;

                let realAmount = amount;
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
                        amount={amount}
                        depth={depth ? depth + 1 : 0}
                    >
                        {realAmount > 0 &&
                            ingredients.map((ingredient) => (
                                <RecipeModeSingle
                                    key={`${ingredient.id}-${depth ?? 0}-sub`}
                                    item={getItem(ingredient.id, items)!}
                                    inputItems={inputItemsCopy}
                                    items={items}
                                    quantity={realAmount * ingredient.amount}
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
    const { item, quantity, items, depth, inputItems } = props;
    const { recipe } = item;
    const { ingredients } = recipe;

    let realAmount = quantity;
    const foundItem = inputItems.find(
        (inputItem) => inputItem.item.id === item.id
    );
    if (foundItem) {
        if (foundItem.amount < quantity) {
            realAmount = Math.max(0, quantity - foundItem.amount);
            foundItem.amount = 0;
        } else {
            realAmount = 0;
            foundItem.amount -= quantity;
        }
    }

    return (
        <CalculatedRecipe
            item={item}
            amount={quantity}
            depth={depth ? depth + 1 : 0}
        >
            {realAmount > 0 &&
                ingredients.map((ingredient) => (
                    <RecipeModeSingle
                        key={`${ingredient.id}-${depth ?? 0}-sub`}
                        item={getItem(ingredient.id, items)!}
                        inputItems={inputItems}
                        items={items}
                        quantity={realAmount * ingredient.amount}
                        depth={(depth ?? 0) + 1}
                    />
                ))}
        </CalculatedRecipe>
    );
};

export default RecipeMode;
