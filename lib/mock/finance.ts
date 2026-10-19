export interface RevenueRecord {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  source: string;
  paymentMethod: string;
  status: 'Received' | 'Pending' | 'Overdue';
}

export interface ExpenseRecord {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  vendor: string;
  paymentMethod: string;
  approvedBy: string;
  status: 'Paid' | 'Pending' | 'Approved';
}

export const revenueRecords: RevenueRecord[] = [
  { id: 'REV-001', date: '2026-09-13', category: 'Consultation', description: 'OPD consultation fees - 15 patients', amount: 18000, source: 'OPD', paymentMethod: 'Mixed', status: 'Received' },
  { id: 'REV-002', date: '2026-09-13', category: 'Laboratory', description: 'Lab tests - CBC, Biochemistry, Culture', amount: 12500, source: 'Laboratory', paymentMethod: 'Cash', status: 'Received' },
  { id: 'REV-003', date: '2026-09-13', category: 'Radiology', description: 'X-Ray, Ultrasound, ECG procedures', amount: 8000, source: 'Radiology', paymentMethod: 'Card', status: 'Received' },
  { id: 'REV-004', date: '2026-09-13', category: 'Pharmacy', description: 'Medicine sales - 45 prescriptions', amount: 25000, source: 'Pharmacy', paymentMethod: 'Mixed', status: 'Received' },
  { id: 'REV-005', date: '2026-09-13', category: 'Surgery', description: 'OT procedures - 1 completed surgery', amount: 35000, source: 'OT', paymentMethod: 'Insurance', status: 'Received' },
  { id: 'REV-006', date: '2026-09-12', category: 'Admission', description: 'New admissions - 3 patients', amount: 15000, source: 'Admission', paymentMethod: 'Mixed', status: 'Received' },
  { id: 'REV-007', date: '2026-09-12', category: 'Ward', description: 'Ward charges - 45 patients', amount: 112500, source: 'Ward', paymentMethod: 'Mixed', status: 'Pending' },
  { id: 'REV-008', date: '2026-09-12', category: 'ICU', description: 'ICU charges - 5 patients', amount: 40000, source: 'ICU', paymentMethod: 'Insurance', status: 'Pending' },
  { id: 'REV-009', date: '2026-09-11', category: 'Consultation', description: 'OPD consultation fees - 12 patients', amount: 15000, source: 'OPD', paymentMethod: 'Cash', status: 'Received' },
  { id: 'REV-010', date: '2026-09-11', category: 'Emergency', description: 'Emergency consultations - 8 patients', amount: 12000, source: 'Emergency', paymentMethod: 'Mixed', status: 'Received' },
];

export const expenseRecords: ExpenseRecord[] = [
  { id: 'EXP-001', date: '2026-09-13', category: 'Staff Salary', description: 'Monthly salary disbursement - Nursing department', amount: 450000, vendor: 'Internal', paymentMethod: 'Bank Transfer', approvedBy: 'Hari Prasad Neupane', status: 'Paid' },
  { id: 'EXP-002', date: '2026-09-13', category: 'Medical Supplies', description: 'IV fluids and consumables - Nepal Pharma Distributors', amount: 4000, vendor: 'Nepal Pharma Distributors', paymentMethod: 'Online', approvedBy: 'Manoj Basnet', status: 'Paid' },
  { id: 'EXP-003', date: '2026-09-12', category: 'Equipment Maintenance', description: 'Autoclave repair - Steris Service', amount: 12000, vendor: 'Steris Service', paymentMethod: 'Cash', approvedBy: 'Manoj Basnet', status: 'Paid' },
  { id: 'EXP-004', date: '2026-09-12', category: 'Utilities', description: 'Electricity bill - September', amount: 85000, vendor: 'NEA', paymentMethod: 'Online', approvedBy: 'Hari Prasad Neupane', status: 'Pending' },
  { id: 'EXP-005', date: '2026-09-11', category: 'Medical Supplies', description: 'PPE and surgical gloves - MediSupply Nepal', amount: 14000, vendor: 'MediSupply Nepal', paymentMethod: 'Online', approvedBy: 'Manoj Basnet', status: 'Paid' },
  { id: 'EXP-006', date: '2026-09-11', category: 'Staff Training', description: 'CPR training program - 20 staff', amount: 25000, vendor: 'Red Cross Nepal', paymentMethod: 'Cash', approvedBy: 'Hari Prasad Neupane', status: 'Paid' },
  { id: 'EXP-007', date: '2026-09-10', category: 'Pharmacy', description: 'Medicine procurement - Himalaya Pharma', amount: 150000, vendor: 'Himalaya Pharma', paymentMethod: 'Bank Transfer', approvedBy: 'Prakash Tamang', status: 'Paid' },
  { id: 'EXP-008', date: '2026-09-10', category: 'Housekeeping', description: 'Cleaning supplies and services', amount: 15000, vendor: 'CleanPro Services', paymentMethod: 'Cash', approvedBy: 'Hari Prasad Neupane', status: 'Approved' },
  { id: 'EXP-009', date: '2026-09-09', category: 'IT Support', description: 'Server maintenance and software license renewal', amount: 35000, vendor: 'TechNepal Solutions', paymentMethod: 'Online', approvedBy: 'Hari Prasad Neupane', status: 'Paid' },
  { id: 'EXP-010', date: '2026-09-08', category: 'Marketing', description: 'Website update and social media campaign', amount: 20000, vendor: 'Digital Nepal Agency', paymentMethod: 'Online', approvedBy: 'Hari Prasad Neupane', status: 'Paid' },
];
