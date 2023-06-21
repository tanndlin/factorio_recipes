import React from 'react';
import { Item, IOItem, ManufacturingTypes } from '../../common/types/types';
import { getItem, getRecipeSumAll } from '../../common/CalculatorUtils';
import ItemImage from '../../common/ItemImage';
import ManufacturerCount from './ManufacturerCount';

interface Props {
    inputItems: IOItem[];
    outputItems: IOItem[];
    items: Item[];
    manufacturingTypes: ManufacturingTypes;
}

const ItemMode = (props: Props) => {
    const { inputItems, outputItems, items, manufacturingTypes } = props;
    const totals = getRecipeSumAll(inputItems, outputItems, items);

    return (
        <ul>
            {Object.keys(totals).map((id) => {
                const ingredientItem = getItem(id, items)!;
                const amount = totals[id];

                return (
                    <div className="flex py-2" key={id}>
                        <ItemImage item={ingredientItem} />
                        <span className="ml-2 my-auto">
                            {amount} {ingredientItem.name}
                        </span>
                        <ManufacturerCount
                            item={ingredientItem}
                            amount={amount}
                            manufacturingTypes={manufacturingTypes}
                            items={items}
                        />
                    </div>
                );
            })}
        </ul>
    );
};

export default ItemMode;
