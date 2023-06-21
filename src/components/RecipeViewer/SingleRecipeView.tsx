import React from 'react';
import { Item, IOItem, OptionProps } from '../../common/types/types';
import ItemMode from './ItemMode';
import RecipeModeViewer from './RecipeMode';

export interface SingleRecipeViewProps {
    items: Item[];
    mode: 'item' | 'recipe';
    inputItems: IOItem[];
    outputItems: IOItem[];
    headerName: string;
    options: OptionProps;
}

export const SingleRecipeView = (props: SingleRecipeViewProps) => {
    const { items, mode, inputItems, outputItems, headerName, options } = props;

    return (
        <div className="h-full overflow-auto min-w-max pr-4">
            <div>
                <header className="mb-4">
                    <h1 className="text-4xl">{headerName}</h1>
                </header>

                <div className="ingredientsList">
                    {mode === 'recipe' && (
                        <RecipeModeViewer
                            inputItems={inputItems}
                            outputItems={outputItems}
                            items={items}
                            options={options}
                            depth={0}
                        />
                    )}
                    {mode === 'item' && (
                        <ItemMode
                            inputItems={inputItems}
                            outputItems={outputItems}
                            items={items}
                            options={options}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
