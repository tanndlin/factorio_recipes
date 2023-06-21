import React from 'react';
import RecipesViewer from '../components/RecipesViewer';
import RecipeViewer from '../components/RecipeViewer';
import { Item } from '../common/types';

interface Props {
    items: Item[];
}

const RecipesPage = (props: Props) => {
    const { items } = props;
    const [currentItem, setCurrentItem] = React.useState<Item | null>(items[0]);

    return (
        <div className="grid grid-flow-row">
            <div className="recipesContainer p-10">
                <div></div>
                <RecipesViewer
                    {...{
                        items,
                        setCurrentItem
                    }}
                />
                {currentItem && (
                    <RecipeViewer items={items} item={currentItem} />
                )}
            </div>
        </div>
    );
};

export default RecipesPage;
