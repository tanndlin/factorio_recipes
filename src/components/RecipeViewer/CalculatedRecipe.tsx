import React from 'react';
import { Item } from '../../common/types';

interface Props {
    item: Item;
    amount: number;
    depth: number;
    children: React.ReactNode;
    setSearchTerm: (searchTerm: string) => void;
}

const CalculatedRecipe = (props: Props) => {
    const { item, depth, children, amount, setSearchTerm } = props;

    let correctedAmount = amount;
    if (depth === 0) {
        correctedAmount = amount * (item.recipe.yield ?? 1);
    }

    return (
        <ul style={{ marginLeft: `${depth * 10}px` }}>
            <li className="flex">
                <img
                    className="cursor-pointer"
                    src={`../images/48px-${item.name.replace(/ /g, '_')}.png`}
                    alt={item.name}
                    onClick={() => setSearchTerm(item.name)}
                />
                <span>
                    {correctedAmount} {item.name}
                </span>
            </li>
            <li>{children}</li>
        </ul>
    );
};

export default CalculatedRecipe;
