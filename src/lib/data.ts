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
}

export interface Room {
  id: string;
  number: string;
  floor: number;
  capacity: 3;
  occupiedCount: number;
  students: Student[];
  type: 'Triple';
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
    hometown: "San Francisco"
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
    hometown: "Chicago"
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
    hometown: "New York"
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
    hometown: "Boston"
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
    hometown: "Seattle"
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
    hometown: "Miami"
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
    hometown: "Denver"
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
    hometown: "Los Angeles"
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
    hometown: "Portland"
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
    hometown: "Philadelphia"
  }
];

export const rooms: Room[] = [
  {
    id: "r101",
    number: "101",
    floor: 1,
    capacity: 3,
    occupiedCount: 2,
    students: [students[0], students[1]],
    type: "Triple"
  },
  {
    id: "r102",
    number: "102",
    floor: 1,
    capacity: 3,
    occupiedCount: 3,
    students: [students[2], students[3], students[4]],
    type: "Triple"
  },
  {
    id: "r201",
    number: "201",
    floor: 2,
    capacity: 3,
    occupiedCount: 1,
    students: [students[5]],
    type: "Triple"
  },
  {
    id: "r202",
    number: "202",
    floor: 2,
    capacity: 3,
    occupiedCount: 2,
    students: [students[6], students[7]],
    type: "Triple"
  },
  {
    id: "r301",
    number: "301",
    floor: 3,
    capacity: 3,
    occupiedCount: 1,
    students: [students[8]],
    type: "Triple"
  },
  {
    id: "r302",
    number: "302",
    floor: 3,
    capacity: 3,
    occupiedCount: 1,
    students: [students[9]],
    type: "Triple"
  },
  {
    id: "r401",
    number: "401",
    floor: 4,
    capacity: 3,
    occupiedCount: 0,
    students: [],
    type: "Triple"
  },
  {
    id: "r402",
    number: "402",
    floor: 4,
    capacity: 3,
    occupiedCount: 0,
    students: [],
    type: "Triple"
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
