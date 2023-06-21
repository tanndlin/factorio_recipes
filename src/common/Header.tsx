import React from 'react';

const Header = () => {
    return (
        <div className="flex border-b-4 border-tertiary font-bold text-xl px-8">
            <ul className="header flex gap-10 ml-auto">
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
