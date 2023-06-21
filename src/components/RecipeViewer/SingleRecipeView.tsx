import React from 'react';
import { Item, IOItem } from '../../common/types';
import ItemMode from './ItemMode';
import RecipeMode from './RecipeMode';

interface Props {
    items: Item[];
    mode: 'item' | 'recipe';
    inputItems: IOItem[];
    outputItems: IOItem[];
    headerName: string;
}

const SingleRecipeView = (props: Props) => {
    const { items, mode, inputItems, outputItems, headerName } = props;

    return (
        <div className="h-full overflow-auto">
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

export default SingleRecipeView;
