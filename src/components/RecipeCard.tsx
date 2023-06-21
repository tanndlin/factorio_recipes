import React from 'react';
import { Item } from '../common/types';
import RecipeTitle from './RecipeTitle';
import IngredientsViewer from './IngredientsViewer';

interface Props {
    items: Item[];
    item: Item;
    setCurrentItem: React.Dispatch<React.SetStateAction<Item | null>>;
}

const RecipeCard = (props: Props) => {
    const { items, item, setCurrentItem } = props;
    const { recipe } = item;
    const { ingredients } = recipe;

    return (
        <div className="border-2 rounded-md p-2" id={item.id}>
            <RecipeTitle
                item={item}
                onClick={() => setCurrentItem(item)}
            ></RecipeTitle>
            <IngredientsViewer {...{ items, item }}></IngredientsViewer>
        </div>
    );
};

export default RecipeCard;
