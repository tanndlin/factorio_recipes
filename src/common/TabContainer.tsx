import React from 'react';

type Props = {
    children: React.ReactNode[];
    className?: string;
};

const TabContainer = (props: Props) => {
    const { children } = props;
    const [activeTab, setActiveTab] = React.useState(0);

    return (
        <ul className={'tab-container ' + props.className ?? ''}>
            {children.map((child, index) => {
                const className =
                    'tab' + (activeTab === index ? ' active-tab' : '');

                return (
                    <li
                        key={index}
                        className={className}
                        onClick={() => {
                            setActiveTab(index);
                        }}
                    >
                        {child}
                    </li>
                );
            })}
        </ul>
    );
};

export default TabContainer;
