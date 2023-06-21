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

export interface ManufacturingOptions {
    assemblerType: AssemblerType;
    furnaceType: FurnaceType;
    setAssemblerType: (type: AssemblerType) => void;
    setFurnaceType: (type: FurnaceType) => void;
}
