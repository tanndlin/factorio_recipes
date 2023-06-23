import React from 'react';
import RecipeCard from './RecipeCard';
import { Item } from '../../common/types/types';
import DisappearingSearchBar from '../../common/DisappearingSearchBar';

type Props = {
    items: Item[];
    onClick: (item: Item) => void;
};

const RecipeExplorer = (props: Props) => {
    const { items, onClick } = props;
    const [searchTerm, setSearchTerm] = React.useState('');

    return (
        <div className="flex flex-col gap-2 max-h-full recipes-container p-10">
            <h1 className="text-4xl mb-4">Recipes</h1>
            <DisappearingSearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <div className="recipe-explorer">
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
                                item={item}
                                items={items}
                                onClick={() => {
                                    onClick(item);
                                }}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default RecipeExplorer;
