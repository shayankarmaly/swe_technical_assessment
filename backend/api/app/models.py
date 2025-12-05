from sqlalchemy import Column, String, Text, JSON, DateTime, func
from .db import Base
import uuid

class Vehicle(Base):
    __tablename__ = "vehicles"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    vin = Column(Text, unique=True, nullable=False)
    description = Column(Text)
    make = Column(Text)
    model = Column(Text)
    image_urls = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())