from sqlalchemy.orm import Session
from fastapi import HTTPException
from . import models, schemas

def list_vehicles(db: Session):
    return db.query(models.Vehicle).order_by(models.Vehicle.created_at.desc()).all()

def get_vehicle(db: Session, vehicle_id: str):
    v = db.query(models.Vehicle).filter(models.Vehicle.id == vehicle_id).first()
    if not v:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return v

def create_vehicle(db: Session, data: schemas.VehicleCreate):
    existing = db.query(models.Vehicle).filter(models.Vehicle.vin == data.vin).first()
    if existing:
        raise HTTPException(status_code=400, detail="VIN already exists")
    v = models.Vehicle(**data.model_dump())
    db.add(v)
    db.commit()
    db.refresh(v)
    return v