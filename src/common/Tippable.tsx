import React from 'react';

type Props = {
    id: string;
    className?: string;
    tooltip: React.ReactNode;
    children: React.ReactNode;
};

const Tippable = (props: Props) => {
    React.useEffect(() => {
        let timeout: NodeJS.Timeout | null = null;
        const hoverMe = document.getElementById(props.id)!;
        const tooltip = hoverMe.querySelector('.tooltip-content')!;

        const showTooltip = () => {
            tooltip.classList.remove('hidden');
            timeout = null;
        };

        const hideTooltip = () => {
            tooltip.classList.add('hidden');
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
        };

        hoverMe.addEventListener('mouseover', () => {
            if (!timeout) {
                timeout = setTimeout(showTooltip, 1000);
            }
        });

        hoverMe.addEventListener('click', hideTooltip);
        hoverMe.addEventListener('mouseleave', hideTooltip);
    });

    return (
        <div className={'tippable ' + props.className ?? ''} id={props.id}>
            <div className="tooltip-content hidden">{props.tooltip}</div>
            {props.children}
        </div>
    );
};

export default Tippable;
