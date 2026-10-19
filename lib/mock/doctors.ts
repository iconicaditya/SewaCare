export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  department: string;
  phone: string;
  email: string;
  experience: number;
  availability: {
    workingDays: string[];
    hours: string;
  };
}

export const doctors: Doctor[] = [
  {
    id: 'DOC-001',
    name: 'Dr. Aarav Shrestha',
    specialization: 'Internal Medicine',
    department: 'General Medicine',
    phone: '9841001001',
    email: 'aarav.shrestha@sewacare.com',
    experience: 15,
    availability: { workingDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'], hours: '09:00 - 17:00' },
  },
  {
    id: 'DOC-002',
    name: 'Dr. Suman Koirala',
    specialization: 'Cardiology',
    department: 'Cardiology',
    phone: '9841001002',
    email: 'suman.koirala@sewacare.com',
    experience: 20,
    availability: { workingDays: ['Sun', 'Mon', 'Wed', 'Fri'], hours: '10:00 - 16:00' },
  },
  {
    id: 'DOC-003',
    name: 'Dr. Priya Bhandari',
    specialization: 'Pediatrics',
    department: 'Pediatrics',
    phone: '9841001003',
    email: 'priya.bhandari@sewacare.com',
    experience: 12,
    availability: { workingDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'], hours: '08:00 - 14:00' },
  },
  {
    id: 'DOC-004',
    name: 'Dr. Rajesh Maharjan',
    specialization: 'Orthopedic Surgery',
    department: 'Orthopedics',
    phone: '9841001004',
    email: 'rajesh.maharjan@sewacare.com',
    experience: 18,
    availability: { workingDays: ['Sun', 'Tue', 'Thu'], hours: '11:00 - 18:00' },
  },
  {
    id: 'DOC-005',
    name: 'Dr. Anjali Thapa',
    specialization: 'Obstetrics & Gynecology',
    department: 'Gynecology',
    phone: '9841001005',
    email: 'anjali.thapa@sewacare.com',
    experience: 14,
    availability: { workingDays: ['Sun', 'Mon', 'Wed', 'Thu', 'Sat'], hours: '09:00 - 15:00' },
  },
  {
    id: 'DOC-006',
    name: 'Dr. Bikram Rai',
    specialization: 'Neurology',
    department: 'Neurology',
    phone: '9841001006',
    email: 'bikram.rai@sewacare.com',
    experience: 16,
    availability: { workingDays: ['Mon', 'Tue', 'Thu', 'Fri'], hours: '10:00 - 16:00' },
  },
  {
    id: 'DOC-007',
    name: 'Dr. Meena Joshi',
    specialization: 'ENT',
    department: 'ENT',
    phone: '9841001007',
    email: 'meena.joshi@sewacare.com',
    experience: 10,
    availability: { workingDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'], hours: '09:00 - 13:00' },
  },
  {
    id: 'DOC-008',
    name: 'Dr. Sanjay Adhikari',
    specialization: 'Dermatology',
    department: 'Dermatology',
    phone: '9841001008',
    email: 'sanjay.adhikari@sewacare.com',
    experience: 8,
    availability: { workingDays: ['Sun', 'Wed', 'Fri'], hours: '11:00 - 17:00' },
  },
  {
    id: 'DOC-009',
    name: 'Dr. Kabita Gurung',
    specialization: 'Ophthalmology',
    department: 'Ophthalmology',
    phone: '9841001009',
    email: 'kabita.gurung@sewacare.com',
    experience: 11,
    availability: { workingDays: ['Mon', 'Tue', 'Thu', 'Sat'], hours: '09:00 - 14:00' },
  },
  {
    id: 'DOC-010',
    name: 'Dr. Dinesh Poudel',
    specialization: 'Emergency Medicine',
    department: 'Emergency',
    phone: '9841001010',
    email: 'dinesh.poudel@sewacare.com',
    experience: 9,
    availability: { workingDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], hours: '24 Hours (Rotational)' },
  },
];
