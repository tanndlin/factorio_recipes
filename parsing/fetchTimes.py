import json
import bs4
import aiohttp
import asyncio


def getTime(soup):
    divs = soup.find_all("div", {"class": "factorio-icon"})
    
    
    for div in divs:
        children = list(div.children)
        if len(children) < 2:
            continue

        if children[0]['title'] == 'Time':
            return float(children[1].text)

recipes = []
async def main():
    async with aiohttp.ClientSession() as session:
        with open('recipes.json', 'r') as f:
            oldRecipes = json.load(f)

            for recipe in oldRecipes:
                if 'time' in recipe['recipe']:
                    recipes.append(recipe)
                    continue

                friendlyName = recipe['name'].replace(' ', '_')
                print(friendlyName)
                url = f'https://wiki.factorio.com/{friendlyName}'
                async with session.get(url) as response:
                    soup = bs4.BeautifulSoup(await response.text(), 'html.parser')  
                    recipe['recipe']['time'] = getTime(soup)
                    recipes.append(recipe)

asyncio.run(main())
with open('recipes.json', 'w') as f:
    json.dump(recipes, f, indent=4)





