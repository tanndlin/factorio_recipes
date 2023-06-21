import React from 'react';
import { Item, IOItem, ManufacturingTypes } from '../../common/types/types';
import ItemMode from './ItemMode';
import RecipeMode from './RecipeMode';

export interface SingleRecipeViewProps {
    items: Item[];
    mode: 'item' | 'recipe';
    inputItems: IOItem[];
    outputItems: IOItem[];
    headerName: string;
    manufacturingTypes: ManufacturingTypes;
}

export const SingleRecipeView = (props: SingleRecipeViewProps) => {
    const {
        items,
        mode,
        inputItems,
        outputItems,
        headerName,
        manufacturingTypes
    } = props;

    return (
        <div className="h-full overflow-auto min-w-max pr-4">
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
                            manufacturingTypes={manufacturingTypes}
                            depth={0}
                        />
                    )}
                    {mode === 'item' && (
                        <ItemMode
                            inputItems={inputItems}
                            outputItems={outputItems}
                            items={items}
                            manufacturingTypes={manufacturingTypes}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
