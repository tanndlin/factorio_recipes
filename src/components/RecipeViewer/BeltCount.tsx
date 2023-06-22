import React from 'react';
import { Item, OptionProps } from '../../common/types/types';
import ItemImage from '../../common/ItemImage';
import { getBeltCount, getItem } from '../../common/CalculatorUtils';

type Props = {
    amount: number;
    options: OptionProps;
    items: Item[];
};

const BeltCount = (props: Props) => {
    const { amount, options, items } = props;
    const { beltType } = options;

    return (
        <span className="ml-4 my-auto flex">
            <ItemImage className="h-6 w-6" item={getItem(beltType, items)!} />x
            {getBeltCount(amount, beltType, options.timeUnit)}
        </span>
    );
};

export default BeltCount;