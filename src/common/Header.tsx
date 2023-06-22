import React from 'react';
import AnimatedLink from './AnimatedLink';
import TabContainer from './TabContainer';

const Header = () => {
    const [activeTab, setActiveTab] = React.useState(0);

    return (
        <div className="header text-xl flex-initial w-full">
            <TabContainer
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                className="tab-container px-8"
            >
                <AnimatedLink to="/">Home</AnimatedLink>
                <AnimatedLink to="/recipes">Recipes</AnimatedLink>
            </TabContainer>
        </div>
    );
};

export default Header;
