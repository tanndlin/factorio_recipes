import React from 'react';
import { AssemblerType, Item } from '../../common/types/types';
import ItemImage from '../../common/ItemImage';
import { getAssemblerCount, getItem } from '../../common/CalculatorUtils';

interface Props {
    item: Item;
    items: Item[];
    amount: number;
    depth: number;
    assemblerType: AssemblerType;
    children?: React.ReactNode;
}

const CalculatedRecipe = (props: Props) => {
    const { items, item, depth, children, amount, assemblerType } = props;

    let correctedAmount = amount;
    if (depth === 0) {
        correctedAmount = amount;
    }

    return (
        <div className="ml-10 recipeChild">
            <div className="flex">
                <ItemImage item={item} />
                <span className="ml-2 my-auto">
                    {correctedAmount}
                    <a
                        href={item.wiki_link}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-1 text-blue-500 hover:underline"
                    >
                        {item.name}
                    </a>
                </span>
                <span className="ml-4 my-auto flex">
                    <ItemImage
                        className="h-6 w-6"
                        item={getItem(assemblerType, items)!}
                    />
                    x{getAssemblerCount(item, amount, assemblerType)}
                </span>
            </div>
            {React.Children.toArray(children).length > 0 && <>{children}</>}
        </div>
    );
};

export default CalculatedRecipe;
