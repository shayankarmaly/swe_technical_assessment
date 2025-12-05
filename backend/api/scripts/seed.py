import csv
import os
import sys
from pathlib import Path
from dotenv import load_dotenv

# Ensure the app package is importable when running as a script
API_DIR = Path(__file__).resolve().parents[1]
REPO_ROOT = Path(__file__).resolve().parents[3]
sys.path.append(str(API_DIR))

from app.db import SessionLocal
from app import models

# Load env from backend/api/.env
load_dotenv(API_DIR / ".env")

def run():
    db = SessionLocal()
    # Preload existing VINs to avoid duplicate insert errors on reruns
    existing_vins = {v.vin for v in db.query(models.Vehicle.vin).all()}
    data_path = REPO_ROOT / "assets" / "swe_technical_assessment_data.csv"
    with data_path.open(newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        new_rows = []
        for row in reader:
            vin = (row.get("VIN") or row.get("vin") or "").strip()
            make = (row.get("Make") or "").strip()
            model = (row.get("Model") or "").strip()
            description = (row.get("WebAdDescription") or row.get("Description") or "").strip()
            photos_raw = row.get("PhotoURLs") or row.get("image_urls") or ""
            images = [u.strip() for u in photos_raw.split(",") if u.strip()]

            if not vin or vin in existing_vins:
                # skip rows without a VIN or already inserted
                continue

            new_rows.append(
                models.Vehicle(
                    vin=vin,
                    description=description,
                    make=make,
                    model=model,
                    image_urls=images,
                )
            )
            existing_vins.add(vin)

        if new_rows:
            db.add_all(new_rows)
            db.commit()
    db.close()

if __name__ == "__main__":
    run()