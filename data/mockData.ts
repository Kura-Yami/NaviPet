export type UserAccount = {
  id: string;
  name: string;
  email: string;
  avatarColor: string;
  gems: number;
  level: number;
};

export type Destination = {
  id: string;
  name: string;
  category: string;
  building: string;
  floor: string;
  eta: string;
  distance: string;
  recent?: boolean;
};

export type Outfit = {
  id: string;
  name: string;
  price: number;
  icon: string;
  color: string;
  purchased?: boolean;
};

export type GemBundle = {
  id: string;
  name: string;
  gems: number;
  priceLabel: string;
  bonus: string;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  progress: number;
  reward: number;
  icon: string;
};

export type DailyTask = {
  id: string;
  label: string;
  reward: number;
  done: boolean;
};

export type Friend = {
  id: string;
  name: string;
  status: "Online" | "Away" | "Offline";
  level: number;
  distance: string;
  outfit: string;
  avatarColor: string;
};

export type FriendRequest = {
  id: string;
  name: string;
  note: string;
  avatarColor: string;
};

export type ChatMessage = {
  id: string;
  from: "me" | "friend";
  body: string;
  time: string;
};

export const users: UserAccount[] = [
  {
    id: "u1",
    name: "Alex Rivera",
    email: "alex@csulb.edu",
    avatarColor: "#FFB000",
    gems: 680,
    level: 12
  },
  {
    id: "u2",
    name: "Maya Chen",
    email: "maya@csulb.edu",
    avatarColor: "#0EA5A4",
    gems: 340,
    level: 8
  },
  {
    id: "u3",
    name: "Guest Explorer",
    email: "guest@navipet.app",
    avatarColor: "#2F80ED",
    gems: 120,
    level: 2
  }
];

export const destinations: Destination[] = [
  {
    id: "student-union",
    name: "Student Union",
    category: "Campus hub",
    building: "USU",
    floor: "Level 2",
    eta: "8 min",
    distance: "0.4 mi",
    recent: true
  },
  {
    id: "library",
    name: "Library",
    category: "Study space",
    building: "University Library",
    floor: "Level 1",
    eta: "6 min",
    distance: "0.3 mi",
    recent: true
  },
  {
    id: "lecture-hall",
    name: "Lecture Hall",
    category: "Classroom",
    building: "LA5",
    floor: "Room 203",
    eta: "5 min",
    distance: "0.2 mi"
  },
  {
    id: "campus-life",
    name: "Campus Life",
    category: "Student services",
    building: "Brotman Hall",
    floor: "Level 1",
    eta: "9 min",
    distance: "0.5 mi"
  }
];

export const outfits: Outfit[] = [
  {
    id: "csulb-tee",
    name: "CSULB Tee",
    price: 120,
    icon: "tshirt-crew",
    color: "#FFB000",
    purchased: true
  },
  {
    id: "grad-cap",
    name: "Grad Cap",
    price: 180,
    icon: "school",
    color: "#182033"
  },
  {
    id: "shades",
    name: "Shades",
    price: 90,
    icon: "sunglasses",
    color: "#2F80ED"
  },
  {
    id: "beach-hat",
    name: "Beach Hat",
    price: 150,
    icon: "hat-fedora",
    color: "#F97316"
  }
];

export const gemBundles: GemBundle[] = [
  { id: "small", name: "Pocket Gems", gems: 200, priceLabel: "$1.99", bonus: "Best for one outfit" },
  { id: "medium", name: "Campus Pack", gems: 550, priceLabel: "$4.99", bonus: "Includes 50 bonus" },
  { id: "large", name: "Explorer Pack", gems: 1200, priceLabel: "$9.99", bonus: "Includes 250 bonus" }
];

export const achievements: Achievement[] = [
  {
    id: "attend-lecture",
    title: "Attend Lecture",
    description: "Navigate to three classes this week.",
    progress: 72,
    reward: 80,
    icon: "school"
  },
  {
    id: "library-study",
    title: "Library Study",
    description: "Reach the library after dark.",
    progress: 45,
    reward: 60,
    icon: "book-open-page-variant"
  },
  {
    id: "group-project",
    title: "Group Project",
    description: "Meet two friends at the same indoor spot.",
    progress: 30,
    reward: 100,
    icon: "account-group"
  },
  {
    id: "submit-assignment",
    title: "Submit Assignment",
    description: "Visit a lab or office before the deadline.",
    progress: 90,
    reward: 120,
    icon: "clipboard-check"
  }
];

export const dailyTasks: DailyTask[] = [
  { id: "route", label: "Complete one indoor route", reward: 20, done: true },
  { id: "friend", label: "Message a friend", reward: 15, done: false },
  { id: "pet", label: "Try a new pet outfit", reward: 25, done: false }
];

export const friends: Friend[] = [
  {
    id: "f1",
    name: "Jamie Park",
    status: "Online",
    level: 10,
    distance: "Near Library",
    outfit: "Grad Cap",
    avatarColor: "#0EA5A4"
  },
  {
    id: "f2",
    name: "Taylor Brooks",
    status: "Away",
    level: 7,
    distance: "0.2 mi away",
    outfit: "Shades",
    avatarColor: "#FFB000"
  },
  {
    id: "f3",
    name: "Jordan Lee",
    status: "Online",
    level: 15,
    distance: "At Student Union",
    outfit: "Beach Hat",
    avatarColor: "#2F80ED"
  }
];

export const friendRequests: FriendRequest[] = [
  {
    id: "r1",
    name: "Sam Ortiz",
    note: "Wants to share campus routes",
    avatarColor: "#F97316"
  }
];

export const initialMessages: Record<string, ChatMessage[]> = {
  f1: [
    { id: "m1", from: "friend", body: "Want to meet near the library stairs?", time: "9:22 AM" },
    { id: "m2", from: "me", body: "Yes, NaviPet says I am six minutes out.", time: "9:23 AM" }
  ],
  f2: [
    { id: "m3", from: "friend", body: "I found the lecture hall entrance.", time: "Yesterday" }
  ],
  f3: [
    { id: "m4", from: "me", body: "Saving a table at the Student Union.", time: "Mon" },
    { id: "m5", from: "friend", body: "On my way. My pet guide is wearing the beach hat.", time: "Mon" }
  ]
};

