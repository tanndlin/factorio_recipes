import React from 'react';
import stars from '../assets/stars.png';
import {
    AssemblerType,
    BeltType,
    FurnaceType,
    IOItem,
    Item,
    OptionProps,
    RecipeMode,
    TimeUnit
} from '../common/types/types';
import Options from '../components/Options/Options';
import RecipeViewer from '../components/RecipeViewer/RecipeViewer';

type Props = {
    inputItems: IOItem[];
    outputItems: IOItem[];
    setInputItems: (items: IOItem[]) => void;
    setOutputItems: (items: IOItem[]) => void;
    items: Item[];
};

// TODO: MOVE OPTIONS TO ITS OWN PAGE OR MODAL
// TODO: SHOW HOW MANY MINERS ARE NEEDED FOR INPUTS AND OUTPUTS

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

    const [beltType, setBeltType] = React.useState(
        (localStorage.getItem('beltType') as BeltType) ?? 'transport-belt'
    );

    React.useEffect(() => {
        localStorage.setItem('assemblerType', assemblerType);
    }, [assemblerType]);
    React.useEffect(() => {
        localStorage.setItem('furnaceType', furnaceType);
    }, [furnaceType]);
    React.useEffect(() => {
        localStorage.setItem('beltType', beltType);
    }, [beltType]);

    const optionProps: OptionProps = {
        recipeMode,
        setRecipeMode,
        assemblerType,
        setAssemblerType,
        furnaceType,
        setFurnaceType,
        timeUnit,
        setTimeUnit,
        beltType,
        setBeltType
    };

    return (
        <main className="breakdown-container">
            <img
                src={stars}
                alt="Starry Background"
                className="absolute w-full h-full -z-[1]"
            />
            <div className="background-haze" />
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
