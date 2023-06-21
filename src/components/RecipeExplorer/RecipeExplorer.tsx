import React from 'react';
import RecipeCard from './RecipeCard';
import { Item } from '../../common/types';
import DisappearingSearchBar from '../../common/DisappearingSearchBar';
import { useNavigate } from 'react-router-dom';

interface Props {
    items: Item[];
    searchTerm: string;
    setCurrentItem: React.Dispatch<React.SetStateAction<Item>>;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const RecipeExplorer = (props: Props) => {
    const { items, searchTerm, setCurrentItem, setSearchTerm } = props;
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-2 h-full recipesContainer p-10">
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
                                item={item}
                                setCurrentItem={() => {
                                    (document as any).startViewTransition(
                                        () => {
                                            setCurrentItem(item);
                                            navigate('/breakdown');
                                        }
                                    );
                                }}
                            ></RecipeCard>
                        );
                    })}
            </div>
        </div>
    );
};

export default RecipeExplorer;
