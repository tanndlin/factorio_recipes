import React from 'react';
import RecipesPage from './pages/RecipesPage';
import Header from './common/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Item, IOItem } from './common/types';
import recipes from './assets/recipes.json';
import HomePage from './pages/HomePage';
import BreakdownPage from './pages/BreakdownPage';

function App() {
    const [items, _] = React.useState<Item[]>(
        recipes.sort((a, b) => a.name.localeCompare(b.name)) as Item[]
    );
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
                    <Route path="/" element={<HomePage />}></Route>
                    <Route
                        path="/recipes"
                        element={
                            <RecipesPage
                                {...{
                                    items,
                                    recipes,
                                    outputItems,
                                    setOutputItems
                                }}
                            ></RecipesPage>
                        }
                    ></Route>
                    <Route
                        path="/breakdown"
                        element={
                            <BreakdownPage
                                inputItems={inputItems}
                                outputItems={outputItems}
                                setInputItems={setInputItems}
                                setOutputItems={setOutputItems}
                                items={items}
                            />
                        }
                    ></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
