import React from 'react';
import { Item } from '../../common/types/types';
import ItemImage from '../../common/ItemImage';
import Tippable from '../../common/Tippable';
import { getItem } from '../../common/CalculatorUtils';

type Props = {
    item: Item;
    items: Item[];
    onClick: React.Dispatch<React.SetStateAction<Item>>;
};

const RecipeCard = (props: Props) => {
    const { item, items, onClick } = props;
    const { name } = item;

    return (
        <Tippable
            className="rounded-md p-2 recipeCard tippable cursor-pointer"
            id={item.id}
            tooltip={
                <div>
                    <div className="text-sm flex whitespace-nowrap min-w-max border-b-[1px] border-gray-500 pb-1 mb-2">
                        <ItemImage item={item} className="mr-2 h-6 w-6" />
                        {name} x{item.recipe.yield ?? 1}
                    </div>
                    {item.recipe.ingredients.map((ingredient, index) => {
                        const ingredientItem = getItem(ingredient.id, items)!;

                        return (
                            <div
                                key={index}
                                className="text-sm flex whitespace-nowrap min-w-max"
                            >
                                <ItemImage
                                    item={ingredientItem}
                                    className="mr-2 h-6 w-6"
                                />
                                {ingredientItem.name} x{ingredient.amount}
                            </div>
                        );
                    })}
                    <footer className="border-gray-500 border-t-[1px] pt-1 mt-2">
                        Time: {item.recipe.time ?? 0} seconds
                    </footer>
                </div>
            }
        >
            <div
                className="relative recipeCard-content"
                onClick={() => onClick(item)}
            >
                <ItemImage item={item} className="mx-auto" />
                <p className="text-lg mb-4 text-center">{name}</p>
            </div>
        </Tippable>
    );
};

export default RecipeCard;
