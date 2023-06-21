import React from 'react';
import Toggle from '../../common/Toggle';
import {
    OptionTabType,
    IOItem,
    Item,
    ManufacturingOptions,
    AssemblerType,
    MachineType,
    FurnaceType
} from '../../common/types/types';
import TabContainer from '../../common/TabContainer';
import IOContainer from './IOContainer';
import MachineChooser from './MachineChooser';

interface Props {
    items: Item[];
    recipeMode: 'item' | 'recipe';
    inputItems: IOItem[];
    outputItems: IOItem[];
    setRecipeMode: React.Dispatch<React.SetStateAction<'item' | 'recipe'>>;
    setInputItems: (items: IOItem[]) => void;
    setOutputItems: (items: IOItem[]) => void;
    manufacturingOptions: ManufacturingOptions;
}

const Options = (props: Props) => {
    const {
        items,
        recipeMode,
        inputItems,
        outputItems,
        setRecipeMode,
        setInputItems,
        setOutputItems,
        manufacturingOptions
    } = props;
    const { assemblerType, setAssemblerType, furnaceType, setFurnaceType } =
        manufacturingOptions;
    const [ioMode, setCurrentTab] = React.useState<OptionTabType>('output');

    const ioContainerItems: IOItem[] =
        ioMode === 'output' ? outputItems : inputItems;
    const setIoContainerItems =
        ioMode === 'output' ? setOutputItems : setInputItems;

    return (
        <div className="optionsContainer">
            <div className="topOptionsContainer">
                <Toggle
                    value={recipeMode === 'recipe'}
                    setValue={(value) => {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (document as any).startViewTransition(() => {
                            setCurrentTab('output');
                            setRecipeMode(value ? 'recipe' : 'item');
                        });
                    }}
                    name="Recipe Mode"
                    optionNames={{
                        0: 'Item',
                        1: 'Recipe'
                    }}
                />
                <MachineChooser
                    machineType={assemblerType}
                    setMachineType={(type: MachineType) =>
                        setAssemblerType(type as AssemblerType)
                    }
                    type="assembler"
                />
                <MachineChooser
                    machineType={furnaceType}
                    setMachineType={(type: MachineType) =>
                        setFurnaceType(type as FurnaceType)
                    }
                    type="furnace"
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
