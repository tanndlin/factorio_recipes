import json

path = "./originalRecipes.json"

recipes = []
localeCfgData = {}
with open('base.cfg', 'r') as f:
    data = f.read().split('\n\n')

    for group in data:
        lines = group.split('\n')
        groupName = lines[0]
        if not (groupName.startswith('[') and groupName.endswith(']')):
            continue

        localeCfgData[groupName] = {}
        for line in lines[1:]:
            key = line.split('=')[0]
            value = line.split('=')[1]
            localeCfgData[groupName][key] = value


def getRecipe(ingredients):
    ret = {}
    ret['ingredients'] = []
    for ingredient in ingredients:
        if 'type' in ingredient:
            ret['ingredients'].append({
                'id': ingredient['name'],
                'amount': ingredient['amount']
            })
            continue

        for key in ingredient.keys():
            ret['ingredients'].append({
                'id': key,
                'amount': ingredient[key]
            })

    return ret

def getLocalName(id):
    if id in localeCfgData['[item-name]']:
        return localeCfgData['[item-name]'][id]
    
    if id in localeCfgData['[fluid-name]']:
        return localeCfgData['[fluid-name]'][id]
    
    if id in localeCfgData['[entity-name]']:
        return localeCfgData['[entity-name]'][id]
    
    if id in localeCfgData['[recipe-name]']:
        return localeCfgData['[recipe-name]'][id]
    
    if id in localeCfgData['[equipment-name]']:
        return localeCfgData['[equipment-name]'][id]

    return id.replace('-', ' ').capitalize()


def convert(recipe):
    ret = {}
    id = recipe['name']

    ret['id'] = id
    ret["name"] = getLocalName(id)
    # ret['wiki_link'] = f'https://wiki.factorio.com/{recipe["name"].replace("-", "_")}'

    ret['recipe'] = getRecipe(recipe['ingredients'])
    if 'energy_required' in recipe:
        ret['recipe']['time'] = recipe['energy_required']

    if 'result_count' in recipe:
        ret['recipe']['yield'] = recipe['result_count']
    else: 
        ret['recipe']['yield'] = 1




    return ret

def getNormal(recipe):
    if 'normal' in recipe:
        ret = {}
        ret['type'] = recipe['type']
        ret['name'] = recipe['name']

        for key in recipe['normal'].keys():
            ret[key] = recipe['normal'][key]

        return ret
    return recipe

blacklist = [
    'electric-energy-interface',
    'loader',
    'fast-loader',
    'express-loader',
    'heavy-oil-cracking',
    'light-oil-cracking',
]

with open(path, "r") as f:
    data = json.load(f)
    for recipe in data:
        if any([x == recipe['name'] for x in blacklist]):
            continue

        converted = convert(getNormal(recipe))
        if converted is not None:
            recipes.append(converted)


with open('extras.json', 'r') as f:
    data = json.load(f)
    for recipe in data:
        recipes.append(recipe)


with open('recipes.json', 'w') as f:
    json.dump(recipes, f, indent=4)