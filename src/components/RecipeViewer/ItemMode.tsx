import React from 'react';
import { Item, IOItem } from '../../common/types/types';
import { getItem, getRecipeSumAll } from '../../common/CalculatorUtils';
import ItemImage from '../../common/ItemImage';

interface Props {
    inputItems: IOItem[];
    outputItems: IOItem[];
    items: Item[];
}

const ItemMode = (props: Props) => {
    const { inputItems, outputItems, items } = props;

    const totals = getRecipeSumAll(inputItems, outputItems, items);

    return (
        <ul>
            {Object.keys(totals).map((id) => {
                const ingredientItem = getItem(id, items)!;
                const amount = totals[id];

                return (
                    <div className="flex py-2" key={id}>
                        <ItemImage
                            item={ingredientItem}
                            className="cursor-pointer"
                        />
                        <span className="ml-2 my-auto">
                            {amount} units of {ingredientItem.name}
                        </span>
                    </div>
                );
            })}
        </ul>
    );
};

export default ItemMode;
