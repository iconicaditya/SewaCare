export interface LeaveRecord {
  id: string;
  staffId: string;
  staffName: string;
  department: string;
  leaveType: 'Annual' | 'Sick' | 'Maternity' | 'Paternity' | 'Unpaid' | 'Emergency';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  approvedBy: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';
  appliedDate: string;
}

export const leaveRecords: LeaveRecord[] = [
  { id: 'LV-001', staffId: 'STF-014', staffName: 'Mina Gurung', department: 'Nursing', leaveType: 'Annual', startDate: '2026-09-13', endDate: '2026-09-15', days: 3, reason: 'Family function', approvedBy: 'Sushila Bajracharya', status: 'Approved', appliedDate: '2026-09-10' },
  { id: 'LV-002', staffId: 'STF-007', staffName: 'Deepak Subedi', department: 'Radiology', leaveType: 'Sick', startDate: '2026-09-14', endDate: '2026-09-14', days: 1, reason: 'Fever and cold', approvedBy: 'Hari Prasad Neupane', status: 'Approved', appliedDate: '2026-09-13' },
  { id: 'LV-003', staffId: 'STF-004', staffName: 'Rita Karki', department: 'Administration', leaveType: 'Annual', startDate: '2026-09-20', endDate: '2026-09-22', days: 3, reason: 'Personal vacation', approvedBy: 'Hari Prasad Neupane', status: 'Pending', appliedDate: '2026-09-12' },
  { id: 'LV-004', staffId: 'STF-010', staffName: 'Laxmi Thapa', department: 'HR', leaveType: 'Sick', startDate: '2026-09-08', endDate: '2026-09-09', days: 2, reason: 'Migraine', approvedBy: 'Hari Prasad Neupane', status: 'Approved', appliedDate: '2026-09-08' },
  { id: 'LV-005', staffId: 'STF-008', staffName: 'Sarita Bhandari', department: 'Nursing', leaveType: 'Annual', startDate: '2026-09-25', endDate: '2026-09-27', days: 3, reason: 'Family visit', approvedBy: '', status: 'Pending', appliedDate: '2026-09-13' },
  { id: 'LV-006', staffId: 'STF-015', staffName: 'Surendra Bista', department: 'Pharmacy', leaveType: 'Emergency', startDate: '2026-09-06', endDate: '2026-09-06', days: 1, reason: 'Family emergency', approvedBy: 'Prakash Tamang', status: 'Approved', appliedDate: '2026-09-06' },
  { id: 'LV-007', staffId: 'STF-017', staffName: 'Dipak Ranjitkar', department: 'Laboratory', leaveType: 'Sick', startDate: '2026-09-13', endDate: '2026-09-13', days: 1, reason: 'Stomach ache', approvedBy: '', status: 'Pending', appliedDate: '2026-09-13' },
  { id: 'LV-008', staffId: 'STF-019', staffName: 'Tilak Rana', department: 'Administration', leaveType: 'Annual', startDate: '2026-10-01', endDate: '2026-10-05', days: 5, reason: 'Dashain festival', approvedBy: 'Hari Prasad Neupane', status: 'Approved', appliedDate: '2026-09-10' },
];
