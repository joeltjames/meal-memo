import argparse
import json
import sys
from recipe_scrapers import scrape_me
parser = argparse.ArgumentParser()
parser.add_argument('url', help='The URL of the recipe to scrape')

args = parser.parse_args()

try:
    scrape_results = scrape_me(args.url, wild_mode=True)
    results = {
        "success": True,
        "recipe": {
            "title": scrape_results.title(),
            "totalTime": scrape_results.total_time(),
            "yields": scrape_results.yields(),
            "ingredients": scrape_results.ingredients(),
            "instructions": scrape_results.instructions().split("\n"),
            "image": scrape_results.image(),
            "nutrients": scrape_results.nutrients(),
            "url": scrape_results.canonical_url()
        }
    }
except Exception as e:
    results = {
        "success": False,
        "error_msg": str(e)
    }

print(json.dumps(results))
sys.stdout.flush()