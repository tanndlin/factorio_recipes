import { getItem } from '../../common/CalculatorUtils';
import { IOItem, Item, OptionProps } from '../../common/types/types';
import CalculatedRecipe from './CalculatedRecipe';

type BaseProps = {
    inputItems: IOItem[];
    items: Item[];
    options: OptionProps;
    depth?: number;
};

type WrapperProps = BaseProps & {
    outputItems: IOItem[];
};

type SingleProps = BaseProps & {
    item: Item;
    quantity: number;
};

const RecipeModeViewer = (props: WrapperProps) => {
    const { inputItems, outputItems, items, depth, options } = props;
    const inputItemsCopy: IOItem[] = JSON.parse(JSON.stringify(inputItems));

    return (
        <div className="hierarchy">
            {outputItems.map((outputItem) => {
                const { item, amount } = outputItem;
                const { recipe } = item;
                const { ingredients } = recipe;

                let realAmount = amount / (recipe.yield ?? 1);
                const foundItem = inputItemsCopy.find(
                    (inputItem) => inputItem.item.id === item.id
                );
                if (foundItem) {
                    if (foundItem.amount < amount) {
                        realAmount = Math.max(0, amount - foundItem.amount);
                        foundItem.amount = 0;
                    } else {
                        realAmount = 0;
                        foundItem.amount -= amount;
                    }
                }

                return (
                    <CalculatedRecipe
                        key={`${item.id}-${depth ?? 0}`}
                        item={item}
                        items={items}
                        options={options}
                        amount={realAmount}
                        depth={depth ? depth + 1 : 0}
                    >
                        {realAmount > 0 &&
                            ingredients.map((ingredient) => (
                                <RecipeModeViewerSingle
                                    key={ingredient.id}
                                    item={getItem(ingredient.id, items)!}
                                    inputItems={inputItemsCopy}
                                    items={items}
                                    options={options}
                                    quantity={
                                        (realAmount * ingredient.amount) /
                                        (item.recipe.yield ?? 1)
                                    }
                                    depth={(depth ?? 0) + 1}
                                />
                            ))}
                    </CalculatedRecipe>
                );
            })}
        </div>
    );
};

const RecipeModeViewerSingle = (props: SingleProps) => {
    const { item, quantity, items, depth, inputItems, options } = props;

    let realAmount = quantity;
    const foundItem = inputItems.find(
        (inputItem) => inputItem.item.id === item.id
    );
    if (foundItem && foundItem.amount > 0) {
        if (foundItem.amount <= quantity) {
            // Return 2 CalculatedRecipes
            const foundItemAmount = +`${foundItem.amount}`;
            realAmount = Math.max(0, quantity - foundItem.amount);
            foundItem.amount = 0;
            return (
                <>
                    {/* one for the inputted items */}
                    <CalculatedRecipe
                        item={item}
                        items={items}
                        options={options}
                        amount={foundItemAmount}
                        depth={depth ? depth + 1 : 0}
                    />
                    {/* one for the remainder */}
                    {realAmount > 0 && (
                        <CalculatedRecipeWithIngredients
                            item={item}
                            items={items}
                            options={options}
                            quantity={realAmount}
                            depth={depth}
                            inputItems={inputItems}
                        />
                    )}
                </>
            );
        } else {
            foundItem.amount -= quantity;
            return (
                <CalculatedRecipe
                    item={item}
                    items={items}
                    options={options}
                    amount={realAmount}
                    depth={depth ? depth + 1 : 0}
                />
            );
        }
    }

    return (
        <CalculatedRecipeWithIngredients
            item={item}
            items={items}
            options={options}
            quantity={realAmount}
            depth={depth}
            inputItems={inputItems}
        />
    );
};

const CalculatedRecipeWithIngredients = (props: SingleProps) => {
    const { item, quantity, items, depth, inputItems, options } = props;
    const { ingredients } = item.recipe;

    return (
        <CalculatedRecipe
            item={item}
            items={items}
            options={options}
            amount={quantity}
            depth={depth ? depth + 1 : 0}
        >
            {quantity > 0 &&
                ingredients.map((ingredient) => (
                    <RecipeModeViewerSingle
                        key={`${ingredient.id}-${depth ?? 0}-sub`}
                        item={getItem(ingredient.id, items)!}
                        inputItems={inputItems}
                        items={items}
                        options={options}
                        quantity={
                            (quantity * ingredient.amount) /
                            (item.recipe.yield ?? 1)
                        }
                        depth={(depth ?? 0) + 1}
                    />
                ))}
        </CalculatedRecipe>
    );
};

export default RecipeModeViewer;
