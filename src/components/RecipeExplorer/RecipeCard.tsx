import React from 'react';
import IngredientsViewer from './IngredientsViewer';
import { Item } from '../../common/types';
import RecipeTitle from './RecipeTitle';

interface Props {
    item: Item;
    setCurrentItem: React.Dispatch<React.SetStateAction<Item | null>>;
}

const RecipeCard = (props: Props) => {
    const { item, setCurrentItem } = props;
    const { name } = item;
    const friendlyName = name.replace(/ /g, '_');

    return (
        <div className="border-2 rounded-md p-2 recipeCard" id={item.id}>
            <div
                className="w-full relative recipeCard-content"
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
