import React from 'react';
import { Item } from '../common/types';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

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
                className="w-8 h-8"
                src={`https://wiki.factorio.com/images/thumb/${friendlyName}.png/32px-${friendlyName}.png`}
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
