import React from 'react';
import Toggle from '../../common/Toggle';
import {
    OptionTabType,
    IOItem,
    Item,
    AssemblerType,
    FurnaceType,
    OptionProps,
    RecipeMode,
    TimeUnit
} from '../../common/types/types';
import TabContainer from '../../common/TabContainer';
import IOContainer from './IOContainer';
import { Chooser } from './Chooser';
import { calculateTimeRatio } from '../../common/CalculatorUtils';

interface Props {
    items: Item[];
    inputItems: IOItem[];
    outputItems: IOItem[];
    setInputItems: (items: IOItem[]) => void;
    setOutputItems: (items: IOItem[]) => void;
    optionProps: OptionProps;
}

const Options = (props: Props) => {
    const {
        items,
        inputItems,
        outputItems,
        setInputItems,
        setOutputItems,
        optionProps
    } = props;
    const {
        recipeMode,
        setRecipeMode,
        assemblerType,
        setAssemblerType,
        furnaceType,
        setFurnaceType,
        timeUnit,
        setTimeUnit
    } = optionProps;
    const [ioMode, setCurrentTab] = React.useState<OptionTabType>('output');

    const ioContainerItems: IOItem[] =
        ioMode === 'output' ? outputItems : inputItems;
    const setIoContainerItems =
        ioMode === 'output' ? setOutputItems : setInputItems;

    const handleTimeUnitChange = (value: TimeUnit) => {
        const ratio = calculateTimeRatio(timeUnit, value);
        setTimeUnit(value);
        setInputItems(
            inputItems.map((item) => ({
                ...item,
                amount: item.amount * ratio
            }))
        );
        setOutputItems(
            outputItems.map((item) => ({
                ...item,
                amount: item.amount * ratio
            }))
        );
    };

    return (
        <div className="optionsContainer">
            <div className="topOptionsContainer">
                <Toggle
                    value={recipeMode === RecipeMode.Recipe}
                    setValue={(value) => {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (document as any).startViewTransition(() => {
                            setCurrentTab('output');
                            setRecipeMode(
                                value ? RecipeMode.Recipe : RecipeMode.Item
                            );
                        });
                    }}
                    name="Recipe Mode"
                    optionNames={{
                        0: 'Item',
                        1: 'Recipe'
                    }}
                />
                <Chooser<AssemblerType>
                    value={assemblerType}
                    callback={setAssemblerType}
                    options={[
                        'assembling-machine-1',
                        'assembling-machine-2',
                        'assembling-machine-3'
                    ]}
                    name="Assembler Type"
                    images={true}
                />
                <Chooser<FurnaceType>
                    value={furnaceType}
                    callback={setFurnaceType}
                    options={[
                        'stone-furnace',
                        'steel-furnace',
                        'electric-furnace'
                    ]}
                    name="Furnace Type"
                    images={true}
                />
                <Chooser<TimeUnit>
                    value={timeUnit}
                    callback={handleTimeUnitChange}
                    options={['s', 'm', 'h']}
                    name="Time Unit"
                    images={false}
                />
            </div>

            <div>
                <TabContainer className="justify-center">
                    <h1
                        onClick={() =>
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (document as any).startViewTransition(() => {
                                setCurrentTab('output');
                            })
                        }
                        className="text-xl"
                    >
                        Output
                    </h1>
                    <h1
                        onClick={() =>
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (document as any).startViewTransition(() => {
                                setCurrentTab('input');
                            })
                        }
                        className="text-xl"
                    >
                        Input
                    </h1>
                </TabContainer>

                <IOContainer
                    mode={ioMode}
                    ioItems={ioContainerItems}
                    allItems={items}
                    setIOItems={setIoContainerItems}
                />
            </div>
        </div>
    );
};

export default Options;
