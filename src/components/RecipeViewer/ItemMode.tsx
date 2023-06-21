import React from 'react';
import { InputItem, Item, OutputItem } from '../../common/types';
import { getItem, getRecipeSumAll } from '../../common/CalculatorUtils';
import ItemImage from '../../common/ItemImage';

interface Props {
    inputItems: InputItem[];
    outputItems: OutputItem[];
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
