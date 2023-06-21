import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Item } from '../../common/types';

interface props {
    item: Item;
    onClick: () => void;
}

const RecipeTitle = (props: props) => {
    const { item, onClick } = props;
    const { name } = item;
    const friendlyName = name.replace(/ /g, '_');
    return (
        <span className="w-full flex gap-4">
            <img
                className="w-12 h-12"
                src={`../images/48px-${friendlyName}.png`}
                alt={name}
            />
            <h1
                className="font-bold text-2xl mb-4 border-b-2 cursor-pointer"
                onClick={() => onClick()}
            >
                {name}
            </h1>
            <a
                className="ml-auto"
                href={item.wiki_link}
                target="_blank"
                rel="noreferrer"
            >
                <MagnifyingGlassIcon className="cursor-pointer w-6 h-6" />
            </a>
        </span>
    );
};

export default RecipeTitle;
