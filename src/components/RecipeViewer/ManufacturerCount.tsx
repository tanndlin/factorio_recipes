import React from 'react';
import ItemImage from '../../common/ItemImage';
import { getItem, getManufacturerCount } from '../../common/CalculatorUtils';
import { Item, MachineType, OptionProps } from '../../common/types/types';

interface Props {
    item: Item;
    amount: number;
    options: OptionProps;
    items: Item[];
}

const ManufacturerCount = (props: Props) => {
    const { item, amount, options, items } = props;
    const { assemblerType, furnaceType } = options;
    const { category } = item;
    const typeToUse: MachineType =
        category === 'smelting' ? furnaceType : assemblerType;

    if (!category || category === 'smelting') {
        return (
            <span className="ml-4 my-auto flex">
                <ItemImage
                    className="h-6 w-6"
                    item={getItem(typeToUse, items)!}
                />
                x
                {getManufacturerCount(
                    item,
                    amount,
                    typeToUse,
                    options.timeUnit
                )}
            </span>
        );
    }

    return <></>;
};

export default ManufacturerCount;
