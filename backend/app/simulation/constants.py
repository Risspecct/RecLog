VEHICLE_DIST = {
    "SCOOTER": 0.35,
    "MOTOR CYCLE": 0.25,
    "CAR": 0.25,
    "PASSENGER AUTO": 0.10,
    "GOODS AUTO": 0.05
}

VEHICLE_WEIGHTS = {
    "SCOOTER": 1,
    "MOTOR CYCLE": 1,
    "MOPED": 1,

    "CAR": 2,
    "JEEP": 2,
    "PASSENGER AUTO": 2,

    "MAXI-CAB": 3,
    "VAN": 3,

    "GOODS AUTO": 4,

    "LGV": 5,
    "TEMPO": 5,

    "PRIVATE BUS": 8,
    "BUS (BMTC/KSRTC)": 8,
    "SCHOOL VEHICLE": 8,
    "TOURIST BUS": 8,
    "FACTORY BUS": 8,

    "MINI LORRY": 7,

    "LORRY/GOODS VEHICLE": 10,
    "HGV": 10,
    "TANKER": 10,

    "TRACTOR": 6
}

SEVERITY_MAP = {
    "PARKING IN A MAIN ROAD": 5,
    "DOUBLE PARKING": 5,

    "PARKING ON FOOTPATH": 4,
    "PARKING NEAR ROAD CROSSING": 4,
    "PARKING NEAR TRAFFIC LIGHT OR ZEBRA CROSS": 4,
    "PARKING NEAR BUSTOP/SCHOOL/HOSPITAL ETC": 4,

    "NO PARKING": 3,

    "WRONG PARKING": 2
}

VIOLATION_LIBRARY = [
    "NO PARKING",
    "PARKING IN A MAIN ROAD",
    "DOUBLE PARKING",
    "PARKING ON FOOTPATH",
    "WRONG PARKING"
]

SCENARIOS = {
    "normal": 1.0,
    "festival": 1.8,
    "rain": 1.3,
    "enforcement": 0.6
}

INTERVENTIONS = {
    "none": 1.00,
    "extra_enforcement": 0.75,
    "tow_truck_drive": 0.60,
    "temporary_parking_zone": 0.55,
    "traffic_diversion": 0.70
}
