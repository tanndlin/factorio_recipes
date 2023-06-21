import React from 'react';
import RecipeExplorer from '../components/RecipeExplorer/RecipeExplorer';
import { Item } from '../common/types';
import stars from '../assets/stars.png';

interface Props {
    items: Item[];
    setCurrentItem: React.Dispatch<React.SetStateAction<Item>>;
}

const RecipesPage = (props: Props) => {
    const { items, setCurrentItem } = props;
    const [searchTerm, setSearchTerm] = React.useState('');

    return (
        <div className="relative grid grid-flow-row flex-auto">
            <img
                src={stars}
                alt="Starry Background"
                className="absolute w-full h-full -z-[1]"
            />
            <div className="background_haze"></div>
            <RecipeExplorer
                {...{
                    items,
                    setCurrentItem,
                    searchTerm,
                    setSearchTerm
                }}
            />
        </div>
    );
};

export default RecipesPage;
