from flask import Flask, render_template, jsonify
import requests
import csv

endpoint_url = "https://api.spotify.com/v1/recommendations?"

# OUR FILTERS
limit = 100
market = "US"
seed_genres = "rock"

query = f'{endpoint_url}limit={limit}&market={market}&seed_genres={seed_genres}'

response = requests.get(query, 
                        headers={"Content-Type":"application/json", 
                                 "Authorization":"Bearer BQBZU780m7oEepM6NbzPEJK6R1drMi9wuJyQZM4QqKl9GNEj9GJYhZ_eFsj7dBNNfj33e5HMki2mHS6qhzGbDEDH7Z4FT4vLRZdrZzaKMWzowwOVIEE"})

json_response = response.json()

# Load pronoun information from CSV into a dictionary
pronoun_data = {}  # Dictionary to store pronoun information

with open('gender_dataset.csv', mode='r', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        name = row['NAME']
        pronouns = row['PRONOUN']
        is_band = row['IS_BAND']
        pronoun_data[name] = {'pronouns': pronouns.lower(), 'is_band': is_band.lower()}  # Store pronoun and band information

uris = []
filtered_uris = []

with open('output.txt', 'w') as f:
    for track in json_response['tracks']:
        artist_name = track['artists'][0]['name']
        pronouns = None
        is_band = None
        
        # Check if artist name exists in the pronoun_data dictionary
        if artist_name in pronoun_data:
            pronouns = pronoun_data[artist_name]['pronouns']
            is_band = pronoun_data[artist_name]['is_band']
        
        # Check if pronouns match "he/him" or if the artist is a band, skip if true
        if pronouns and "he/him" in pronouns or is_band == 'true':
            continue
        
        uris.append(track)
        content = f"\"{track['name']}\" by {artist_name}"
        f.write(content + "\n")
        filtered_uris.append(track['uri'])  # Store URIs of filtered tracks