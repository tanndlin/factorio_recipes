import React from 'react';
import { Item } from '../../common/types';
import ItemMode from './ItemMode';
import RecipeMode from './RecipeMode';

interface Props {
    items: Item[];
    item: Item;
    mode: 'item' | 'recipe';
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const RecipeViewer = (props: Props) => {
    const { items, item, mode, setSearchTerm } = props;
    const [quantity, setQuantity] = React.useState(1);

    return (
        <div className="mx-auto">
            <header className="grid grid-cols-2 mb-4">
                <h1 className="font-bold text-4xl">{item.name}</h1>
                <div className="my-auto ml-auto">
                    <input
                        className="px-2 w-20"
                        type="number"
                        value={quantity}
                        onChange={(event) => {
                            setQuantity(+event.target.value);
                        }}
                    ></input>
                </div>
            </header>
            {mode === 'recipe' && (
                <RecipeMode
                    item={item}
                    items={items}
                    quantity={quantity / (item.recipe.yield ?? 1)}
                    setSearchTerm={setSearchTerm}
                />
            )}
            {mode === 'item' && (
                <ItemMode
                    item={item}
                    items={items}
                    quantity={quantity / (item.recipe.yield ?? 1)}
                    setSearchTerm={setSearchTerm}
                />
            )}
        </div>
    );
};

export default RecipeViewer;
