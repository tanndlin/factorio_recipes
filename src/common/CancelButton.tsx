import React from 'react';

interface Props {
    onClick: () => void;
}

const CloseButton = (props: Props) => {
    return (
        <input
            className="close"
            type="button"
            value="&times;"
            onClick={props.onClick}
        />
    );
};

export default CloseButton;
