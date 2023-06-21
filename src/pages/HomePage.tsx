import React from 'react';
import {
    Item,
    IOItem,
    AssemblerType,
    FurnaceType,
    TimeUnit,
    OptionProps,
    RecipeMode
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

// TODO: MOVE OPTIONS TO ITS OWN PAGE OR MODAL

const HomePage = (props: Props) => {
    const { inputItems, outputItems, setInputItems, setOutputItems, items } =
        props;
    const [recipeMode, setRecipeMode] = React.useState<RecipeMode>(
        RecipeMode.Item
    );
    const [assemblerType, setAssemblerType] = React.useState<AssemblerType>(
        (localStorage.getItem('assemblerType') as AssemblerType) ??
            'assembling-machine-3'
    );
    const [furnaceType, setFurnaceType] = React.useState<FurnaceType>(
        (localStorage.getItem('furnaceType') as FurnaceType) ?? 'stone-furnace'
    );

    const [timeUnit, setTimeUnit] = React.useState<TimeUnit>('sec');

    React.useEffect(() => {
        localStorage.setItem('assemblerType', assemblerType);
    }, [assemblerType]);

    const optionProps: OptionProps = {
        recipeMode,
        setRecipeMode,
        assemblerType,
        setAssemblerType,
        furnaceType,
        setFurnaceType,
        timeUnit,
        setTimeUnit
    };

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
                options={optionProps}
            />
            <Options
                {...{
                    items,
                    inputItems,
                    outputItems,
                    setInputItems,
                    setOutputItems,
                    optionProps
                }}
            />
        </main>
    );
};

export default HomePage;
