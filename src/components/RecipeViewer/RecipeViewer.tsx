import React from 'react';
import { InputItem, Item, OutputItem } from '../../common/types';
import ItemMode from './ItemMode';
import RecipeMode from './RecipeMode';

interface Props {
    items: Item[];
    mode: 'item' | 'recipe';
    inputItems: InputItem[];
    outputItems: OutputItem[];
}

const RecipeViewer = (props: Props) => {
    const { items, mode, inputItems, outputItems } = props;

    return (
        <div className="mx-auto h-full overflow-hidden w-full px-16 ingredientsContainer">
            <header className="grid grid-cols-2 mb-4">
                {/* <h1 className="text-4xl">{item.name}</h1> */}
                <div className="my-auto ml-auto relative">
                    <div className="background_haze" />
                </div>
            </header>

            <div className="ingredientsList">
                {mode === 'recipe' && (
                    <RecipeMode
                        inputItems={inputItems}
                        outputItems={outputItems}
                        items={items}
                        depth={0}
                    />
                )}
                {mode === 'item' && (
                    <ItemMode
                        inputItems={inputItems}
                        outputItems={outputItems}
                        items={items}
                    />
                )}
            </div>
        </div>
    );
};

export default RecipeViewer;
