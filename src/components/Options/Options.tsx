import React from 'react';
import { calculateTimeRatio } from '../../common/CalculatorUtils';
import TabContainer from '../../common/TabContainer';
import Toggle from '../../common/Toggle';
import {
    AssemblerType,
    BeltType,
    FurnaceType,
    IOItem,
    IOMode,
    Item,
    OptionProps,
    RecipeMode,
    TimeUnit
} from '../../common/types/types';
import { Chooser } from './Chooser';
import IOContainer from './IOContainer';

type Props = {
    items: Item[];
    inputItems: IOItem[];
    outputItems: IOItem[];
    setInputItems: (items: IOItem[]) => void;
    setOutputItems: (items: IOItem[]) => void;
    optionProps: OptionProps;
};

const Options = (props: Props) => {
    const {
        items,
        inputItems,
        outputItems,
        setInputItems,
        setOutputItems,
        optionProps
    } = props;

    const [ioMode, setCurrentTab] = React.useState<IOMode>(IOMode.Output);

    const ioContainerItems: IOItem[] =
        ioMode === IOMode.Output ? outputItems : inputItems;
    const setIoContainerItems =
        ioMode === IOMode.Output ? setOutputItems : setInputItems;

    const handleTimeUnitChange = (value: TimeUnit) => {
        const ratio = calculateTimeRatio(optionProps.timeUnit, value);
        optionProps.setTimeUnit(value);
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
        <div className="options-container">
            <div className="top-options-container">
                <Toggle
                    value={optionProps.recipeMode === RecipeMode.Recipe}
                    setValue={(value) => {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (document as any).startViewTransition(() => {
                            optionProps.setRecipeMode(
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
                <div className="chooser-container">
                    <Chooser<AssemblerType>
                        value={optionProps.assemblerType}
                        callback={optionProps.setAssemblerType}
                        options={[
                            'assembling-machine-1',
                            'assembling-machine-2',
                            'assembling-machine-3'
                        ]}
                        name="Assembler Type"
                        images={true}
                    />
                    <Chooser<FurnaceType>
                        value={optionProps.furnaceType}
                        callback={optionProps.setFurnaceType}
                        options={[
                            'stone-furnace',
                            'steel-furnace',
                            'electric-furnace'
                        ]}
                        name="Furnace Type"
                        images={true}
                    />
                    <Chooser<BeltType>
                        value={optionProps.beltType}
                        callback={optionProps.setBeltType}
                        options={[
                            'transport-belt',
                            'fast-transport-belt',
                            'express-transport-belt'
                        ]}
                        name="Belt Type"
                        images={true}
                    />
                    <Chooser<TimeUnit>
                        value={optionProps.timeUnit}
                        callback={handleTimeUnitChange}
                        options={['sec', 'min', 'hr']}
                        name="Time Unit"
                        images={false}
                    />
                </div>
            </div>

            <div>
                <TabContainer
                    className="justify-center"
                    activeTab={ioMode}
                    setActiveTab={(index: number) => {
                        setCurrentTab(index);
                    }}
                >
                    <h1
                        onClick={() =>
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (document as any).startViewTransition(() => {
                                setCurrentTab(IOMode.Output);
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
                                setCurrentTab(IOMode.Input);
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
                    options={optionProps}
                />
            </div>
        </div>
    );
};

export default Options;
