from fastapi import APIRouter

from app.services.hotspot_service import (get_all_hotspots)

router = APIRouter(
    prefix="/hotspots",
    tags=["Hotspots"]
)


@router.get("")
def get_hotspots(limit: int = 50, offset: int = 0):

    return get_all_hotspots(limit=limit, offset=offset)
