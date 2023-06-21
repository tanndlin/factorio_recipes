import React from 'react';
import Toggle from '../../common/Toggle';
import {
    OptionTabType,
    IOItem,
    Item,
    AssemblerType,
    MachineType,
    FurnaceType,
    OptionProps,
    RecipeMode
} from '../../common/types/types';
import TabContainer from '../../common/TabContainer';
import IOContainer from './IOContainer';
import MachineChooser from './MachineChooser';

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
        setFurnaceType
    } = optionProps;
    const [ioMode, setCurrentTab] = React.useState<OptionTabType>('output');

    const ioContainerItems: IOItem[] =
        ioMode === 'output' ? outputItems : inputItems;
    const setIoContainerItems =
        ioMode === 'output' ? setOutputItems : setInputItems;

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
                <MachineChooser
                    value={assemblerType}
                    callback={(type: MachineType) =>
                        setAssemblerType(type as AssemblerType)
                    }
                    machineType="assembler"
                />
                <MachineChooser
                    value={furnaceType}
                    callback={(type: MachineType) =>
                        setFurnaceType(type as FurnaceType)
                    }
                    machineType="furnace"
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
