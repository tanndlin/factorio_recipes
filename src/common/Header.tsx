import React from 'react';

const Header = () => {
    return (
        <div className="header flex border-b-[1px] border-gray-500 text-xl px-8 flex-initial w-full">
            <ul className="flex gap-10 py-4">
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/recipes">Recipes</a>
                </li>
            </ul>
        </div>
    );
};

export default Header;
