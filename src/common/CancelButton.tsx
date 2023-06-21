import React from 'react';

interface Props {
    className?: string;
    onClick: () => void;
}

const CloseButton = (props: Props) => {
    return (
        <input
            className={'close ' + props.className ?? ''}
            type="button"
            value="&times;"
            onClick={props.onClick}
        />
    );
};

export default CloseButton;
