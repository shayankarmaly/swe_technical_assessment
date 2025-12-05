from pydantic import BaseModel, Field
from typing import List, Optional

class VehicleBase(BaseModel):
    vin: str = Field(min_length=1)
    description: Optional[str] = None
    make: str
    model: str
    image_urls: List[str] = []  # accept any strings as URLs

class VehicleCreate(VehicleBase):
    pass

class VehicleOut(VehicleBase):
    id: str
    class Config:
        from_attributes = True