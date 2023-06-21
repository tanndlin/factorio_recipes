import json
import multiprocessing
import os


outputPath = '../../public/images'

def getIcon(url):
    print(url)
    os.system(f'curl -o {outputPath}/{url.split("/")[-1]} {url}')

def createUrl(name):
    if name == 'Rail':
        replaced = 'Straight_rail'
    else:
        replaced = name.replace(' ', '_').capitalize()
        replaced = replaced.replace('mk1', 'MK1').replace('mk2', 'MK2')
    return f'https://wiki.factorio.com/images/thumb/{replaced}.png/48px-{replaced}.png'

if __name__ == '__main__':
    file = '../assets/recipes.json'
    with open(file, 'r') as f:
        data = json.load(f)

        with multiprocessing.Pool(16) as p:
            p.map(getIcon, [createUrl(recipe['name']) for recipe in data])

