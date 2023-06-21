import React from 'react';
import { Item } from '../common/types';
import RecipeViewer from '../components/RecipeViewer/RecipeViewer';
import Options from '../components/Options';

interface Props {
    item: Item;
    items: Item[];
}

const BreakdownPage = (props: Props) => {
    const { item, items } = props;
    const [quantity, setQuantity] = React.useState(1);
    const [recipeMode, setRecipeMode] = React.useState<'item' | 'recipe'>(
        'item'
    );

    return (
        <main className="breakdown-container">
            <RecipeViewer
                items={items}
                item={item}
                mode={recipeMode}
                quantity={quantity}
            />
            <Options
                {...{
                    recipeMode,
                    quantity,
                    item,
                    setRecipeMode,
                    setQuantity
                }}
            />
        </main>
    );
};

export default BreakdownPage;
