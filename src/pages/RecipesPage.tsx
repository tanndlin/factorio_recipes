import React from 'react';
import RecipeExplorer from '../components/RecipeExplorer/RecipeExplorer';
import { Item, OutputItem } from '../common/types';
import stars from '../assets/stars.png';
import { useNavigate } from 'react-router';

interface Props {
    outputItems: OutputItem[];
    setOutputItems: React.Dispatch<React.SetStateAction<OutputItem[]>>;
    items: Item[];
}

const RecipesPage = (props: Props) => {
    const { outputItems, setOutputItems, items } = props;
    const navigate = useNavigate();

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
                    onClick: (item: Item) => {
                        (document as any).startViewTransition(() => {
                            setOutputItems([
                                ...outputItems,
                                {
                                    item,
                                    amount: 1
                                }
                            ]);
                            navigate('/breakdown');
                        });
                    }
                }}
            />
        </div>
    );
};

export default RecipesPage;
