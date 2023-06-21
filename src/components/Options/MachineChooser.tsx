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
    const { type, machineType, setMachineType } = props;

    if (type === 'assembler') {
        return (
            <Chooser
                machineType={machineType}
                setMachineType={setMachineType}
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
            machineType={machineType}
            setMachineType={setMachineType}
            options={['stone-furnace', 'steel-furnace', 'electric-furnace']}
            name="Furnace Type"
        />
    );
};

const Chooser = (props: ChooserProps) => {
    const { setMachineType, options, name, machineType } = props;

    React.useEffect(() => {
        options.forEach((option) => {
            const container = document.getElementById(`${option}-chooser`)!;
            const check = container.querySelector(
                'input[type="radio"]'
            ) as HTMLInputElement;

            container.addEventListener('click', () => {
                check.checked = true;
                setMachineType(option);
            });
        });
    }, [options, machineType, setMachineType]);

    return (
        <form className="assembler-chooser flex flex-col items-center">
            <h1 className="text-xl">{name}</h1>
            <fieldset id="machineChooser">
                {options.map((option) => (
                    <Option key={option} type={machineType} name={option} />
                ))}
            </fieldset>
        </form>
    );
};

const Option = (props: { type: MachineType; name: MachineType }) => {
    const { name, type } = props;

    return (
        <span id={`${name}-chooser`}>
            <input
                type="radio"
                name="machineChooser"
                value={name}
                checked={type === name}
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
