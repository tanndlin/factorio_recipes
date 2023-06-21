import React from 'react';
import {
    Item,
    IOItem,
    AssemblerType,
    FurnaceType
} from '../common/types/types';
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
    const [assemblerType, setAssemblerType] = React.useState<AssemblerType>(
        (localStorage.getItem('assemblerType') as AssemblerType) ??
            'assembling-machine-3'
    );
    const [furnaceType, setfurnaceType] = React.useState<FurnaceType>(
        (localStorage.getItem('furnaceType') as FurnaceType) ?? 'stone-furnace'
    );

    React.useEffect(() => {
        localStorage.setItem('assemblerType', assemblerType);
    }, [assemblerType]);

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
                manufacturingTypes={{
                    assemblerType,
                    furnaceType
                }}
            />
            <Options
                {...{
                    items,
                    recipeMode,
                    inputItems,
                    outputItems,
                    setRecipeMode,
                    setInputItems,
                    setOutputItems,
                    manufacturingOptions: {
                        assemblerType,
                        setAssemblerType,
                        furnaceType,
                        setFurnaceType: setfurnaceType
                    }
                }}
            />
        </main>
    );
};

export default HomePage;
