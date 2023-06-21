import React from 'react';
import { Item } from '../common/types';

interface Props {
    items: Item[];
    item: Item;
    setCurrentItem: React.Dispatch<React.SetStateAction<Item | null>>;
}

const RecipeCard = (props: Props) => {
    const { items, item, setCurrentItem } = props;
    const { recipe } = item;
    const { ingredients } = recipe;
    return (
        <div className="border-2 rounded-md p-2">
            <span className="float-left w-full">
                <h1
                    className="font-bold text-2xl mb-4 border-b-2 float-left cursor-pointer"
                    onClick={() => {
                        setCurrentItem(item);
                    }}
                >
                    {recipe.yield} {item.name}
                </h1>
            </span>
            <ul className="float-none">
                {ingredients.map((ingredient, index) => {
                    const foundItem = items.find(
                        (item) => item.id === ingredient.id
                    );

                    return (
                        <li key={index}>
                            {foundItem!.name} - {recipe.yield}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default RecipeCard;
