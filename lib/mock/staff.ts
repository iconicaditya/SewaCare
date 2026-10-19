export interface Staff {
  id: string;
  employeeId: string;
  fullName: string;
  email: string;
  phone: string;
  gender: 'Male' | 'Female';
  address: string;
  jobTitle: string;
  department: string;
  role: string;
  joiningDate: string;
  employmentStatus: 'Full-time' | 'Part-time' | 'Contract';
  accountStatus: 'Active' | 'Inactive' | 'Suspended';
}

export const staff: Staff[] = [
  {
    id: 'STF-001', employeeId: 'EMP-001', fullName: 'Hari Prasad Neupane', email: 'hari.neupane@sewacare.com',
    phone: '9842001001', gender: 'Male', address: 'Kathmandu', jobTitle: 'Hospital Manager', department: 'Administration',
    role: 'Hospital Manager', joiningDate: '2020-01-15', employmentStatus: 'Full-time', accountStatus: 'Active',
  },
  {
    id: 'STF-002', employeeId: 'EMP-002', fullName: 'Sushila Bajracharya', email: 'sushila.bajracharya@sewacare.com',
    phone: '9842001002', gender: 'Female', address: 'Lalitpur', jobTitle: 'Senior Nurse', department: 'Nursing',
    role: 'Nurse', joiningDate: '2019-06-01', employmentStatus: 'Full-time', accountStatus: 'Active',
  },
  {
    id: 'STF-003', employeeId: 'EMP-003', fullName: 'Binod Paudel', email: 'binod.paudel@sewacare.com',
    phone: '9842001003', gender: 'Male', address: 'Bhaktapur', jobTitle: 'Lab Technician', department: 'Laboratory',
    role: 'Lab Technician', joiningDate: '2021-03-10', employmentStatus: 'Full-time', accountStatus: 'Active',
  },
  {
    id: 'STF-004', employeeId: 'EMP-004', fullName: 'Rita Karki', email: 'rita.karki@sewacare.com',
    phone: '9842001004', gender: 'Female', address: 'Pokhara', jobTitle: 'Receptionist', department: 'Administration',
    role: 'Receptionist', joiningDate: '2022-01-20', employmentStatus: 'Full-time', accountStatus: 'Active',
  },
  {
    id: 'STF-005', employeeId: 'EMP-005', fullName: 'Prakash Tamang', email: 'prakash.tamang@sewacare.com',
    phone: '9842001005', gender: 'Male', address: 'Kathmandu', jobTitle: 'Pharmacist', department: 'Pharmacy',
    role: 'Pharmacist', joiningDate: '2020-08-15', employmentStatus: 'Full-time', accountStatus: 'Active',
  },
  {
    id: 'STF-006', employeeId: 'EMP-006', fullName: 'Anju Shrestha', email: 'anju.shrestha@sewacare.com',
    phone: '9842001006', gender: 'Female', address: 'Bhaktapur', jobTitle: 'Accountant', department: 'Billing',
    role: 'Accountant', joiningDate: '2021-05-01', employmentStatus: 'Full-time', accountStatus: 'Active',
  },
  {
    id: 'STF-007', employeeId: 'EMP-007', fullName: 'Deepak Subedi', email: 'deepak.subedi@sewacare.com',
    phone: '9842001007', gender: 'Male', address: 'Chitwan', jobTitle: 'Radiology Technician', department: 'Radiology',
    role: 'Radiology Technician', joiningDate: '2020-11-10', employmentStatus: 'Full-time', accountStatus: 'Active',
  },
  {
    id: 'STF-008', employeeId: 'EMP-008', fullName: 'Sarita Bhandari', email: 'sarita.bhandari@sewacare.com',
    phone: '9842001008', gender: 'Female', address: 'Kathmandu', jobTitle: 'Nurse', department: 'Nursing',
    role: 'Nurse', joiningDate: '2022-04-01', employmentStatus: 'Full-time', accountStatus: 'Active',
  },
  {
    id: 'STF-009', employeeId: 'EMP-009', fullName: 'Manoj Basnet', email: 'manoj.basnet@sewacare.com',
    phone: '9842001009', gender: 'Male', address: 'Lalitpur', jobTitle: 'Inventory Manager', department: 'Inventory',
    role: 'Inventory Manager', joiningDate: '2021-09-15', employmentStatus: 'Full-time', accountStatus: 'Active',
  },
  {
    id: 'STF-010', employeeId: 'EMP-010', fullName: 'Laxmi Thapa', email: 'laxmi.thapa@sewacare.com',
    phone: '9842001010', gender: 'Female', address: 'Pokhara', jobTitle: 'HR Staff', department: 'HR',
    role: 'HR Staff', joiningDate: '2020-02-01', employmentStatus: 'Full-time', accountStatus: 'Active',
  },
  {
    id: 'STF-011', employeeId: 'EMP-011', fullName: 'Sunil Lama', email: 'sunil.lama@sewacare.com',
    phone: '9842001011', gender: 'Male', address: 'Kathmandu', jobTitle: 'OT Staff', department: 'Operation Theatre',
    role: 'OT Staff', joiningDate: '2021-07-01', employmentStatus: 'Full-time', accountStatus: 'Active',
  },
  {
    id: 'STF-012', employeeId: 'EMP-012', fullName: 'Kamala Dhungana', email: 'kamala.dhungana@sewacare.com',
    phone: '9842001012', gender: 'Female', address: 'Bhaktapur', jobTitle: 'Nurse', department: 'ICU',
    role: 'ICU Staff', joiningDate: '2019-12-01', employmentStatus: 'Full-time', accountStatus: 'Active',
  },
  {
    id: 'STF-013', employeeId: 'EMP-013', fullName: 'Rajan K.C.', email: 'rajan.kc@sewacare.com',
    phone: '9842001013', gender: 'Male', address: 'Lalitpur', jobTitle: 'Blood Bank Staff', department: 'Blood Bank',
    role: 'Blood Bank Staff', joiningDate: '2022-02-15', employmentStatus: 'Full-time', accountStatus: 'Active',
  },
  {
    id: 'STF-014', employeeId: 'EMP-014', fullName: 'Mina Gurung', email: 'mina.gurung@sewacare.com',
    phone: '9842001014', gender: 'Female', address: 'Kathmandu', jobTitle: 'Nurse', department: 'Nursing',
    role: 'Nurse', joiningDate: '2023-01-10', employmentStatus: 'Part-time', accountStatus: 'Active',
  },
  {
    id: 'STF-015', employeeId: 'EMP-015', fullName: 'Surendra Bista', email: 'surendra.bista@sewacare.com',
    phone: '9842001015', gender: 'Male', address: 'Chitwan', jobTitle: 'Pharmacy Assistant', department: 'Pharmacy',
    role: 'Pharmacist', joiningDate: '2023-06-01', employmentStatus: 'Full-time', accountStatus: 'Active',
  },
  {
    id: 'STF-016', employeeId: 'EMP-016', fullName: 'Nisha Hamal', email: 'nisha.hamal@sewacare.com',
    phone: '9842001016', gender: 'Female', address: 'Kathmandu', jobTitle: 'Receptionist', department: 'Administration',
    role: 'Receptionist', joiningDate: '2024-01-15', employmentStatus: 'Full-time', accountStatus: 'Active',
  },
  {
    id: 'STF-017', employeeId: 'EMP-017', fullName: 'Dipak Ranjitkar', email: 'dipak.ranjitkar@sewacare.com',
    phone: '9842001017', gender: 'Male', address: 'Lalitpur', jobTitle: 'Lab Technician', department: 'Laboratory',
    role: 'Lab Technician', joiningDate: '2022-09-01', employmentStatus: 'Full-time', accountStatus: 'Active',
  },
  {
    id: 'STF-018', employeeId: 'EMP-018', fullName: 'Sangita Pokharel', email: 'sangita.pokharel@sewacare.com',
    phone: '9842001018', gender: 'Female', address: 'Pokhara', jobTitle: 'Accountant', department: 'Billing',
    role: 'Accountant', joiningDate: '2023-03-01', employmentStatus: 'Contract', accountStatus: 'Active',
  },
  {
    id: 'STF-019', employeeId: 'EMP-019', fullName: 'Tilak Rana', email: 'tilak.rana@sewacare.com',
    phone: '9842001019', gender: 'Male', address: 'Bhaktapur', jobTitle: 'Security Guard', department: 'Administration',
    role: 'Administrator', joiningDate: '2024-06-01', employmentStatus: 'Full-time', accountStatus: 'Active',
  },
  {
    id: 'STF-020', employeeId: 'EMP-020', fullName: 'Parbati Chapai', email: 'parbati.chapai@sewacare.com',
    phone: '9842001020', gender: 'Female', address: 'Kathmandu', jobTitle: 'Nurse', department: 'Emergency',
    role: 'Nurse', joiningDate: '2021-11-01', employmentStatus: 'Full-time', accountStatus: 'Inactive',
  },
];
