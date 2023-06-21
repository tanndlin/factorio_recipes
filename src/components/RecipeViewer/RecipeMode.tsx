import React from 'react';
import { getItem } from '../../common/CalculatorUtils';
import { InputItem, Item, OutputItem } from '../../common/types';
import CalculatedRecipe from './CalculatedRecipe';

interface Props {
    inputItems: InputItem[];
    outputItems: OutputItem[];
    items: Item[];
    depth?: number;
}

interface SingleProps {
    item: Item;
    items: Item[];
    quantity: number;
    depth?: number;
}

const RecipeMode = (props: Props) => {
    const { inputItems, outputItems, items, depth } = props;

    return (
        <>
            {outputItems.map((outputItem) => {
                const { item, amount } = outputItem;
                const { recipe } = item;
                const { ingredients } = recipe;

                return (
                    <CalculatedRecipe
                        item={item}
                        amount={amount}
                        depth={depth ? depth + 1 : 0}
                    >
                        {ingredients.map((ingredient) => (
                            <RecipeModeSingle
                                item={getItem(ingredient.id, items)!}
                                items={items}
                                quantity={amount * ingredient.amount}
                                depth={(depth ?? 0) + 1}
                            />
                        ))}
                    </CalculatedRecipe>
                );
            })}
        </>
    );
};

const RecipeModeSingle = (props: SingleProps) => {
    const { item, quantity, items, depth } = props;
    const { recipe } = item;
    const { ingredients } = recipe;

    return (
        <CalculatedRecipe
            item={item}
            amount={quantity}
            depth={depth ? depth + 1 : 0}
        >
            {ingredients.map((ingredient) => (
                <RecipeModeSingle
                    item={getItem(ingredient.id, items)!}
                    items={items}
                    quantity={quantity * ingredient.amount}
                    depth={(depth ?? 0) + 1}
                />
            ))}
        </CalculatedRecipe>
    );
};

export default RecipeMode;
