import React from 'react';
import { Item } from '../../common/types';

interface Props {
    item: Item;
    setCurrentItem: React.Dispatch<React.SetStateAction<Item | null>>;
}

const RecipeCard = (props: Props) => {
    const { item, setCurrentItem } = props;
    const { name } = item;
    const friendlyName = name.replace(/ /g, '_');

    return (
        <div className="rounded-md p-2 recipeCard" id={item.id}>
            <div
                className="relative recipeCard-content"
                onClick={() => setCurrentItem(item)}
            >
                <img
                    className="w-12 h-12 mx-auto"
                    src={`../images/48px-${friendlyName}.png`}
                    alt={name}
                />

                <p className="text-lg mb-4 cursor-pointer text-center">
                    {name}
                </p>
            </div>
        </div>
    );
};

export default RecipeCard;
