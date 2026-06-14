export type IndoorRoom = {
  id: string;
  name: string;
  shortName: string;
  type: "lab" | "classroom" | "office" | "hall" | "service" | "connector";
  x: number;
  y: number;
  width: number;
  height: number;
};

export type IndoorFloor = {
  id: string;
  label: string;
  name: string;
  elevationLabel: string;
  rooms: IndoorRoom[];
};

export type IndoorBuildingMap = {
  id: string;
  name: string;
  campus: string;
  mapboxCenter: {
    latitude: number;
    longitude: number;
    zoom: number;
    pitch: number;
  };
  multiset: {
    mapType: "map" | "map-set";
    mapCode: string;
    confidenceThreshold: number;
  };
  floors: IndoorFloor[];
};

const sharedConnectors: IndoorRoom[] = [
  {
    id: "north-stairs",
    name: "North Stairs",
    shortName: "Stairs",
    type: "connector",
    x: 7,
    y: 18,
    width: 13,
    height: 18
  },
  {
    id: "elevator-core",
    name: "Elevator Core",
    shortName: "Elev",
    type: "connector",
    x: 45,
    y: 40,
    width: 12,
    height: 17
  },
  {
    id: "south-stairs",
    name: "South Stairs",
    shortName: "Stairs",
    type: "connector",
    x: 78,
    y: 64,
    width: 14,
    height: 18
  }
];

export const vivianEngineeringMap: IndoorBuildingMap = {
  id: "vivian-engineering-center",
  name: "Vivian Engineering Center",
  campus: "CSULB",
  mapboxCenter: {
    latitude: 33.7838,
    longitude: -118.1141,
    zoom: 18.2,
    pitch: 62
  },
  multiset: {
    mapType: "map-set",
    mapCode: "VIVIAN_ENGINEERING_CENTER_MAP_SET",
    confidenceThreshold: 0.5
  },
  floors: [
    {
      id: "level-1",
      label: "L1",
      name: "Entry Labs",
      elevationLabel: "Ground",
      rooms: [
        ...sharedConnectors,
        {
          id: "vec-lobby",
          name: "Vivian Lobby",
          shortName: "Lobby",
          type: "hall",
          x: 25,
          y: 34,
          width: 24,
          height: 22
        },
        {
          id: "innovation-lab",
          name: "Innovation Lab",
          shortName: "Lab",
          type: "lab",
          x: 58,
          y: 19,
          width: 24,
          height: 23
        },
        {
          id: "student-shop",
          name: "Student Project Shop",
          shortName: "Shop",
          type: "lab",
          x: 24,
          y: 62,
          width: 28,
          height: 20
        }
      ]
    },
    {
      id: "level-2",
      label: "L2",
      name: "Classrooms",
      elevationLabel: "Second",
      rooms: [
        ...sharedConnectors,
        {
          id: "vec-201",
          name: "VEC 201",
          shortName: "201",
          type: "classroom",
          x: 23,
          y: 21,
          width: 25,
          height: 18
        },
        {
          id: "vec-214",
          name: "VEC 214",
          shortName: "214",
          type: "classroom",
          x: 59,
          y: 20,
          width: 24,
          height: 21
        },
        {
          id: "advising-suite",
          name: "Engineering Advising",
          shortName: "Advise",
          type: "office",
          x: 23,
          y: 62,
          width: 28,
          height: 20
        },
        {
          id: "collab-nook",
          name: "Collaboration Nook",
          shortName: "Study",
          type: "hall",
          x: 59,
          y: 62,
          width: 23,
          height: 18
        }
      ]
    },
    {
      id: "level-3",
      label: "L3",
      name: "Faculty + Research",
      elevationLabel: "Third",
      rooms: [
        ...sharedConnectors,
        {
          id: "robotics-lab",
          name: "Robotics Lab",
          shortName: "Robot",
          type: "lab",
          x: 22,
          y: 20,
          width: 27,
          height: 22
        },
        {
          id: "capstone-studio",
          name: "Capstone Studio",
          shortName: "Capstone",
          type: "lab",
          x: 58,
          y: 21,
          width: 26,
          height: 20
        },
        {
          id: "faculty-offices",
          name: "Faculty Offices",
          shortName: "Offices",
          type: "office",
          x: 23,
          y: 62,
          width: 29,
          height: 20
        },
        {
          id: "quiet-study",
          name: "Quiet Study",
          shortName: "Study",
          type: "hall",
          x: 60,
          y: 63,
          width: 22,
          height: 17
        }
      ]
    }
  ]
};

export const getIndoorFloor = (floorId?: string) =>
  vivianEngineeringMap.floors.find((floor) => floor.id === floorId) ??
  vivianEngineeringMap.floors[1];
