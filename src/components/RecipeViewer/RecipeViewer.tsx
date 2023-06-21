import React from 'react';
import { Item } from '../../common/types';
import ItemMode from './ItemMode';
import RecipeMode from './RecipeMode';

interface Props {
    items: Item[];
    item: Item;
    mode: 'item' | 'recipe';
    quantity: number;
}

const RecipeViewer = (props: Props) => {
    const { items, item, mode, quantity } = props;

    return (
        <div className="mx-auto h-full overflow-hidden w-full px-16 ingredientsContainer">
            <header className="grid grid-cols-2 mb-4">
                <h1 className="text-4xl">{item.name}</h1>
                <div className="my-auto ml-auto relative">
                    <div className="background_haze" />
                </div>
            </header>

            <div className="ingredientsList">
                {mode === 'recipe' && (
                    <RecipeMode
                        item={item}
                        items={items}
                        quantity={quantity / (item.recipe.yield ?? 1)}
                        depth={0}
                    />
                )}
                {mode === 'item' && (
                    <ItemMode
                        item={item}
                        items={items}
                        quantity={quantity / (item.recipe.yield ?? 1)}
                    />
                )}
            </div>
        </div>
    );
};

export default RecipeViewer;
