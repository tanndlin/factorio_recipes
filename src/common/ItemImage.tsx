import React from 'react';
import { Item } from './types';

interface Props {
    item: Item;
    className?: string;
}

const ItemImage = (props: Props) => {
    const { item, className } = props;
    const { name } = item;
    const friendlyName = name.replace(/ /g, '_');

    return (
        <img
            className={'w-12 h-12' + (className ? ' ' + className : '')}
            src={`../images/48px-${friendlyName}.png`}
            alt={name}
        />
    );
};

export default ItemImage;
