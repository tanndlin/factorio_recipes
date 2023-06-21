import React from 'react';
import { InputItem, Item, OutputItem } from '../../common/types';
import ItemMode from './ItemMode';
import RecipeMode from './RecipeMode';
import SingleRecipeView from './SingleRecipeView';

interface Props {
    items: Item[];
    mode: 'item' | 'recipe';
    inputItems: InputItem[];
    outputItems: OutputItem[];
}

const RecipeViewer = (props: Props) => {
    const { items, mode, inputItems, outputItems } = props;

    return (
        <div className="mx-auto h-full overflow-hidden w-full px-16 ingredientsContainer flex">
            {outputItems.map((outputItem) => {
                const { item, amount } = outputItem;
                return (
                    <SingleRecipeView
                        key={item.name}
                        items={items}
                        mode={mode}
                        inputItems={[]}
                        outputItems={[{ item, amount }]}
                        headerName={item.name}
                    />
                );
            })}
            <div className="ml-auto">
                <SingleRecipeView
                    items={items}
                    mode={mode}
                    inputItems={inputItems}
                    outputItems={outputItems}
                    headerName="Total"
                />
            </div>
        </div>
    );
};

export default RecipeViewer;
