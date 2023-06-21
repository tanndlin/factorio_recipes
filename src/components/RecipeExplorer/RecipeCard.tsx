import React from 'react';
import { Item } from '../../common/types/types';
import ItemImage from '../../common/ItemImage';

interface Props {
    item: Item;
    onClick: React.Dispatch<React.SetStateAction<Item>>;
}

const RecipeCard = (props: Props) => {
    const { item, onClick } = props;
    const { name } = item;

    return (
        <div className="rounded-md p-2 recipeCard" id={item.id}>
            <div
                className="relative recipeCard-content"
                onClick={() => onClick(item)}
            >
                <ItemImage item={item} className="mx-auto" />
                <p className="text-lg mb-4 cursor-pointer text-center">
                    {name}
                </p>
            </div>
        </div>
    );
};

export default RecipeCard;
