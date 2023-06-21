import React from 'react';
import { IOItem } from '../../common/types';
import ItemImage from '../../common/ItemImage';
import CancelButton from '../../common/CancelButton';

interface Props {
    items: IOItem[];
    setItems: React.Dispatch<React.SetStateAction<IOItem[]>>;
}

const IOContainer = (props: Props) => {
    const { items, setItems } = props;

    return (
        <ul className="output-container">
            {items.map((outputItem, index) => {
                const { item, amount } = outputItem;

                return (
                    <li key={index}>
                        <div className="flex py-2 relative" key={index}>
                            <CancelButton
                                onClick={() => {
                                    const newItems = [...items];
                                    newItems.splice(index, 1);
                                    setItems(newItems);
                                }}
                            />

                            <ItemImage item={item} />
                            <div className="flex flex-col my-auto ml-2">
                                <span className="text-xl">{item.name}</span>
                                <input
                                    type="number"
                                    value={amount}
                                    className="px-2"
                                    onChange={(event) => {
                                        const newItems = [...items];
                                        newItems[index].amount =
                                            +event.target.value;
                                        setItems(newItems);
                                    }}
                                />
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default IOContainer;
