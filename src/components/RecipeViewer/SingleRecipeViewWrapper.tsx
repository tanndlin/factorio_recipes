import React from 'react';
import { SingleRecipeView, SingleRecipeViewProps } from './SingleRecipeView';

interface Props extends SingleRecipeViewProps {
    expandable: boolean;
    expanded?: boolean;
    toggleExpanded?: () => void;
}

const SingleRecipeViewWrapper = (props: Props) => {
    const { expandable, expanded, toggleExpanded } = props;
    if (!expandable) {
        return <SingleRecipeView {...props} />;
    }

    const wrapperClassName = expanded
        ? 'wrapper-expanded'
        : 'wrapper-collapsed';

    return (
        <div onClick={toggleExpanded} className={`wrapper ${wrapperClassName}`}>
            <SingleRecipeView {...props} />
        </div>
    );
};

export default SingleRecipeViewWrapper;
