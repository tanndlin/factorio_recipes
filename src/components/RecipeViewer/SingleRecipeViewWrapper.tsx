import React from 'react';
import { SingleRecipeView, SingleRecipeViewProps } from './SingleRecipeView';

type Props = SingleRecipeViewProps & {
    expanded: boolean;
    toggleExpanded?: () => void;
};

const SingleRecipeViewWrapper = (props: Props) => {
    const { expanded, toggleExpanded } = props;

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
