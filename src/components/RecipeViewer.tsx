import React from 'react';
import { Item } from '../common/types';

interface Props {
    items: Item[];
    item: Item;
}

const RecipeViewer = (props: Props) => {
    const { items, item } = props;
    const { recipe } = item;

    const [quantity, setQuantity] = React.useState(1);

    return (
        <div className="mx-auto w-1/2">
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

            {recipe.ingredients.map((ingredient, index) => {
                const foundItem = items.find(
                    (item) => item.id === ingredient.id
                )!;

                return (
                    <div
                        key={index}
                        className="grid grid-cols-2 gap-2 border-b-2"
                    >
                        <span className="my-auto">{foundItem.name}</span>
                        <span className="my-auto ml-auto">
                            {ingredient.amount * quantity}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default RecipeViewer;
