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

    const getAssemblerCount = (item: Item, amount: number) => {
        const time = item.recipe.time ?? 0;
        const yieldAmt = item.recipe.yield ?? 1;

        const unrounded = (time * (amount / yieldAmt)) / 1.25;

        return Math.ceil(unrounded * 100) / 100;
    };
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
                        <span className="ml-4 my-auto flex">
                            <ItemImage
                                className="h-6 w-6"
                                item={getItem('assembling-machine-3', items)!}
                            />
                            x{getAssemblerCount(ingredientItem, amount)}
                        </span>
                    </div>
                );
            })}
        </ul>
    );
};

export default ItemMode;
