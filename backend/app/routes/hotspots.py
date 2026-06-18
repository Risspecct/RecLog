from fastapi import APIRouter
from fastapi import HTTPException

from app.services.hotspot_service import (get_hotspot_summaries, get_hotspot_by_id)
from app.models.hotspot import (HotspotSummaryResponse, HotspotDetailResponse)
from app.models.enums import EnforcementTier

router = APIRouter(
    prefix="/hotspots",
    tags=["Hotspots"]
)


@router.get("", response_model=list[HotspotSummaryResponse])
def get_hotspots(limit: int = 50, offset: int = 0, tier: EnforcementTier | None = None):
    return get_hotspot_summaries(limit=limit, offset=offset, tier=tier)


@router.get("/{h3_cell}", response_model=HotspotDetailResponse)
def get_hotspot_details(h3_cell: str):
    hotspot = get_hotspot_by_id(h3_cell)

    if hotspot is None:
        raise HTTPException(status_code=404, detail="Hotspot not found")

    return hotspot
