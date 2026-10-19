export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  visitType: 'New Visit' | 'Follow-up' | 'Emergency';
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'No-show';
  notes: string;
}

export const appointments: Appointment[] = [
  { id: 'APT-001', patientId: 'PAT-001', patientName: 'Ram Bahadur Thapa', doctorId: 'DOC-001', doctorName: 'Dr. Aarav Shrestha', department: 'General Medicine', date: '2026-09-14', time: '09:00', visitType: 'Follow-up', status: 'Scheduled', notes: 'Diabetes follow-up' },
  { id: 'APT-002', patientId: 'PAT-002', patientName: 'Sunita Sharma', doctorId: 'DOC-003', doctorName: 'Dr. Priya Bhandari', department: 'Pediatrics', date: '2026-09-14', time: '10:00', visitType: 'New Visit', status: 'Scheduled', notes: 'Child vaccination' },
  { id: 'APT-003', patientId: 'PAT-003', patientName: 'Bikash Gurung', doctorId: 'DOC-002', doctorName: 'Dr. Suman Koirala', department: 'Cardiology', date: '2026-09-14', time: '11:30', visitType: 'Follow-up', status: 'Scheduled', notes: 'Heart checkup' },
  { id: 'APT-004', patientId: 'PAT-004', patientName: 'Anita Rai', doctorId: 'DOC-005', doctorName: 'Dr. Anjali Thapa', department: 'Gynecology', date: '2026-09-13', time: '09:30', visitType: 'New Visit', status: 'Completed', notes: 'Routine checkup' },
  { id: 'APT-005', patientId: 'PAT-005', patientName: 'Krishna Prasad Adhikari', doctorId: 'DOC-001', doctorName: 'Dr. Aarav Shrestha', department: 'General Medicine', date: '2026-09-13', time: '10:00', visitType: 'Follow-up', status: 'Completed', notes: 'Blood pressure monitoring' },
  { id: 'APT-006', patientId: 'PAT-006', patientName: 'Priya Magar', doctorId: 'DOC-001', doctorName: 'Dr. Aarav Shrestha', department: 'General Medicine', date: '2026-09-13', time: '14:00', visitType: 'New Visit', status: 'Completed', notes: 'Thyroid consultation' },
  { id: 'APT-007', patientId: 'PAT-008', patientName: 'Deepa Karki', doctorId: 'DOC-006', doctorName: 'Dr. Bikram Rai', department: 'Neurology', date: '2026-09-15', time: '11:00', visitType: 'New Visit', status: 'Scheduled', notes: 'Migraine consultation' },
  { id: 'APT-008', patientId: 'PAT-009', patientName: 'Rajendra Prasad Poudel', doctorId: 'DOC-001', doctorName: 'Dr. Aarav Shrestha', department: 'General Medicine', date: '2026-09-15', time: '09:00', visitType: 'Follow-up', status: 'Scheduled', notes: 'Kidney stone follow-up' },
  { id: 'APT-009', patientId: 'PAT-010', patientName: 'Sangita Limbu', doctorId: 'DOC-008', doctorName: 'Dr. Sanjay Adhikari', department: 'Dermatology', date: '2026-09-12', time: '15:00', visitType: 'New Visit', status: 'Completed', notes: 'Skin allergy consultation' },
  { id: 'APT-010', patientId: 'PAT-011', patientName: 'Gopal Bisht', doctorId: 'DOC-002', doctorName: 'Dr. Suman Koirala', department: 'Cardiology', date: '2026-09-16', time: '10:00', visitType: 'Follow-up', status: 'Scheduled', notes: 'Post-surgery checkup' },
  { id: 'APT-011', patientId: 'PAT-012', patientName: 'Nirmala Shrestha', doctorId: 'DOC-004', doctorName: 'Dr. Rajesh Maharjan', department: 'Orthopedics', date: '2026-09-12', time: '13:00', visitType: 'Follow-up', status: 'Cancelled', notes: 'Knee pain follow-up - cancelled by patient' },
  { id: 'APT-012', patientId: 'PAT-013', patientName: 'Ashok Khatri', doctorId: 'DOC-007', doctorName: 'Dr. Meena Joshi', department: 'ENT', date: '2026-09-11', time: '11:00', visitType: 'New Visit', status: 'No-show', notes: 'Ear pain consultation' },
  { id: 'APT-013', patientId: 'PAT-014', patientName: 'Mina Chhetri', doctorId: 'DOC-001', doctorName: 'Dr. Aarav Shrestha', department: 'General Medicine', date: '2026-09-17', time: '09:30', visitType: 'New Visit', status: 'Scheduled', notes: 'Joint pain consultation' },
  { id: 'APT-014', patientId: 'PAT-015', patientName: 'Laxman Basnet', doctorId: 'DOC-002', doctorName: 'Dr. Suman Koirala', department: 'Cardiology', date: '2026-09-13', time: '14:30', visitType: 'Emergency', status: 'Completed', notes: 'Chest pain - emergency consultation' },
  { id: 'APT-015', patientId: 'PAT-001', patientName: 'Ram Bahadur Thapa', doctorId: 'DOC-009', doctorName: 'Dr. Kabita Gurung', department: 'Ophthalmology', date: '2026-09-10', time: '10:00', visitType: 'New Visit', status: 'Completed', notes: 'Eye checkup' },
  { id: 'APT-016', patientId: 'PAT-005', patientName: 'Krishna Prasad Adhikari', doctorId: 'DOC-010', doctorName: 'Dr. Dinesh Poudel', department: 'Emergency', date: '2026-09-12', time: '22:00', visitType: 'Emergency', status: 'Completed', notes: 'Breathing difficulty - emergency' },
  { id: 'APT-017', patientId: 'PAT-003', patientName: 'Bikash Gurung', doctorId: 'DOC-004', doctorName: 'Dr. Rajesh Maharjan', department: 'Orthopedics', date: '2026-09-18', time: '14:00', visitType: 'Follow-up', status: 'Scheduled', notes: 'Post-fracture review' },
  { id: 'APT-018', patientId: 'PAT-008', patientName: 'Deepa Karki', doctorId: 'DOC-005', doctorName: 'Dr. Anjali Thapa', department: 'Gynecology', date: '2026-09-09', time: '09:00', visitType: 'Follow-up', status: 'Completed', notes: 'Routine gynecological checkup' },
  { id: 'APT-019', patientId: 'PAT-007', patientName: 'Santosh Tamang', doctorId: 'DOC-004', doctorName: 'Dr. Rajesh Maharjan', department: 'Orthopedics', date: '2026-09-08', time: '11:00', visitType: 'Follow-up', status: 'Completed', notes: 'Back injury recovery' },
  { id: 'APT-020', patientId: 'PAT-006', patientName: 'Priya Magar', doctorId: 'DOC-003', doctorName: 'Dr. Priya Bhandari', department: 'Pediatrics', date: '2026-09-19', time: '10:30', visitType: 'New Visit', status: 'Scheduled', notes: 'Pediatric consultation for son' },
];
