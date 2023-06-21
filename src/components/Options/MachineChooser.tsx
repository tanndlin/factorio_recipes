import React from 'react';
import { MachineType } from '../../common/types/types';

interface MachineChooserProps<T> extends Props<T> {
    machineType: 'assembler' | 'furnace';
}

interface ChooserProps<T> extends Props<T> {
    options: T[];
    name: string;
}

interface Props<T> {
    value: T;
    callback: (type: T) => void;
}

const MachineChooser = (props: MachineChooserProps<MachineType>) => {
    const { machineType, value, callback } = props;

    if (machineType === 'assembler') {
        return (
            <Chooser<MachineType>
                value={value}
                callback={callback}
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
        <Chooser<MachineType>
            value={value}
            callback={callback}
            options={['stone-furnace', 'steel-furnace', 'electric-furnace']}
            name="Furnace Type"
        />
    );
};

function Chooser<T>(props: ChooserProps<T>) {
    const { callback, options, name, value } = props;

    React.useEffect(() => {
        options.forEach((option) => {
            const container = document.getElementById(`${option}-chooser`)!;
            const check = container.querySelector(
                'input[type="radio"]'
            ) as HTMLInputElement;

            container.addEventListener('click', () => {
                check.checked = true;
                callback(option);
            });
        });
    }, [options, value, callback]);

    return (
        <form className="assembler-chooser flex flex-col items-center">
            <h1 className="text-xl">{name}</h1>
            <fieldset id="machineChooser">
                {options.map((option) => (
                    <Option key={option as string} type={value} name={option} />
                ))}
            </fieldset>
        </form>
    );
}

function Option<T>(props: { type: T; name: T }) {
    const { name, type } = props;

    return (
        <span id={`${name}-chooser`}>
            <input
                type="radio"
                name="machineChooser"
                value={name as string}
                checked={type === name}
                onChange={() => {}}
            />
            <label htmlFor={name as string}>
                <img
                    className="w-10 h-10"
                    src={`../images/48px-${(name as string).replace(
                        /-/g,
                        '_'
                    )}.png`}
                    alt={name as string}
                />
            </label>
        </span>
    );
}

export default MachineChooser;
