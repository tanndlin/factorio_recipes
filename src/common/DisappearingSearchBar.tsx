import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/solid';
import React from 'react';

interface props {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const DisappearingSearchBar = (props: props) => {
    const { searchTerm, setSearchTerm } = props;

    return (
        <div className="searchContainer">
            <MagnifyingGlassCircleIcon />
            <input
                type="text"
                placeholder="Search"
                className="border-2 bg-[#44474a] border-tertiary px-2 rounded-lg text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
};

export default DisappearingSearchBar;
