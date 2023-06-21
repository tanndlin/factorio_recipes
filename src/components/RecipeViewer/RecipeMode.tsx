import React from 'react';
import { getItem } from '../../common/CalculatorUtils';
import { Item } from '../../common/types';
import CalculatedRecipe from './CalculatedRecipe';

interface Props {
    item: Item;
    items: Item[];
    quantity: number;
    depth: number;
    setSearchTerm: (searchTerm: string) => void;
}

const RecipeMode = (props: Props) => {
    const { item, items, quantity, setSearchTerm, depth } = props;
    const { recipe } = item;
    const { ingredients } = recipe;

    console.log(item.name, depth);

    return (
        <CalculatedRecipe
            item={item}
            amount={quantity}
            depth={depth ? depth + 1 : 0}
            setSearchTerm={setSearchTerm}
        >
            {ingredients.map((ingredient) => (
                <RecipeMode
                    setSearchTerm={setSearchTerm}
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
