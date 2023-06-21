import React from 'react';
import RecipesPage from './pages/RecipesPage';
import Header from './common/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Item } from './common/types';
import recipes from './assets/recipes.json';

function App() {
    const [items, _] = React.useState<Item[]>(recipes as Item[]);
    React.useEffect(() => {
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }, [recipes]);

    return (
        <>
            <Header />
            <BrowserRouter>
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
        </>
    );
}

export default App;
