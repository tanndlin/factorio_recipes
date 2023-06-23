import { getBeltCount, getItem } from '../../common/CalculatorUtils';
import ItemImage from '../../common/ItemImage';
import { Item, OptionProps } from '../../common/types/types';

type Props = {
    item: Item;
    amount: number;
    options: OptionProps;
    items: Item[];
};

const BeltCount = (props: Props) => {
    const { item, amount, options, items } = props;
    const { beltType } = options;

    if (item.type === 'Liquid') {
        return <></>;
    }

    return (
        <span className="ml-4 my-auto flex">
            <ItemImage className="h-6 w-6" item={getItem(beltType, items)!} />x
            {getBeltCount(amount, beltType, options.timeUnit)}
        </span>
    );
};

export default BeltCount;
