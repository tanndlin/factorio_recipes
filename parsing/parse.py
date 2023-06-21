import json

path = "./originalRecipes.json"

recipes = []

def getRecipe(ingredients):
    ret = {}
    ret['ingredients'] = []
    for ingredient in ingredients:
        for key in ingredient.keys():

            ret['ingredients'].append({
                'id': key,
                'amount': ingredient[key]
            })

    return ret


def convert(recipe):
    print(recipe)    
    ret = {}
    
    name = recipe["name"].replace('-', ' ')
    # Capitalize first letter
    name = name.capitalize()

    ret['id'] = recipe['name']
    ret["name"] = name
    ret['wiki_link'] = f'https://wiki.factorio.com/{recipe["name"].replace("-", "_")}'

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

with open(path, "r") as f:
    data = json.load(f)
    for recipe in data:
        recipes.append(convert(getNormal(recipe)))

for i in recipes:
    print(i)


with open('out.json', 'w') as f:
    json.dump(recipes, f, indent=4)