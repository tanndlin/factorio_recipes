import React from 'react';
import { Item } from '../../common/types';

interface Props {
    item: Item;
    amount: number;
    depth: number;
    children: React.ReactNode;
}

const CalculatedRecipe = (props: Props) => {
    const { item, depth, children, amount } = props;

    return (
        <ul style={{ marginLeft: `${depth * 10}px` }}>
            <li className="flex">
                <img
                    src={`../images/32px-${item.name.replace(/ /g, '_')}.png`}
                    alt={item.name}
                />
                <span>
                    {amount} {item.name}
                </span>
            </li>
            <li>{children}</li>
        </ul>
    );
};

export default CalculatedRecipe;
