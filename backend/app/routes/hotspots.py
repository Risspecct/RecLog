from fastapi import APIRouter
from fastapi import HTTPException

from app.services.hotspot_service import (get_hotspot_summaries, get_hotspot_by_id, get_critical_hotspots, get_top_priority_hotspots, search_hotspots)
from app.models.hotspot import (HotspotSummaryResponse, HotspotDetailResponse)
from app.models.enums import EnforcementTier

router = APIRouter(
    prefix="/hotspots",
    tags=["Hotspots"]
)


@router.get("", response_model=list[HotspotSummaryResponse])
def get_hotspots(limit: int = 50, offset: int = 0, tier: EnforcementTier | None = None):
    return get_hotspot_summaries(limit=limit, offset=offset, tier=tier)


@router.get("/critical", response_model=list[HotspotSummaryResponse])
def critical_hotspots():
    return get_critical_hotspots()


@router.get("/search", response_model=list[HotspotSummaryResponse])
def search(q: str, limit: int = 20):
    return search_hotspots(query=q, limit=limit)


@router.get("/top-priority", response_model=list[HotspotSummaryResponse])
def top_priority(limit: int = 20):
    return get_top_priority_hotspots(limit)


@router.get("/{h3_cell}", response_model=HotspotDetailResponse)
def get_hotspot_details(h3_cell: str):
    hotspot = get_hotspot_by_id(h3_cell)

    if hotspot is None:
        raise HTTPException(status_code=404, detail="Hotspot not found")

    return hotspot
