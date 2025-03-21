
export interface Student {
  id: string;
  name: string;
  gender: string;
  age: number;
  contactNumber: string;
  email: string;
  college: string;
  branch: string;
  year: number;
  hometown: string;
  photo: string;
}

export interface Room {
  id: string;
  number: string;
  floor: number;
  capacity: number;
  occupiedCount: number;
  students: Student[];
  type: 'Single' | 'Double' | 'Triple' | 'Quad';
}

export const students: Student[] = [
  {
    id: "s1",
    name: "Alex Chen",
    gender: "Male",
    age: 20,
    contactNumber: "555-0101",
    email: "alex.chen@example.edu",
    college: "Engineering College",
    branch: "Computer Science",
    year: 2,
    hometown: "San Francisco",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1287&auto=format&fit=crop"
  },
  {
    id: "s2",
    name: "Sarah Johnson",
    gender: "Female",
    age: 21,
    contactNumber: "555-0102",
    email: "sarah.j@example.edu",
    college: "Science College",
    branch: "Physics",
    year: 3,
    hometown: "Chicago",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1287&auto=format&fit=crop"
  },
  {
    id: "s3",
    name: "Raj Patel",
    gender: "Male",
    age: 19,
    contactNumber: "555-0103",
    email: "raj.p@example.edu",
    college: "Business School",
    branch: "Finance",
    year: 1,
    hometown: "New York",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287&auto=format&fit=crop"
  },
  {
    id: "s4",
    name: "Emma Wilson",
    gender: "Female",
    age: 22,
    contactNumber: "555-0104",
    email: "emma.w@example.edu",
    college: "Arts College",
    branch: "Literature",
    year: 4,
    hometown: "Boston",
    photo: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=1287&auto=format&fit=crop"
  },
  {
    id: "s5",
    name: "David Kim",
    gender: "Male",
    age: 20,
    contactNumber: "555-0105",
    email: "david.k@example.edu",
    college: "Engineering College",
    branch: "Mechanical",
    year: 2,
    hometown: "Seattle",
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1287&auto=format&fit=crop"
  },
  {
    id: "s6",
    name: "Priya Sharma",
    gender: "Female",
    age: 21,
    contactNumber: "555-0106",
    email: "priya.s@example.edu",
    college: "Medical College",
    branch: "Medicine",
    year: 3,
    hometown: "Miami",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop"
  },
  {
    id: "s7",
    name: "James Wilson",
    gender: "Male",
    age: 22,
    contactNumber: "555-0107",
    email: "james.w@example.edu",
    college: "Science College",
    branch: "Chemistry",
    year: 4,
    hometown: "Denver",
    photo: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=1234&auto=format&fit=crop"
  },
  {
    id: "s8",
    name: "Mia Rodriguez",
    gender: "Female",
    age: 19,
    contactNumber: "555-0108",
    email: "mia.r@example.edu",
    college: "Arts College",
    branch: "Design",
    year: 1,
    hometown: "Los Angeles",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop"
  },
  {
    id: "s9",
    name: "Michael Wang",
    gender: "Male",
    age: 21,
    contactNumber: "555-0109",
    email: "michael.w@example.edu",
    college: "Engineering College",
    branch: "Electrical",
    year: 3,
    hometown: "Portland",
    photo: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: "s10",
    name: "Sophia Lee",
    gender: "Female",
    age: 20,
    contactNumber: "555-0110",
    email: "sophia.l@example.edu",
    college: "Business School",
    branch: "Marketing",
    year: 2,
    hometown: "Philadelphia",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1361&auto=format&fit=crop"
  }
];

export const rooms: Room[] = [
  {
    id: "r101",
    number: "101",
    floor: 1,
    capacity: 2,
    occupiedCount: 2,
    students: [students[0], students[2]],
    type: "Double"
  },
  {
    id: "r102",
    number: "102",
    floor: 1,
    capacity: 2,
    occupiedCount: 2,
    students: [students[4], students[6]],
    type: "Double"
  },
  {
    id: "r103",
    number: "103",
    floor: 1,
    capacity: 1,
    occupiedCount: 1,
    students: [students[8]],
    type: "Single"
  },
  {
    id: "r201",
    number: "201",
    floor: 2,
    capacity: 2,
    occupiedCount: 2,
    students: [students[1], students[3]],
    type: "Double"
  },
  {
    id: "r202",
    number: "202",
    floor: 2,
    capacity: 2,
    occupiedCount: 2,
    students: [students[5], students[7]],
    type: "Double"
  },
  {
    id: "r203",
    number: "203",
    floor: 2,
    capacity: 1,
    occupiedCount: 1,
    students: [students[9]],
    type: "Single"
  }
];

export const getRoomByNumber = (roomNumber: string): Room | undefined => {
  return rooms.find((room) => room.number === roomNumber);
};

export const getStudentById = (studentId: string): Student | undefined => {
  return students.find((student) => student.id === studentId);
};

export const searchRooms = (query: string): Room[] => {
  const lowerCaseQuery = query.toLowerCase();
  return rooms.filter((room) => 
    room.number.toLowerCase().includes(lowerCaseQuery) ||
    room.students.some((student) => 
      student.name.toLowerCase().includes(lowerCaseQuery) ||
      student.college.toLowerCase().includes(lowerCaseQuery) ||
      student.branch.toLowerCase().includes(lowerCaseQuery)
    )
  );
};
