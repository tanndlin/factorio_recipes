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
    TimeUnit,
    BeltType
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

    const [ioMode, setCurrentTab] = React.useState<OptionTabType>('output');

    const ioContainerItems: IOItem[] =
        ioMode === 'output' ? outputItems : inputItems;
    const setIoContainerItems =
        ioMode === 'output' ? setOutputItems : setInputItems;

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
        <div className="optionsContainer">
            <div className="topOptionsContainer">
                <Toggle
                    value={optionProps.recipeMode === RecipeMode.Recipe}
                    setValue={(value) => {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (document as any).startViewTransition(() => {
                            setCurrentTab('output');
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
                <Chooser<TimeUnit>
                    value={optionProps.timeUnit}
                    callback={handleTimeUnitChange}
                    options={['sec', 'min', 'hr']}
                    name="Time Unit"
                    images={false}
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
                    options={optionProps}
                />
            </div>
        </div>
    );
};

export default Options;
