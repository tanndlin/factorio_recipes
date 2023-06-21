import React from 'react';
import { IOItem, Item } from '../../common/types';
import ItemImage from '../../common/ItemImage';
import CancelButton from '../../common/CancelButton';
import RecipeExplorer from '../RecipeExplorer/RecipeExplorer';
import CloseButton from '../../common/CancelButton';

interface Props {
    mode: 'input' | 'output';
    ioItems: IOItem[];
    allItems: Item[];
    setIOItems: React.Dispatch<React.SetStateAction<IOItem[]>>;
}

const IOContainer = (props: Props) => {
    const { mode, ioItems, allItems, setIOItems } = props;
    const showModal = () => {
        const modal = document.getElementById('recipeExplorerModal');
        console.log(modal);
        (modal as any)?.showModal();
    };

    const closeModal = () => {
        const modal = document.getElementById('recipeExplorerModal');
        (modal as any)?.close();
    };

    return (
        <div className="flex flex-col relative">
            <dialog id="recipeExplorerModal" className="modal">
                <CloseButton className="pr-4" onClick={() => closeModal()} />
                <RecipeExplorer
                    items={allItems}
                    onClick={(item: Item) => {
                        setIOItems([...ioItems, { item, amount: 1 }]);
                        closeModal();
                    }}
                />
            </dialog>
            <button className="mx-auto my-4" onClick={() => showModal()}>
                {mode === 'input' ? 'Add Input Item' : 'Add Output Item'}
            </button>
            <ul className="output-container">
                {ioItems.map((outputItem, index) => {
                    const { item, amount } = outputItem;

                    return (
                        <li key={index}>
                            <div className="flex py-2 relative" key={index}>
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
                                        onChange={(event) => {
                                            const newItems = [...ioItems];
                                            newItems[index].amount =
                                                +event.target.value;
                                            setIOItems(newItems);
                                        }}
                                    />
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default IOContainer;
