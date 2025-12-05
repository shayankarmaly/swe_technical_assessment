from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .db import SessionLocal
from . import schemas, crud

router = APIRouter(prefix="/vehicles", tags=["vehicles"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("", response_model=list[schemas.VehicleOut])
def list_all(db: Session = Depends(get_db)):
    return crud.list_vehicles(db)

@router.get("/{vehicle_id}", response_model=schemas.VehicleOut)
def get_one(vehicle_id: str, db: Session = Depends(get_db)):
    return crud.get_vehicle(db, vehicle_id)

@router.post("", response_model=schemas.VehicleOut, status_code=201)
def create(data: schemas.VehicleCreate, db: Session = Depends(get_db)):
    return crud.create_vehicle(db, data)