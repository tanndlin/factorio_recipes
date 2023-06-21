import React from 'react';
import { Item, IOItem } from '../../common/types/types';
import SingleRecipeViewWrapper from './SingleRecipeViewWrapper';

interface Props {
    items: Item[];
    mode: 'item' | 'recipe';
    inputItems: IOItem[];
    outputItems: IOItem[];
}

const RecipeViewer = (props: Props) => {
    const { items, mode, inputItems, outputItems } = props;
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
                                expandable={true}
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
                            />
                        );
                    })}
                </div>
                <div className="expanded-wrappers">
                    {expandedItems.map((outputItem) => {
                        const { item, amount } = outputItem;
                        return (
                            <SingleRecipeViewWrapper
                                expandable={true}
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
                            />
                        );
                    })}
                </div>
            </div>
            <div className="ml-auto flex-initial">
                <SingleRecipeViewWrapper
                    expandable={false}
                    items={items}
                    mode={mode}
                    inputItems={inputItems}
                    outputItems={outputItems}
                    headerName="Total"
                />
            </div>
        </div>
    );
};

export default RecipeViewer;
