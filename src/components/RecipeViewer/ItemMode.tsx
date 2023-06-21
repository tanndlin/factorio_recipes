import React from 'react';
import { Item } from '../../common/types';
import { getItem, getRecipeSum } from '../../common/CalculatorUtils';

interface Props {
    item: Item;
    items: Item[];
    quantity: number;
}

const ItemMode = (props: Props) => {
    const { item, items, quantity } = props;

    const totals = getRecipeSum(item, items, quantity);

    return (
        <ul>
            {Object.keys(totals).map((id) => {
                const ingredientItem = getItem(id, items)!;
                const amount = totals[id];

                return (
                    <div className="flex py-2" key={id}>
                        <img
                            src={`../images/32px-${ingredientItem.name.replace(
                                / /g,
                                '_'
                            )}.png`}
                            alt={ingredientItem.name}
                        />
                        <span className="ml-2">
                            {amount} units of {ingredientItem.name}
                        </span>
                    </div>
                );
            })}
        </ul>
    );
};

export default ItemMode;
