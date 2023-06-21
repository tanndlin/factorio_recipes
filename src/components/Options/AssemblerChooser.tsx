import React from 'react';
import { AssemblerType } from '../../common/types/types';

interface Props {
    assemblerType: AssemblerType;
    setAssemblerType: React.Dispatch<AssemblerType>;
}

const AssemblerChooser = (props: Props) => {
    return (
        <form
            className="assembler-chooser"
            onClick={() => {
                const check1 = document.getElementById(
                    'assembler1Chooser'
                ) as HTMLInputElement;
                const check2 = document.getElementById(
                    'assembler2Chooser'
                ) as HTMLInputElement;
                const check3 = document.getElementById(
                    'assembler3Chooser'
                ) as HTMLInputElement;

                if (check1.checked) {
                    props.setAssemblerType('assembling-machine-1');
                } else if (check2.checked) {
                    props.setAssemblerType('assembling-machine-2');
                } else if (check3.checked) {
                    props.setAssemblerType('assembling-machine-3');
                }
            }}
        >
            <h1 className="text-xl">Assembler Type</h1>
            <fieldset id="assemblerChooser">
                <span>
                    <input
                        type="radio"
                        name="assemblerChooser"
                        id="assembler1Chooser"
                        value="assembling-machine-1"
                    />
                    <label htmlFor="assembler 1">Assembling Machine 1</label>
                </span>
                <span>
                    <input
                        type="radio"
                        name="assemblerChooser"
                        id="assembler2Chooser"
                        value="assembling-machine-2"
                    />
                    <label htmlFor="assembler 2">Assembling Machine 2</label>
                </span>
                <span>
                    <input
                        type="radio"
                        name="assemblerChooser"
                        id="assembler3Chooser"
                        value="assembling-machine-3"
                    />
                    <label htmlFor="assembler 3">Assembling Machine 3</label>
                </span>
            </fieldset>
        </form>
    );
};

export default AssemblerChooser;
