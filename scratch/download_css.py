
import urllib.request
import re
from pathlib import Path

urls = [
    "https://vijayagency.in/_next/static/chunks/0~ih7o~x69mfu.css",
    "https://vijayagency.in/_next/static/chunks/091h3eei7dtoe.css",
    "https://vijayagency.in/_next/static/chunks/0j9~f8u6cyxs2.css"
]

for i, url in enumerate(urls):
    try:
        print(f"Fetching {url}...")
        req = urllib.request.Request(
            url, 
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
        )
        with urllib.request.urlopen(req) as response:
            css = response.read().decode('utf-8')
            filename = f"scratch/vijay_style_{i}.css"
            Path(filename).write_text(css, encoding='utf-8')
            print(f"Saved to {filename}, length: {len(css)}")
            
            # Find logo rules
            matches = re.finditer(r'[^}]*logo[^}]*{[^}]+}', css, re.IGNORECASE)
            print("--- LOGO RULES ---")
            for m in matches:
                print(m.group(0).strip())
                print("-" * 30)
                
            # Find hover rules
            print("--- HOVER RULES ---")
            hover_matches = re.finditer(r'[^}]*hover[^}]*{[^}]+}', css, re.IGNORECASE)
            for hm in hover_matches:
                rule = hm.group(0).strip()
                if 'shadow' in rule or 'transform' in rule or 'filter' in rule:
                    print(rule)
                    print("-" * 30)
    except Exception as e:
        print(f"Error fetching {url}: {e}")
