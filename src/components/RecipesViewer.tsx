import React from 'react';
import RecipeCard from './RecipeCard';
import { Item } from '../common/types';
import DisappearingSearchBar from './DisappearingSearchBar';

interface Props {
    items: Item[];
    setCurrentItem: React.Dispatch<React.SetStateAction<Item | null>>;
}

const RecipesViewer = (props: Props) => {
    const { items, setCurrentItem } = props;
    const [searchTerm, setSearchTerm] = React.useState('');

    return (
        <div className="flex flex-col gap-2">
            <h1 className="font-bold text-4xl mb-4">Recipes</h1>
            <DisappearingSearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <div className="overflow-auto max-h-8/10screen">
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

export default RecipesViewer;
