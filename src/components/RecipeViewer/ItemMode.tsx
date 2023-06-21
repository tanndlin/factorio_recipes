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
                        <ItemImage item={ingredientItem} />
                        <span className="ml-2 my-auto">
                            {amount}
                            <a
                                href={ingredientItem.wiki_link}
                                target="_blank"
                                rel="noreferrer"
                                className="ml-1 text-blue-500 hover:underline"
                            >
                                {ingredientItem.name}
                            </a>
                        </span>
                    </div>
                );
            })}
        </ul>
    );
};

export default ItemMode;
