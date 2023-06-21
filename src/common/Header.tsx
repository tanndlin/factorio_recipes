import React from 'react';
import AnimatedLink from './AnimatedLink';
import TabContainer from './TabContainer';

const Header = () => {
    return (
        <div className="header text-xl flex-initial w-full">
            <TabContainer className="tab-container px-8">
                <AnimatedLink to="/">Home</AnimatedLink>
                <AnimatedLink to="/recipes">Recipes</AnimatedLink>
            </TabContainer>
        </div>
    );
};

export default Header;
