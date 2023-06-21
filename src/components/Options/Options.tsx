import React from 'react';
import Toggle from '../../common/Toggle';
import { InputItem, Item, OptionTabType, OutputItem } from '../../common/types';
import TabContainer from '../../common/TabContainer';
import OutputContainer from './OutputContainer';

interface Props {
    recipeMode: 'item' | 'recipe';
    inputItems: InputItem[];
    outputItems: OutputItem[];
    setRecipeMode: React.Dispatch<React.SetStateAction<'item' | 'recipe'>>;
    setInputItems: React.Dispatch<React.SetStateAction<InputItem[]>>;
    setOutputItems: React.Dispatch<React.SetStateAction<OutputItem[]>>;
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

                {currentTab === 'output' && (
                    <OutputContainer
                        outputItems={outputItems}
                        setOutputItems={setOutputItems}
                    />
                )}
            </div>
        </div>
    );
};

export default Options;
