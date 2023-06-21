export interface Item {
    id: string;
    name: string;
    type?: string;
    category?: string;
    recipe: Recipe;
}

export interface Recipe {
    time: number;
    yield?: number;
    ingredients: Ingredient[];
}

export interface Ingredient {
    id: string;
    amount: number;
}

export interface IOItem {
    item: Item;
    amount: number;
}

export type OptionTabType = 'input' | 'output';
export type AssemblerType =
    | 'assembling-machine-1'
    | 'assembling-machine-2'
    | 'assembling-machine-3';
export type FurnaceType =
    | 'stone-furnace'
    | 'steel-furnace'
    | 'electric-furnace';
export type MachineType = AssemblerType | FurnaceType;

export interface ManufacturingTypes {
    assemblerType: AssemblerType;
    furnaceType: FurnaceType;
}

export enum TimeUnit {
    Second = 'second',
    Minute = 'minute',
    Hour = 'hour'
}
export enum RecipeMode {
    Item = 'item',
    Recipe = 'recipe'
}

export interface OptionProps {
    recipeMode: RecipeMode;
    setRecipeMode: (mode: RecipeMode) => void;
    assemblerType: AssemblerType;
    setAssemblerType: (type: AssemblerType) => void;
    furnaceType: FurnaceType;
    setFurnaceType: (type: FurnaceType) => void;
    timeUnit: TimeUnit;
    setTimeUnit: (unit: TimeUnit) => void;
}
