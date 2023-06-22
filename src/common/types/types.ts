export type Item = {
    id: string;
    name: string;
    type?: string;
    category?: string;
    recipe: Recipe;
};

export type Recipe = {
    time: number;
    yield?: number;
    ingredients: Ingredient[];
};

export type Ingredient = {
    id: string;
    amount: number;
};

export type IOItem = {
    item: Item;
    amount: number;
};

export type AssemblerType =
    | 'assembling-machine-1'
    | 'assembling-machine-2'
    | 'assembling-machine-3';
export type FurnaceType =
    | 'stone-furnace'
    | 'steel-furnace'
    | 'electric-furnace';
export type MachineType = AssemblerType | FurnaceType;

export type ManufacturingTypes = {
    assemblerType: AssemblerType;
    furnaceType: FurnaceType;
};

export type TimeUnit = 'sec' | 'min' | 'hr';
export enum RecipeMode {
    Item = 'item',
    Recipe = 'recipe'
}

export type BeltType =
    | 'transport-belt'
    | 'fast-transport-belt'
    | 'express-transport-belt';

export type OptionProps = {
    recipeMode: RecipeMode;
    setRecipeMode: (mode: RecipeMode) => void;
    assemblerType: AssemblerType;
    setAssemblerType: (type: AssemblerType) => void;
    furnaceType: FurnaceType;
    setFurnaceType: (type: FurnaceType) => void;
    timeUnit: TimeUnit;
    setTimeUnit: (unit: TimeUnit) => void;
    beltType: BeltType;
    setBeltType: (type: BeltType) => void;
};

export enum IOMode {
    Output = 0,
    Input = 1
}
