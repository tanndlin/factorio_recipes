import React from 'react';
import Toggle from '../../common/Toggle';
import { OptionTabType, IOItem } from '../../common/types';
import TabContainer from '../../common/TabContainer';
import IOContainer from './IOContainer';

interface Props {
    recipeMode: 'item' | 'recipe';
    inputItems: IOItem[];
    outputItems: IOItem[];
    setRecipeMode: React.Dispatch<React.SetStateAction<'item' | 'recipe'>>;
    setInputItems: React.Dispatch<React.SetStateAction<IOItem[]>>;
    setOutputItems: React.Dispatch<React.SetStateAction<IOItem[]>>;
}

const Options = (props: Props) => {
    const {
        recipeMode,
        inputItems,
        outputItems,
        setRecipeMode,
        setInputItems,
        setOutputItems
    } = props;
    const [currentTab, setCurrentTab] = React.useState<OptionTabType>('output');

    const ioContainerItems: IOItem[] =
        currentTab === 'output' ? outputItems : inputItems;
    const setIoContainerItems =
        currentTab === 'output' ? setOutputItems : setInputItems;

    return (
        <div className="optionsContainer">
            <Toggle
                value={recipeMode === 'recipe'}
                setValue={(value) => setRecipeMode(value ? 'recipe' : 'item')}
                name="Recipe Mode"
                optionNames={{
                    0: 'Item',
                    1: 'Recipe'
                }}
            />

            <div>
                <TabContainer className="justify-center">
                    <h1
                        onClick={() => setCurrentTab('output')}
                        className="text-xl"
                    >
                        Output
                    </h1>
                    <h1
                        onClick={() => setCurrentTab('input')}
                        className="text-xl"
                    >
                        Input
                    </h1>
                </TabContainer>

                <IOContainer
                    items={ioContainerItems}
                    setItems={setIoContainerItems}
                />
            </div>
        </div>
    );
};

export default Options;
