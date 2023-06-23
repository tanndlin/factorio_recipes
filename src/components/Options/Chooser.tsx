type ChooserProps<T> = {
    options: T[];
    name: string;
    value: T;
    callback: (...args: T[]) => void;
    images: boolean;
};

export function Chooser<T>(props: ChooserProps<T>) {
    const { callback, options, name, value } = props;

    return (
        <form className="chooser flex flex-col items-center">
            <h1 className="text-xl">{name}</h1>
            <fieldset id="machineChooser">
                {options.map((option) => (
                    <Option
                        onClick={() => {
                            callback(option);
                        }}
                        key={option as string}
                        type={value}
                        name={option}
                        showImages={props.images}
                    />
                ))}
            </fieldset>
        </form>
    );
}

type OptionProps<T> = {
    type: T;
    name: T;
    showImages: boolean;
    onClick: () => void;
};

function Option<T>(props: OptionProps<T>) {
    const { name, type, showImages } = props;

    return (
        <span onClick={props.onClick}>
            <input
                type="radio"
                name="machineChooser"
                value={name as string}
                checked={type === name}
                onChange={() => {}}
            />
            <label htmlFor={name as string}>
                {showImages && (
                    <img
                        className="w-10 h-10"
                        src={`../images/48px-${(name as string).replace(
                            /-/g,
                            '_'
                        )}.png`}
                        alt={name as string}
                    />
                )}
                {!showImages && (name as string)}
            </label>
        </span>
    );
}
