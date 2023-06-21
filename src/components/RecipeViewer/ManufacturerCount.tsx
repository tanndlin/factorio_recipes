import React from 'react';
import ItemImage from '../../common/ItemImage';
import {
    getAssemblerCount,
    getFurnaceCount,
    getItem
} from '../../common/CalculatorUtils';
import { Item, ManufacturingTypes } from '../../common/types/types';

interface Props {
    item: Item;
    amount: number;
    manufacturingTypes: ManufacturingTypes;
    items: Item[];
}

const ManufacturerCount = (props: Props) => {
    const { item, amount, manufacturingTypes, items } = props;
    const { assemblerType, furnaceType } = manufacturingTypes;

    const category = item.category;

    if (!category) {
        return (
            <span className="ml-4 my-auto flex">
                <ItemImage
                    className="h-6 w-6"
                    item={getItem(assemblerType, items)!}
                />
                x{getAssemblerCount(item, amount, assemblerType)}
            </span>
        );
    }

    switch (category) {
        case 'smelting':
            return (
                <span className="ml-4 my-auto flex">
                    <ItemImage
                        className="h-6 w-6"
                        item={getItem(furnaceType, items)!}
                    />
                    x{getFurnaceCount(item, amount, furnaceType)}
                </span>
            );

        default:
            return <> </>;
    }
};

export default ManufacturerCount;
