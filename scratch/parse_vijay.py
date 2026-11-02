from pathlib import Path
html = Path('scratch/raw_vijay.html').read_text(encoding='utf-8')
# search for 'reflect'
idx = html.lower().find('reflect')
if idx != -1:
    print(f"Found 'reflect' in html at {idx}!")
    print(html[idx-100:idx+200])
else:
    print("Not found in html")
    