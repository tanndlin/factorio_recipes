import React from 'react';
import { getRecipeRecurse } from '../../common/CalculatorUtils';
import { Item } from '../../common/types';

interface Props {
    item: Item;
    items: Item[];
    quantity: number;
}

const RecipeMode = (props: Props) => {
    const { item, items, quantity } = props;

    return <>{getRecipeRecurse(item, items, quantity, 0)}</>;
};

export default RecipeMode;
