import React from 'react';

interface ChooserProps<T> {
    options: T[];
    name: string;
    value: T;
    callback: (type: T) => void;
    images: boolean;
}

export function Chooser<T>(props: ChooserProps<T>) {
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
                    <Option
                        key={option as string}
                        type={value}
                        name={option}
                        images={props.images}
                    />
                ))}
            </fieldset>
        </form>
    );
}

function Option<T>(props: { type: T; name: T; images: boolean }) {
    const { name, type, images } = props;

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
                {images && (
                    <img
                        className="w-10 h-10"
                        src={`../images/48px-${(name as string).replace(
                            /-/g,
                            '_'
                        )}.png`}
                        alt={name as string}
                    />
                )}
                {!images && (name as string)}
            </label>
        </span>
    );
}
