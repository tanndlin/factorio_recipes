import React from 'react';
import { ManufacturingTypes, Item } from '../../common/types/types';
import ItemImage from '../../common/ItemImage';
import ManufacturerCount from './ManufacturerCount';

interface Props {
    item: Item;
    items: Item[];
    amount: number;
    depth: number;
    manufacturingTypes: ManufacturingTypes;
    children?: React.ReactNode;
}

const CalculatedRecipe = (props: Props) => {
    const { items, item, depth, children, amount, manufacturingTypes } = props;
    let correctedAmount = amount;
    if (depth === 0) {
        correctedAmount = amount;
    }

    return (
        <div className="ml-10 recipeChild">
            <div className="flex">
                <ItemImage item={item} />
                <span className="ml-2 my-auto">
                    {correctedAmount} {item.name}
                </span>
                <ManufacturerCount
                    item={item}
                    amount={correctedAmount}
                    manufacturingTypes={manufacturingTypes}
                    items={items}
                />
            </div>
            {React.Children.toArray(children).length > 0 && <>{children}</>}
        </div>
    );
};

export default CalculatedRecipe;
