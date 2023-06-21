import React from 'react';
import { render, screen } from '@testing-library/react';
import recipes from '../assets/recipes.json';
import { Item, OptionProps, RecipeMode } from '../common/types/types';
import RecipeModeViewer from '../components/RecipeViewer/RecipeMode';
import { getItem } from '../common/CalculatorUtils';
import '@testing-library/jest-dom';

describe('RecipeMode', () => {
    const items = recipes as Item[];
    const options: OptionProps = {
        assemblerType: 'assembling-machine-1',
        furnaceType: 'stone-furnace',
        recipeMode: RecipeMode.Recipe,
        setAssemblerType: jest.fn(),
        setFurnaceType: jest.fn(),
        setRecipeMode: jest.fn(),
        setTimeUnit: jest.fn(),
        timeUnit: 's'
    };

    it('should render the correct hierarchy for a simple recipe', () => {
        const outputItems = [
            { item: getItem('iron-plate', items)!, amount: 100 }
        ];
        render(
            <RecipeModeViewer
                items={items}
                inputItems={[]}
                outputItems={outputItems}
                options={options}
            />
        );

        expect(
            screen.getByText('100 Iron plate', { exact: false })
        ).toBeInTheDocument();
        expect(
            screen.getByText('100 Iron ore', { exact: false })
        ).toBeInTheDocument();
    });

    it('Inputting half of required item', () => {
        const inputItems = [{ item: getItem('iron-ore', items)!, amount: 50 }];
        const outputItems = [
            { item: getItem('iron-plate', items)!, amount: 100 }
        ];
        render(
            <RecipeModeViewer
                items={items}
                inputItems={inputItems}
                outputItems={outputItems}
                options={options}
            />
        );

        expect(screen.getByText('100 Iron plate')).toBeInTheDocument();
        // There should be 2 elements with the text '50 Iron ore'
        expect(screen.getAllByText('50 Iron ore').length).toBe(2);
    });

    it('Inputting all of required non-ore', () => {
        const inputItems = [
            { item: getItem('copper-cable', items)!, amount: 300 }
        ];
        const outputItems = [
            { item: getItem('electronic-circuit', items)!, amount: 100 }
        ];
        render(
            <RecipeModeViewer
                items={items}
                inputItems={inputItems}
                outputItems={outputItems}
                options={options}
            />
        );

        expect(screen.getByText('100 Electronic circuit')).toBeInTheDocument();
        expect(screen.getByText('300 Copper cable')).toBeInTheDocument();
        expect(screen.getByText('100 Iron plate')).toBeInTheDocument();
        expect(screen.getByText('100 Iron ore')).toBeInTheDocument();

        // No ingredients of the child item should be displayed
        expect(
            screen.queryByText('Copper plate', { exact: false })
        ).not.toBeInTheDocument();
    });

    it('Inputting half of required non-ore', () => {
        const inputItems = [
            { item: getItem('copper-cable', items)!, amount: 150 }
        ];
        const outputItems = [
            { item: getItem('electronic-circuit', items)!, amount: 100 }
        ];
        render(
            <RecipeModeViewer
                items={items}
                inputItems={inputItems}
                outputItems={outputItems}
                options={options}
            />
        );

        expect(screen.getByText('100 Electronic circuit')).toBeInTheDocument();
        expect(screen.getAllByText('150 Copper cable')).toHaveLength(2);
        expect(screen.getByText('100 Iron plate')).toBeInTheDocument();
        expect(screen.getByText('100 Iron ore')).toBeInTheDocument();

        // Half of whats left
        expect(screen.getByText('75 Copper plate')).toBeInTheDocument();
        expect(screen.getByText('75 Copper ore')).toBeInTheDocument();
    });

    it('Inputting multiple items', () => {
        const inputItems = [
            { item: getItem('copper-cable', items)!, amount: 150 },
            { item: getItem('iron-plate', items)!, amount: 20 }
        ];
        const outputItems = [
            { item: getItem('electronic-circuit', items)!, amount: 100 }
        ];
        render(
            <RecipeModeViewer
                items={items}
                inputItems={inputItems}
                outputItems={outputItems}
                options={options}
            />
        );

        expect(screen.getByText('100 Electronic circuit')).toBeInTheDocument();
        expect(screen.getAllByText('150 Copper cable')).toHaveLength(2);
        expect(screen.getByText('20 Iron plate')).toBeInTheDocument();
        expect(screen.getByText('80 Iron plate')).toBeInTheDocument();
        expect(screen.getByText('80 Iron ore')).toBeInTheDocument();

        // Half of whats left
        expect(screen.getByText('75 Copper plate')).toBeInTheDocument();
        expect(screen.getByText('75 Copper ore')).toBeInTheDocument();
    });

    it('Inputting required item for multiple outputs', () => {
        const inputItems = [
            { item: getItem('copper-cable', items)!, amount: 400 }
        ];
        const outputItems = [
            { item: getItem('electronic-circuit', items)!, amount: 100 },
            { item: getItem('advanced-circuit', items)!, amount: 100 }
        ];
        render(
            <RecipeModeViewer
                items={items}
                inputItems={inputItems}
                outputItems={outputItems}
                options={options}
            />
        );

        expect(screen.getByText('100 Electronic circuit')).toBeInTheDocument();

        expect(screen.getByText('300 Copper cable')).toBeInTheDocument();
        expect(screen.getByText('500 Copper cable')).toBeInTheDocument();
        expect(screen.getByText('100 Copper cable')).toBeInTheDocument();

        expect(screen.getByText('100 Iron plate')).toBeInTheDocument();
        expect(screen.getByText('100 Iron ore')).toBeInTheDocument();

        // Half of whats left
        expect(screen.getByText('250 Copper plate')).toBeInTheDocument();
        expect(screen.getByText('250 Copper ore')).toBeInTheDocument();
    });
});
