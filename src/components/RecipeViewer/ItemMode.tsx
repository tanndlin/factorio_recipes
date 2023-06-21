import React from 'react';
import { Item, IOItem, AssemblerType } from '../../common/types/types';
import {
    getAssemblerCount,
    getItem,
    getRecipeSumAll
} from '../../common/CalculatorUtils';
import ItemImage from '../../common/ItemImage';

interface Props {
    inputItems: IOItem[];
    outputItems: IOItem[];
    items: Item[];
    assemblerType: AssemblerType;
}

const ItemMode = (props: Props) => {
    const { inputItems, outputItems, items, assemblerType } = props;

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
                        <span className="ml-4 my-auto flex">
                            <ItemImage
                                className="h-6 w-6"
                                item={getItem(assemblerType, items)!}
                            />
                            x
                            {getAssemblerCount(
                                ingredientItem,
                                amount,
                                assemblerType
                            )}
                        </span>
                    </div>
                );
            })}
        </ul>
    );
};

export default ItemMode;
