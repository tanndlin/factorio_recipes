import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import recipes from './assets/recipes.json';
import { removeDuplicates } from './common/CalculatorUtils';
import Header from './common/Header';
import { IOItem, Item } from './common/types/types';
import HomePage from './pages/HomePage';
import RecipesPage from './pages/RecipesPage';

function App() {
    const items = recipes.sort((a, b) =>
        a.name.localeCompare(b.name)
    ) as Item[];
    const [inputItems, setInputItems] = React.useState<IOItem[]>(
        JSON.parse(localStorage.getItem('inputItems') || '[]')
    );
    const [outputItems, setOutputItems] = React.useState<IOItem[]>(
        JSON.parse(localStorage.getItem('outputItems') || '[]')
    );

    React.useEffect(() => {
        localStorage.setItem('inputItems', JSON.stringify(inputItems));
    }, [inputItems]);

    React.useEffect(() => {
        localStorage.setItem('outputItems', JSON.stringify(outputItems));
    }, [outputItems]);

    return (
        <div className="h-full flex flex-col">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <HomePage
                                inputItems={inputItems}
                                outputItems={outputItems}
                                setInputItems={(items: IOItem[]) => {
                                    setInputItems(removeDuplicates(items));
                                }}
                                setOutputItems={(items: IOItem[]) => {
                                    setOutputItems(removeDuplicates(items));
                                }}
                                items={items}
                            />
                        }
                    />
                    <Route
                        path="/recipes"
                        element={
                            <RecipesPage
                                items={items}
                                outputItems={outputItems}
                                setOutputItems={(items: IOItem[]) => {
                                    setOutputItems(removeDuplicates(items));
                                }}
                            />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
