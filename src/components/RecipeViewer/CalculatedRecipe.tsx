import React from 'react';
import { Item } from '../../common/types/types';
import ItemImage from '../../common/ItemImage';

interface Props {
    item: Item;
    amount: number;
    depth: number;
    children?: React.ReactNode;
}

const CalculatedRecipe = (props: Props) => {
    const { item, depth, children, amount } = props;

    let correctedAmount = amount;
    if (depth === 0) {
        correctedAmount = amount * (item.recipe.yield ?? 1);
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
            </div>
            {React.Children.toArray(children).length > 0 && <>{children}</>}
        </div>
    );
};

export default CalculatedRecipe;
