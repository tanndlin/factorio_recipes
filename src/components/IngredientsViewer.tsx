import React from 'react';
import { Item } from '../common/types';

interface props {
    items: Item[];
    item: Item;
}

const IngredientsViewer = (props: props) => {
    const { items, item } = props;
    const { recipe } = item;
    const { ingredients } = recipe;

    return (
        <ul>
            {ingredients.map((ingredient, index) => {
                const foundItem = items.find(
                    (item) => item.id === ingredient.id
                )!;

                return (
                    <li key={index}>
                        <span
                            className="cursor-pointer"
                            onClick={() =>
                                document
                                    .querySelector(`#${ingredient.id}`)!
                                    .scrollIntoView({
                                        behavior: 'smooth'
                                    })
                            }
                        >
                            {foundItem.name} - {ingredient.amount}
                        </span>
                    </li>
                );
            })}
        </ul>
    );
};

export default IngredientsViewer;
