from fastapi import APIRouter

from app.services.hotspot_service import (get_all_hotspots)
from app.models.hotspot import HotspotResponse

router = APIRouter(
    prefix="/hotspots",
    tags=["Hotspots"]
)


@router.get("", response_model=list[HotspotResponse])
def get_hotspots(limit: int = 50, offset: int = 0):
    return get_all_hotspots(limit=limit, offset=offset)
