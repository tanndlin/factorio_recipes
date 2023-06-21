import React from 'react';
import { IOItem, Item } from '../../common/types/types';
import RecipeExplorer from '../RecipeExplorer/RecipeExplorer';
import CloseButton from '../../common/CancelButton';
import IOItemViewer from './IOItemViewer';

interface Props {
    mode: 'input' | 'output';
    ioItems: IOItem[];
    allItems: Item[];
    setIOItems: (items: IOItem[]) => void;
}

const IOContainer = (props: Props) => {
    const { mode, ioItems, allItems, setIOItems } = props;
    const showModal = () => {
        const modal = document.getElementById('recipeExplorerModal');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (modal as any)?.showModal();
    };

    const closeModal = () => {
        const modal = document.getElementById('recipeExplorerModal');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                {ioItems.map((outputItem, index) => (
                    <IOItemViewer
                        key={index}
                        ioItem={outputItem}
                        index={index}
                        ioItems={ioItems}
                        setIOItems={setIOItems}
                    />
                ))}
            </ul>
        </div>
    );
};

export default IOContainer;
