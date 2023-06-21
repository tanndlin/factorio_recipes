import json
import bs4
import requests
from lxml.cssselect import CSSSelector

file = 'recipes.json'

recipes = []

def getTime(friendlyName):
    print(friendlyName)
    url = f'https://wiki.factorio.com/{friendlyName}'
    soup = bs4.BeautifulSoup(requests.get(url).text, 'html.parser')

    divs = soup.find_all("div", {"class": "factorio-icon"})
    
    
    for div in divs:
        children = list(div.children)
        if len(children) < 2:
            continue

        if children[0]['title'] == 'Time':
            return float(children[1].text)


with open(file, 'r') as f:
    oldRecipes = json.load(f)

    for recipe in oldRecipes:
        if 'time' not in recipe['recipe']:
            recipe['recipe']['time'] = getTime(recipe['name'].replace(' ', '_'))

        recipes.append(recipe)

with open(file, 'w') as f:
    json.dump(recipes, f, indent=4)





