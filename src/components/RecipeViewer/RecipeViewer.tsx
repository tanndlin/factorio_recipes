import React from 'react';
import { Item, IOItem, AssemblerType } from '../../common/types/types';
import SingleRecipeViewWrapper from './SingleRecipeViewWrapper';
import { SingleRecipeView } from './SingleRecipeView';

interface Props {
    items: Item[];
    mode: 'item' | 'recipe';
    inputItems: IOItem[];
    outputItems: IOItem[];
    assemblerType: AssemblerType;
}

const RecipeViewer = (props: Props) => {
    const { items, mode, inputItems, outputItems, assemblerType } = props;
    const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});

    const collapsedItems = React.useMemo(() => {
        return outputItems.filter((outputItem) => {
            const { item } = outputItem;
            return !expanded[item.id];
        });
    }, [expanded, outputItems]);

    const expandedItems = React.useMemo(() => {
        return outputItems.filter((outputItem) => {
            const { item } = outputItem;
            return expanded[item.id];
        });
    }, [expanded, outputItems]);

    React.useEffect(() => {
        const newExpanded = {} as Record<string, boolean>;
        outputItems.forEach((outputItem) => {
            const { item } = outputItem;
            newExpanded[item.id] = false;
        });

        setExpanded(newExpanded);
    }, [outputItems]);

    const toggleExpanded = (item: Item) => {
        const newExpanded = {} as Record<string, boolean>;
        outputItems.forEach((outputItem) => {
            newExpanded[outputItem.item.id] = item.id === outputItem.item.id;
        });

        setExpanded(newExpanded);
    };

    return (
        <div className="ingredientsContainer flex">
            <div className="overflow-hidden flex gap-16 flex-grow">
                <div className="collapsed-wrappers">
                    {collapsedItems.map((outputItem) => {
                        const { item, amount } = outputItem;
                        return (
                            <SingleRecipeViewWrapper
                                expanded={expanded[item.id]}
                                toggleExpanded={() =>
                                    toggleExpanded(outputItem.item)
                                }
                                key={item.name}
                                items={items}
                                mode={mode}
                                inputItems={[]}
                                outputItems={[{ item, amount }]}
                                headerName={item.name}
                                assemblerType={assemblerType}
                            />
                        );
                    })}
                </div>
                <div className="expanded-wrappers">
                    {expandedItems.map((outputItem) => {
                        const { item, amount } = outputItem;
                        return (
                            <SingleRecipeViewWrapper
                                expanded={expanded[item.id]}
                                toggleExpanded={() =>
                                    toggleExpanded(outputItem.item)
                                }
                                key={item.name}
                                items={items}
                                mode={mode}
                                inputItems={[]}
                                outputItems={[{ item, amount }]}
                                headerName={item.name}
                                assemblerType={assemblerType}
                            />
                        );
                    })}
                </div>
            </div>
            <div className="ml-auto flex-initial">
                <SingleRecipeView
                    items={items}
                    mode={mode}
                    inputItems={inputItems}
                    outputItems={outputItems}
                    headerName="Total"
                    assemblerType={assemblerType}
                />
            </div>
        </div>
    );
};

export default RecipeViewer;
