import React from 'react';
import AnimatedLink from './AnimatedLink';

const Header = () => {
    const [activeTab, setActiveTab] = React.useState(window.location.pathname);

    const homeClass = 'tab' + (activeTab === '/' ? ' active-tab' : '');
    const recipesClass =
        'tab' + (activeTab === '/recipes' ? ' active-tab' : '');
    const breakdownClass =
        'tab' + (activeTab === '/breakdown' ? ' active-tab' : '');

    return (
        <div className="header flex border-b-[1px] border-gray-500 text-xl px-8 flex-initial w-full">
            <ul className="flex gap-10">
                <li className={homeClass}>
                    <AnimatedLink to="/" onClick={setActiveTab}>
                        Home
                    </AnimatedLink>
                </li>
                <li className={recipesClass}>
                    <AnimatedLink to="/recipes" onClick={setActiveTab}>
                        Recipes
                    </AnimatedLink>
                </li>
                <li className={breakdownClass}>
                    <AnimatedLink to="/breakdown" onClick={setActiveTab}>
                        Breakdown
                    </AnimatedLink>
                </li>
            </ul>
        </div>
    );
};

export default Header;
