import React from 'react';
import { Item, IOItem } from '../common/types/types';
import RecipeViewer from '../components/RecipeViewer/RecipeViewer';
import Options from '../components/Options/Options';
import stars from '../assets/stars.png';

interface Props {
    inputItems: IOItem[];
    outputItems: IOItem[];
    setInputItems: (items: IOItem[]) => void;
    setOutputItems: (items: IOItem[]) => void;
    items: Item[];
}

const HomePage = (props: Props) => {
    const { inputItems, outputItems, setInputItems, setOutputItems, items } =
        props;
    const [recipeMode, setRecipeMode] = React.useState<'item' | 'recipe'>(
        'item'
    );

    return (
        <main className="breakdown-container">
            <img
                src={stars}
                alt="Starry Background"
                className="absolute w-full h-full -z-[1]"
            />
            <div className="background_haze"></div>
            <RecipeViewer
                items={items}
                inputItems={inputItems}
                outputItems={outputItems}
                mode={recipeMode}
            />
            <Options
                {...{
                    items,
                    recipeMode,
                    inputItems,
                    outputItems,
                    setRecipeMode,
                    setInputItems,
                    setOutputItems
                }}
            />
        </main>
    );
};

export default HomePage;
