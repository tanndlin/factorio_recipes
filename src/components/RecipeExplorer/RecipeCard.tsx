import React from 'react';
import IngredientsViewer from './IngredientsViewer';
import { Item } from '../../common/types';
import RecipeTitle from './RecipeTitle';

interface Props {
    items: Item[];
    item: Item;
    setCurrentItem: React.Dispatch<React.SetStateAction<Item | null>>;
}

const RecipeCard = (props: Props) => {
    const { items, item, setCurrentItem } = props;

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
