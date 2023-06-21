import React from 'react';
import RecipesPage from './pages/RecipesPage';
import Header from './common/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Item } from './common/types';
import recipes from './assets/recipes.json';

function App() {
    const [items, _] = React.useState<Item[]>(
        recipes.sort((a, b) => a.name.localeCompare(b.name)) as Item[]
    );

    return (
        <div className="h-full flex flex-col">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<h1>Home</h1>}></Route>
                    <Route
                        path="/recipes"
                        element={
                            <RecipesPage
                                {...{
                                    items,
                                    recipes
                                }}
                            ></RecipesPage>
                        }
                    ></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
