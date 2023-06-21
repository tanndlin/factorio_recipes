import React from 'react';
import { OutputItem } from '../../common/types';
import ItemImage from '../../common/ItemImage';

interface Props {
    outputItems: OutputItem[];
    setOutputItems: React.Dispatch<React.SetStateAction<OutputItem[]>>;
}

const OutputContainer = (props: Props) => {
    const { outputItems, setOutputItems } = props;

    return (
        <ul className="output-container">
            {outputItems.map((outputItem, index) => {
                const { item, amount } = outputItem;

                return (
                    <li key={index}>
                        <div className="flex py-2" key={index}>
                            <ItemImage item={item} />
                            <div className="flex flex-col my-auto ml-2">
                                <span className="text-xl">{item.name}</span>
                                <input
                                    type="number"
                                    value={amount}
                                    className="px-2"
                                    onChange={(event) => {
                                        const newOutputItems = [...outputItems];
                                        newOutputItems[index].amount =
                                            +event.target.value;
                                        setOutputItems(newOutputItems);
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

export default OutputContainer;
