import React from 'react';
import RecipesPage from './pages/RecipesPage';
import Header from './common/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Item } from './common/types';
import recipes from './assets/recipes.json';
import HomePage from './pages/HomePage';
import BreakdownPage from './pages/BreakdownPage';

function App() {
    const [items, _] = React.useState<Item[]>(
        recipes.sort((a, b) => a.name.localeCompare(b.name)) as Item[]
    );
    const [currentItem, setCurrentItem] = React.useState<Item>(items[0]);

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
                                    setCurrentItem
                                }}
                            ></RecipesPage>
                        }
                    ></Route>
                    <Route
                        path="/breakdown"
                        element={
                            <BreakdownPage item={currentItem} items={items} />
                        }
                    ></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
