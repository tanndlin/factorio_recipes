import React from 'react';
import { IOItem, OptionProps } from '../../common/types/types';
import CancelButton from '../../common/CancelButton';
import ItemImage from '../../common/ItemImage';

type Props = {
    ioItem: IOItem;
    index: number;
    ioItems: IOItem[];
    setIOItems: (ioItems: IOItem[]) => void;
    options: OptionProps;
};

const IOItemViewer = (props: Props) => {
    const { ioItem, index, ioItems, setIOItems, options } = props;
    const { item, amount } = ioItem;

    return (
        <li className="flex py-2 relative">
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
                <span className="flex gap-2">
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
                    <p>{`/${options.timeUnit}`}</p>
                </span>
            </div>
        </li>
    );
};

export default IOItemViewer;
