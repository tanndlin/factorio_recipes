export interface Item {
    id: string;
    name: string;
    type?: string;
    wiki_link: string;
    category?: string;
    recipe: Recipe;
}

export interface Recipe {
    time?: number;
    yield?: number;
    ingredients: Ingredient[];
}

export interface Ingredient {
    id: string;
    amount: number;
}

export interface InputItem {
    item: Item;
    amount: number;
}

export interface OutputItem {
    item: Item;
    amount: number;
}

export type OptionTabType = 'input' | 'output';
