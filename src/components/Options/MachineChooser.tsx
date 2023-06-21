import React from 'react';
import {
    AssemblerType,
    FurnaceType,
    MachineType
} from '../../common/types/types';

interface Props {
    machineType: MachineType;
    setMachineType: (type: MachineType) => void;
}

interface WrapperProps extends Props {
    type: 'assembler' | 'furnace';
}

interface ChooserProps extends Props {
    options: AssemblerType[] | FurnaceType[];
    name: string;
}

const MachineChooser = (props: WrapperProps) => {
    const { type } = props;

    if (type === 'assembler') {
        return (
            <Chooser
                machineType={props.machineType}
                setMachineType={props.setMachineType}
                options={[
                    'assembling-machine-1',
                    'assembling-machine-2',
                    'assembling-machine-3'
                ]}
                name="Assembler Type"
            />
        );
    }
    return (
        <Chooser
            machineType={props.machineType}
            setMachineType={props.setMachineType}
            options={['stone-furnace', 'steel-furnace', 'electric-furnace']}
            name="Furnace Type"
        />
    );
};

const Chooser = (props: ChooserProps) => {
    return (
        <form
            className="assembler-chooser flex flex-col items-center"
            onClick={() => {
                props.options.forEach((option) => {
                    const check = document.getElementById(
                        `${option}-chooser`
                    ) as HTMLInputElement;

                    if (check.checked) {
                        props.setMachineType(option);
                    }
                });
            }}
        >
            <h1 className="text-xl">{props.name}</h1>
            <fieldset id="machineChooser">
                {props.options.map((option) => (
                    <Option
                        key={option}
                        type={props.machineType}
                        name={option}
                    />
                ))}
            </fieldset>
        </form>
    );
};

const Option = (props: { type: MachineType; name: MachineType }) => {
    const { name } = props;

    return (
        <span>
            <input
                type="radio"
                name="machineChooser"
                id={`${name}-chooser`}
                value={name}
                checked={props.type === name}
                onChange={() => {}}
            />
            <label htmlFor={name}>
                <img
                    className="w-10 h-10"
                    src={`../images/48px-${name.replace(/-/g, '_')}.png`}
                    alt={name}
                />
            </label>
        </span>
    );
};

export default MachineChooser;
