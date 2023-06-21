import React from 'react';
import { IOItem, Item } from '../../common/types';
import CancelButton from '../../common/CancelButton';
import ItemImage from '../../common/ItemImage';

interface Props {
    ioItem: IOItem;
    index: number;
    ioItems: IOItem[];
    setIOItems: (ioItems: IOItem[]) => void;
}

const IOItemViewer = (props: Props) => {
    const { ioItem, index, ioItems, setIOItems } = props;
    const { item, amount } = ioItem;

    return (
        <li key={index}>
            <div className="flex py-2 relative">
                <CancelButton
                    onClick={() => {
                        const newItems = [...ioItems];
                        newItems.splice(index, 1);
                        setIOItems(newItems);
                    }}
                />

                <ItemImage item={item} />
                <div className="flex flex-col my-auto ml-2">
                    <span className="text-xl">{item.name}</span>
                    <input
                        type="number"
                        value={amount}
                        className="px-2"
                        onChange={(e) => {
                            e.target.value = Math.max(
                                0,
                                +e.target.value
                            ).toString();

                            const newItems = [...ioItems];
                            newItems[index].amount = +e.target.value;
                            setIOItems(newItems);
                        }}
                    />
                </div>
            </div>
        </li>
    );
};

export default IOItemViewer;
