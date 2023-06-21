import React from 'react';
import { Item } from '../../common/types';
import ItemImage from '../../common/ItemImage';

interface Props {
    item: Item;
    amount: number;
    depth: number;
    children: React.ReactNode;
}

const CalculatedRecipe = (props: Props) => {
    const { item, depth, children, amount } = props;

    let correctedAmount = amount;
    if (depth === 0) {
        correctedAmount = amount * (item.recipe.yield ?? 1);
    }

    return (
        <ul style={{ marginLeft: `${depth * 10}px` }}>
            <li className="flex">
                <ItemImage item={item} className="cursor-pointer" />
                <span className="ml-2 my-auto">
                    {correctedAmount} {item.name}
                </span>
            </li>
            <li>{children}</li>
        </ul>
    );
};

export default CalculatedRecipe;
