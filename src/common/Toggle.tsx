import React from 'react';

interface Props {
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
    name: string;
    optionNames: { [key: number]: string };
}

const Toggle = (props: Props) => {
    const { value, setValue, name, optionNames } = props;

    return (
        <div className="flex flex-col">
            <label className="text-center text-xl mb-2">{name}</label>
            {optionNames && (
                <h2 className="mx-auto mb-4">{optionNames[value ? 1 : 0]}</h2>
            )}
            <div
                className="mx-auto bg-secondary relative w-20 h-10 rounded-full border-2 border-tertiary"
                onClick={() => {
                    setValue(!value);
                }}
            >
                <button
                    className={`indicator indicator-${value} bg-tertiary rounded-full`}
                ></button>
            </div>
        </div>
    );
};

export default Toggle;
