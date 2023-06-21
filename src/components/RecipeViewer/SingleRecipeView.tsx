import React from 'react';
import { Item, IOItem } from '../../common/types/types';
import ItemMode from './ItemMode';
import RecipeMode from './RecipeMode';

export interface SingleRecipeViewProps {
    items: Item[];
    mode: 'item' | 'recipe';
    inputItems: IOItem[];
    outputItems: IOItem[];
    headerName: string;
}

export const SingleRecipeView = (props: SingleRecipeViewProps) => {
    const { items, mode, inputItems, outputItems, headerName } = props;

    return (
        <div className="h-full overflow-auto min-w-max">
            <div>
                <header className="mb-4">
                    <h1 className="text-4xl">{headerName}</h1>
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
        </div>
    );
};
