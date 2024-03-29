import { useNavigate } from 'react-router';
import stars from '../assets/stars.png';
import { IOItem, Item } from '../common/types/types';
import RecipeExplorer from '../components/RecipeExplorer/RecipeExplorer';

type Props = {
    items: Item[];
    outputItems: IOItem[];
    setOutputItems: (items: IOItem[]) => void;
};

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
            <div className="background-haze" />
            <RecipeExplorer
                {...{
                    items,
                    onClick: (item: Item) => {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (document as any).startViewTransition(() => {
                            setOutputItems([
                                ...outputItems,
                                {
                                    item,
                                    amount: 1
                                }
                            ]);
                            navigate('/');
                        });
                    }
                }}
            />
        </div>
    );
};

export default RecipesPage;
