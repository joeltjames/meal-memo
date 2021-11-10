from recipe_scrapers import scrape_me
from slugify import slugify

recipes = []
id = 0
# give the url as a string, it can be url from any site listed below
scraper = scrape_me(
    'https://www.skinnytaste.com/chicken-and-white-bean-enchiladas-with/')

recipes.append({
    "id": id,
    "title": scraper.title(),
    "slug": slugify(scraper.title()),
    # "totalTime": scraper.total_time(),
    "yields": scraper.yields(),
    "ingredients": scraper.ingredients(),
    "instructions": scraper.instructions().split("\n"),
    "image": scraper.image(),
    "host": scraper.host(),
    "nutrients": scraper.nutrients(),
    "url": scraper.canonical_url()
})
id += 1

scraper = scrape_me(
    'https://www.skinnytaste.com/skinny-turkey-cuban-sandwich/')
recipes.append({
    "id": id,
    "title": scraper.title(),
    "slug": slugify(scraper.title()),
    # "totalTime": scraper.total_time(),
    "yields": scraper.yields(),
    "ingredients": scraper.ingredients(),
    "instructions": scraper.instructions().split("\n"),
    "image": scraper.image(),
    "host": scraper.host(),
    "nutrients": scraper.nutrients(),
    "url": scraper.canonical_url()
})
id += 1

scraper = scrape_me(
    'https://www.allrecipes.com/recipe/158968/spinach-and-feta-turkey-burgers/')
recipes.append({
    "id": id,
    "title": scraper.title(),
    "slug": slugify(scraper.title()),
    # "totalTime": scraper.total_time(),
    "yields": scraper.yields(),
    "ingredients": scraper.ingredients(),
    "instructions": scraper.instructions().split("\n"),
    "image": scraper.image(),
    "host": scraper.host(),
    "nutrients": scraper.nutrients(),
    "url": scraper.canonical_url()
})
id += 1

scraper = scrape_me(
    'https://www.skinnytaste.com/skinny-queso-dip/')
recipes.append({
    "id": id,
    "title": scraper.title(),
    "slug": slugify(scraper.title()),
    # "totalTime": scraper.total_time(),
    "yields": scraper.yields(),
    "ingredients": scraper.ingredients(),
    "instructions": scraper.instructions().split("\n"),
    "image": scraper.image(),
    "host": scraper.host(),
    "nutrients": scraper.nutrients(),
    "url": scraper.canonical_url()
})
id += 1

scraper = scrape_me(
    'https://www.skinnytaste.com/skinny-chocolate-chip-buttermilk-scones/')
recipes.append({
    "id": id,
    "title": scraper.title(),
    "slug": slugify(scraper.title()),
    # "totalTime": scraper.total_time(),
    "yields": scraper.yields(),
    "ingredients": scraper.ingredients(),
    "instructions": scraper.instructions().split("\n"),
    "image": scraper.image(),
    "host": scraper.host(),
    "nutrients": scraper.nutrients(),
    "url": scraper.canonical_url()
})
id += 1


print(recipes)
