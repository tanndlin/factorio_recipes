import React from 'react';
import { getItem } from '../../common/CalculatorUtils';
import { Item } from '../../common/types';
import CalculatedRecipe from './CalculatedRecipe';

interface Props {
    item: Item;
    items: Item[];
    quantity: number;
    depth: number;
}

const RecipeMode = (props: Props) => {
    const { item, items, quantity, depth } = props;
    const { recipe } = item;
    const { ingredients } = recipe;

    return (
        <CalculatedRecipe
            item={item}
            amount={quantity}
            depth={depth ? depth + 1 : 0}
        >
            {ingredients.map((ingredient) => (
                <RecipeMode
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
