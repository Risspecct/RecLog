from enum import Enum


class EnforcementTier(str, Enum):
    CRITICAL = "Critical"
    HIGH = "High"
    MEDIUM = "Medium"
    LOW = "Low"


class RootCause(str, Enum):
    DEMAND_OVERFLOW = "Demand Overflow"
    ROAD_CAPACITY_REDUCTION = "Road Capacity Reduction"
    HEAVY_VEHICLE_OBSTRUCTION = "Heavy Vehicle Obstruction"
    GENERAL_ILLEGAL_PARKING = "General Illegal Parking"
