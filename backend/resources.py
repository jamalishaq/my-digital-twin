from pypdf import PdfReader
import json
import os

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")

try:
    reader = PdfReader(os.path.join(DATA_DIR, "linkedin.pdf"))
    linkedin = ""
    for page in reader.pages:
        text = page.extract_text()
        if text:
            linkedin += text
except FileNotFoundError:
    linkedin = "LinkedIn profile not available"
    
with open(os.path.join(DATA_DIR, "summary.txt"), "r", encoding="utf-8") as f:
    summary = f.read()

with open(os.path.join(DATA_DIR, "style.txt"), "r", encoding="utf-8") as f:
    style = f.read()

with open(os.path.join(DATA_DIR, "facts.json"), "r", encoding="utf-8") as f:
    facts = json.load(f)

with open(os.path.join(DATA_DIR, "projects.json"), "r", encoding="utf-8") as f:
    projects = json.load(f)
