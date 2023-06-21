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
        <div className="w-full relative">
            <img
                className="w-12 h-12 mx-auto"
                src={`../images/48px-${friendlyName}.png`}
                alt={name}
            />

            <p
                className="text-lg mb-4 cursor-pointer text-center"
                onClick={() => onClick()}
            >
                {name}
            </p>
            {/* <a
                className="absolute top-0 right-0"
                href={item.wiki_link}
                target="_blank"
                rel="noreferrer"
            >
                <MagnifyingGlassIcon className="cursor-pointer w-6 h-6" />
            </a> */}
        </div>
    );
};

export default RecipeTitle;
