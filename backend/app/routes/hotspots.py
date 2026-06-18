from fastapi import APIRouter
from fastapi import HTTPException

from app.services.hotspot_service import (get_all_hotspots, get_hotspot_by_id)
from app.models.hotspot import HotspotResponse

router = APIRouter(
    prefix="/hotspots",
    tags=["Hotspots"]
)


@router.get("", response_model=list[HotspotResponse])
def get_hotspots(limit: int = 50, offset: int = 0):
    return get_all_hotspots(limit=limit, offset=offset)


@router.get(
    "/{h3_cell}",
    response_model=HotspotResponse
)
def get_hotspot_details(h3_cell: str):
    hotspot = get_hotspot_by_id(h3_cell)

    if hotspot is None:
        raise HTTPException(status_code=404, detail="Hotspot not found")

    return hotspot
