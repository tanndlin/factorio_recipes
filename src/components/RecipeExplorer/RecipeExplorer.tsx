import React from 'react';
import RecipeCard from './RecipeCard';
import { Item } from '../../common/types';
import DisappearingSearchBar from '../../common/DisappearingSearchBar';

interface Props {
    items: Item[];
    setCurrentItem: React.Dispatch<React.SetStateAction<Item | null>>;
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const RecipeExplorer = (props: Props) => {
    const { items, setCurrentItem, searchTerm, setSearchTerm } = props;

    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-4xl mb-4">Recipes</h1>
            <DisappearingSearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <div className="recipeExplorer">
                {items
                    .filter((item) =>
                        item.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                    )
                    .map((item, index) => {
                        return (
                            <RecipeCard
                                key={index}
                                {...{ items, item, setCurrentItem }}
                            ></RecipeCard>
                        );
                    })}
            </div>
        </div>
    );
};

export default RecipeExplorer;
