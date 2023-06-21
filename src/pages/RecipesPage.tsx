import React from 'react';
import RecipeExplorer from '../components/RecipeExplorer/RecipeExplorer';
import RecipeViewer from '../components/RecipeViewer/RecipeViewer';
import { Item } from '../common/types';
import Options from '../components/Options';

interface Props {
    items: Item[];
}

const RecipesPage = (props: Props) => {
    const { items } = props;
    const [currentItem, setCurrentItem] = React.useState<Item | null>(items[0]);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [recipeMode, setRecipeMode] = React.useState<'item' | 'recipe'>(
        'item'
    );

    return (
        <div className="grid grid-flow-row">
            <div className="recipesContainer p-10">
                <Options
                    {...{
                        recipeMode,
                        setRecipeMode
                    }}
                />
                <RecipeExplorer
                    {...{
                        items,
                        setCurrentItem,
                        searchTerm,
                        setSearchTerm
                    }}
                />
                {currentItem && (
                    <RecipeViewer
                        items={items}
                        item={currentItem}
                        mode={recipeMode}
                        setSearchTerm={setSearchTerm}
                    />
                )}
            </div>
        </div>
    );
};

export default RecipesPage;
