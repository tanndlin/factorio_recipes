import React from 'react';
import { getRecipeRecurse } from '../../common/CalculatorUtils';
import { Item } from '../../common/types';

interface Props {
    item: Item;
    items: Item[];
    quantity: number;
    setSearchTerm: (searchTerm: string) => void;
}

const RecipeMode = (props: Props) => {
    const { item, items, quantity, setSearchTerm } = props;

    return <>{getRecipeRecurse(setSearchTerm, item, items, quantity, 0)}</>;
};

export default RecipeMode;
