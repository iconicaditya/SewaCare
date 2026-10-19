export interface AttendanceRecord {
  id: string;
  staffId: string;
  staffName: string;
  department: string;
  date: string;
  clockIn: string;
  clockOut: string;
  hoursWorked: number;
  status: 'Present' | 'Absent' | 'Late' | 'Half Day' | 'On Leave';
  overtime: number;
  notes: string;
}

export const attendanceRecords: AttendanceRecord[] = [
  { id: 'ATT-001', staffId: 'STF-001', staffName: 'Hari Prasad Neupane', department: 'Administration', date: '2026-09-13', clockIn: '08:55', clockOut: '', hoursWorked: 0, status: 'Present', overtime: 0, notes: '' },
  { id: 'ATT-002', staffId: 'STF-002', staffName: 'Sushila Bajracharya', department: 'Nursing', date: '2026-09-13', clockIn: '07:55', clockOut: '', hoursWorked: 0, status: 'Present', overtime: 0, notes: 'Morning shift' },
  { id: 'ATT-003', staffId: 'STF-003', staffName: 'Binod Paudel', department: 'Laboratory', date: '2026-09-13', clockIn: '08:30', clockOut: '', hoursWorked: 0, status: 'Present', overtime: 0, notes: '' },
  { id: 'ATT-004', staffId: 'STF-004', staffName: 'Rita Karki', department: 'Administration', date: '2026-09-13', clockIn: '09:15', clockOut: '', hoursWorked: 0, status: 'Late', overtime: 0, notes: 'Arrived 15 minutes late' },
  { id: 'ATT-005', staffId: 'STF-005', staffName: 'Prakash Tamang', department: 'Pharmacy', date: '2026-09-13', clockIn: '08:50', clockOut: '', hoursWorked: 0, status: 'Present', overtime: 0, notes: '' },
  { id: 'ATT-006', staffId: 'STF-006', staffName: 'Anju Shrestha', department: 'Billing', date: '2026-09-13', clockIn: '08:45', clockOut: '', hoursWorked: 0, status: 'Present', overtime: 0, notes: '' },
  { id: 'ATT-007', staffId: 'STF-007', staffName: 'Deepak Subedi', department: 'Radiology', date: '2026-09-13', clockIn: '08:00', clockOut: '', hoursWorked: 0, status: 'Present', overtime: 0, notes: '' },
  { id: 'ATT-008', staffId: 'STF-008', staffName: 'Sarita Bhandari', department: 'Nursing', date: '2026-09-13', clockIn: '07:50', clockOut: '', hoursWorked: 0, status: 'Present', overtime: 0, notes: '' },
  { id: 'ATT-009', staffId: 'STF-009', staffName: 'Manoj Basnet', department: 'Inventory', date: '2026-09-13', clockIn: '08:30', clockOut: '', hoursWorked: 0, status: 'Present', overtime: 0, notes: '' },
  { id: 'ATT-010', staffId: 'STF-010', staffName: 'Laxmi Thapa', department: 'HR', date: '2026-09-13', clockIn: '09:00', clockOut: '', hoursWorked: 0, status: 'Present', overtime: 0, notes: '' },
  { id: 'ATT-011', staffId: 'STF-011', staffName: 'Sunil Lama', department: 'Operation Theatre', date: '2026-09-13', clockIn: '07:45', clockOut: '', hoursWorked: 0, status: 'Present', overtime: 0, notes: 'OT preparation' },
  { id: 'ATT-012', staffId: 'STF-012', staffName: 'Kamala Dhungana', department: 'ICU', date: '2026-09-13', clockIn: '07:55', clockOut: '', hoursWorked: 0, status: 'Present', overtime: 0, notes: 'Night shift handover' },
  { id: 'ATT-013', staffId: 'STF-013', staffName: 'Rajan K.C.', department: 'Blood Bank', date: '2026-09-13', clockIn: '08:30', clockOut: '', hoursWorked: 0, status: 'Present', overtime: 0, notes: '' },
  { id: 'ATT-014', staffId: 'STF-014', staffName: 'Mina Gurung', department: 'Nursing', date: '2026-09-13', clockIn: '', clockOut: '', hoursWorked: 0, status: 'On Leave', overtime: 0, notes: 'Personal leave' },
  { id: 'ATT-015', staffId: 'STF-015', staffName: 'Surendra Bista', department: 'Pharmacy', date: '2026-09-13', clockIn: '08:55', clockOut: '', hoursWorked: 0, status: 'Present', overtime: 0, notes: '' },
  { id: 'ATT-016', staffId: 'STF-016', staffName: 'Nisha Hamal', department: 'Administration', date: '2026-09-13', clockIn: '08:40', clockOut: '', hoursWorked: 0, status: 'Present', overtime: 0, notes: '' },
  { id: 'ATT-017', staffId: 'STF-017', staffName: 'Dipak Ranjitkar', department: 'Laboratory', date: '2026-09-13', clockIn: '', clockOut: '', hoursWorked: 0, status: 'Absent', overtime: 0, notes: 'No prior notification' },
  { id: 'ATT-018', staffId: 'STF-018', staffName: 'Sangita Pokharel', department: 'Billing', date: '2026-09-13', clockIn: '09:00', clockOut: '', hoursWorked: 0, status: 'Present', overtime: 0, notes: '' },
  { id: 'ATT-019', staffId: 'STF-019', staffName: 'Tilak Rana', department: 'Administration', date: '2026-09-13', clockIn: '06:00', clockOut: '', hoursWorked: 0, status: 'Present', overtime: 0, notes: 'Security shift - early start' },
  { id: 'ATT-020', staffId: 'STF-020', staffName: 'Parbati Chapai', department: 'Emergency', date: '2026-09-13', clockIn: '08:00', clockOut: '', hoursWorked: 0, status: 'Present', overtime: 0, notes: '' },
];
