import React from 'react';

const Header = () => {
    const currentPage = window.location.pathname;

    return (
        <div className="header flex border-b-[1px] border-gray-500 text-xl px-8 flex-initial w-full">
            <ul className="flex gap-10">
                <li
                    className={
                        'tab' + (currentPage === '/' ? ' active-tab' : '')
                    }
                >
                    <a href="/">Home</a>
                </li>
                <li
                    className={
                        'tab' +
                        (currentPage === '/recipes' ? ' active-tab' : '')
                    }
                >
                    <a href="/recipes">Recipes</a>
                </li>
            </ul>
        </div>
    );
};

export default Header;
