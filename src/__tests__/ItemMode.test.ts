import { getItem, getRecipeSum } from '../common/CalculatorUtils';
import recipes from '../assets/recipes.json';
import { Item } from '../common/types/types';

describe('Item Mode Tests', () => {
    const items = recipes as Item[];

    test('Get Recipe Sum Simple', () => {
        const outputItem = getItem('iron-plate', items)!;
        const sum = getRecipeSum(outputItem, items, 100, []);
        expect(sum['iron-ore']).toBe(100);
    });

    test('Require all of ingredient, despite input', () => {
        const outputItem = getItem('iron-plate', items)!;
        const inputItem = getItem('iron-ore', items)!;
        const input = [
            {
                item: inputItem,
                amount: 50
            }
        ];

        const sum = getRecipeSum(outputItem, items, 100, input);
        expect(sum['iron-ore']).toBe(100);
    });

    test('Input half of required item', () => {
        const outputItem = getItem('electronic-circuit', items)!;
        const inputItem = getItem('copper-cable', items)!;
        const input = [
            {
                item: inputItem,
                amount: 150
            }
        ];

        const sum = getRecipeSum(outputItem, items, 100, input);
        expect(sum['copper-cable']).toBe(300);
        expect(sum['copper-plate']).toBe(75);
    });

    test('Input all of required item', () => {
        const outputItem = getItem('electronic-circuit', items)!;
        const inputItem = getItem('copper-cable', items)!;
        const input = [
            {
                item: inputItem,
                amount: 300
            }
        ];

        const sum = getRecipeSum(outputItem, items, 100, input);
        expect(sum['copper-plate']).toBeUndefined();
    });

    test('Input more than required item', () => {
        const outputItem = getItem('electronic-circuit', items)!;
        const inputItem = getItem('copper-cable', items)!;
        const input = [
            {
                item: inputItem,
                amount: 999999
            }
        ];

        const sum = getRecipeSum(outputItem, items, 100, input);
        expect(sum['copper-plate']).toBeUndefined();
    });

    test('Complex Recipe', () => {
        const outputItem = getItem('processing-unit', items)!;
        const greenCircuit = getItem('electronic-circuit', items)!;
        const advancedCircuit = getItem('advanced-circuit', items)!;
        const cables = getItem('copper-cable', items)!;

        const input = [
            {
                item: greenCircuit,
                amount: 2000
            },
            {
                item: advancedCircuit,
                amount: 50
            },
            {
                item: cables,
                amount: 1000
            }
        ];

        const sum = getRecipeSum(outputItem, items, 100, input);
        expect(sum['electronic-circuit']).toBe(2300);
        expect(sum['advanced-circuit']).toBe(200);
        expect(sum['copper-cable']).toBe(1500);
        expect(sum['copper-plate']).toBe(250);
        expect(sum['plastic-bar']).toBe(300);
    });
});
