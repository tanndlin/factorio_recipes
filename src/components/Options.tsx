import React from 'react';
import Toggle from '../common/Toggle';
import { Item } from '../common/types';

interface Props {
    recipeMode: 'item' | 'recipe';
    quantity: number;
    item: Item;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
    setRecipeMode: React.Dispatch<React.SetStateAction<'item' | 'recipe'>>;
}

const Options = (props: Props) => {
    const { recipeMode, quantity, setQuantity, setRecipeMode } = props;

    return (
        <div className="optionsContainer">
            <Toggle
                value={recipeMode === 'recipe'}
                setValue={(value) => setRecipeMode(value ? 'recipe' : 'item')}
                name="Recipe Mode"
                optionNames={{
                    0: 'Item',
                    1: 'Recipe'
                }}
            />

            <span className="justify-center flex flex-col">
                <h3 className="text-white mx-auto">Quantity</h3>
                <input
                    className="mx-auto px-2 w-20 bg-[#44474a] border-tertiary text-white"
                    type="number"
                    value={quantity}
                    onChange={(event) => {
                        setQuantity(+event.target.value);
                    }}
                ></input>
            </span>
        </div>
    );
};

export default Options;
