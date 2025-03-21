
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
    name: "Raj Kamal",
    gender: "Male",
    age: 20,
    contactNumber: "9798785911",
    email: "rajkamla9741@gmail.com",
    college: "Aditya Engineering College",
    branch: "CSE (Data Science)",
    year: 2,
    hometown: "Jharkhand"
  }
];

export const rooms: Room[] = [
  {
    id: "r101",
    number: "101",
    floor: 1,
    capacity: 3,
    occupiedCount: 1,
    students: [students[0]],
    type: "Triple"
  },
  {
    id: "r102",
    number: "102",
    floor: 1,
    capacity: 3,
    occupiedCount: 0,
    students: [],
    type: "Triple"
  },
  {
    id: "r201",
    number: "201",
    floor: 2,
    capacity: 3,
    occupiedCount: 0,
    students: [],
    type: "Triple"
  },
  {
    id: "r202",
    number: "202",
    floor: 2,
    capacity: 3,
    occupiedCount: 0,
    students: [],
    type: "Triple"
  },
  {
    id: "r301",
    number: "301",
    floor: 3,
    capacity: 3,
    occupiedCount: 0,
    students: [],
    type: "Triple"
  },
  {
    id: "r302",
    number: "302",
    floor: 3,
    capacity: 3,
    occupiedCount: 0,
    students: [],
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
