import React from 'react';
import Toggle from '../common/Toggle';

interface Props {
    recipeMode: 'item' | 'recipe';
    setRecipeMode: React.Dispatch<React.SetStateAction<'item' | 'recipe'>>;
}

const Options = (props: Props) => {
    return (
        <Toggle
            value={props.recipeMode === 'recipe'}
            setValue={(value) => props.setRecipeMode(value ? 'recipe' : 'item')}
            name="Recipe Mode"
            optionNames={{
                0: 'Item',
                1: 'Recipe'
            }}
        />
    );
};

export default Options;
