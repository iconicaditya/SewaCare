export interface Invoice {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  items: { description: string; amount: number }[];
  totalAmount: number;
  discount: number;
  tax: number;
  grandTotal: number;
  status: 'Pending' | 'Partial' | 'Paid' | 'Cancelled';
  paidAmount: number;
}

export interface Payment {
  id: string;
  invoiceId: string;
  patientName: string;
  amount: number;
  method: 'Cash' | 'Card' | 'Online' | 'Insurance';
  date: string;
  reference: string;
  receivedBy: string;
}

export interface PendingPayment {
  id: string;
  invoiceId: string;
  patientName: string;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  dueDate: string;
  daysOverdue: number;
}

export interface BillingService {
  id: string;
  name: string;
  category: string;
  price: number;
  status: 'Active' | 'Inactive';
}

export interface Refund {
  id: string;
  invoiceId: string;
  patientName: string;
  amount: number;
  reason: string;
  processedBy: string;
  processedAt: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}

export const invoices: Invoice[] = [
  { id: 'INV-001', patientId: 'PAT-015', patientName: 'Laxman Basnet', date: '2026-09-12', items: [{ description: 'Emergency Consultation', amount: 1500 }, { description: 'ECG', amount: 400 }, { description: 'Blood Tests', amount: 1200 }, { description: 'X-Ray Chest', amount: 500 }, { description: 'ICU Stay (1 day)', amount: 8000 }], totalAmount: 11600, discount: 0, tax: 0, grandTotal: 11600, status: 'Partial', paidAmount: 5000 },
  { id: 'INV-002', patientId: 'PAT-013', patientName: 'Ashok Khatri', date: '2026-09-08', items: [{ description: 'Emergency Consultation', amount: 1500 }, { description: 'X-Ray Forearm', amount: 500 }, { description: 'CT Scan', amount: 3500 }, { description: 'Surgery - ORIF', amount: 25000 }, { description: 'Hospital Stay (5 days)', amount: 12500 }], totalAmount: 43000, discount: 0, tax: 0, grandTotal: 43000, status: 'Partial', paidAmount: 20000 },
  { id: 'INV-003', patientId: 'PAT-011', patientName: 'Gopal Bisht', date: '2026-08-30', items: [{ description: 'Cardiology Consultation', amount: 2000 }, { description: 'Angiography', amount: 15000 }, { description: 'CABG Surgery', amount: 150000 }, { description: 'ICU Stay (12 days)', amount: 96000 }, { description: 'Ward Stay (5 days)', amount: 12500 }], totalAmount: 275500, discount: 5000, tax: 0, grandTotal: 270500, status: 'Paid', paidAmount: 270500 },
  { id: 'INV-004', patientId: 'PAT-012', patientName: 'Nirmala Shrestha', date: '2026-09-11', items: [{ description: 'Orthopedics Consultation', amount: 1500 }, { description: 'X-Ray Both Knees', amount: 600 }, { description: 'Knee Replacement Surgery', amount: 120000 }, { description: 'Hospital Stay (7 days)', amount: 17500 }], totalAmount: 139600, discount: 0, tax: 0, grandTotal: 139600, status: 'Partial', paidAmount: 70000 },
  { id: 'INV-005', patientId: 'PAT-004', patientName: 'Anita Rai', date: '2026-09-13', items: [{ description: 'Gynecology Consultation', amount: 1500 }, { description: 'Ultrasound Pelvis', amount: 1500 }, { description: 'Blood Tests', amount: 800 }], totalAmount: 3800, discount: 0, tax: 0, grandTotal: 3800, status: 'Paid', paidAmount: 3800 },
  { id: 'INV-006', patientId: 'PAT-001', patientName: 'Ram Bahadur Thapa', date: '2026-09-10', items: [{ description: 'General Medicine Consultation', amount: 1000 }, { description: 'Blood Tests', amount: 500 }, { description: 'HbA1c', amount: 800 }], totalAmount: 2300, discount: 0, tax: 0, grandTotal: 2300, status: 'Paid', paidAmount: 2300 },
  { id: 'INV-007', patientId: 'PAT-003', patientName: 'Bikash Gurung', date: '2026-09-05', items: [{ description: 'Cardiology Consultation', amount: 2000 }, { description: 'ECG', amount: 400 }, { description: 'Echocardiography', amount: 3000 }, { description: 'Blood Tests', amount: 600 }], totalAmount: 6000, discount: 0, tax: 0, grandTotal: 6000, status: 'Paid', paidAmount: 6000 },
  { id: 'INV-008', patientId: 'PAT-009', patientName: 'Rajendra Prasad Poudel', date: '2026-09-06', items: [{ description: 'General Medicine Consultation', amount: 1000 }, { description: 'Ultrasound Abdomen', amount: 1500 }, { description: 'Blood Tests', amount: 400 }], totalAmount: 2900, discount: 0, tax: 0, grandTotal: 2900, status: 'Paid', paidAmount: 2900 },
  { id: 'INV-009', patientId: 'PAT-010', patientName: 'Sangita Limbu', date: '2026-09-12', items: [{ description: 'Dermatology Consultation', amount: 1500 }, { description: 'Skin Biopsy', amount: 2000 }], totalAmount: 3500, discount: 0, tax: 0, grandTotal: 3500, status: 'Pending', paidAmount: 0 },
  { id: 'INV-010', patientId: 'PAT-005', patientName: 'Krishna Prasad Adhikari', date: '2026-09-11', items: [{ description: 'General Medicine Consultation', amount: 1000 }, { description: 'HbA1c', amount: 800 }, { description: 'Renal Function Test', amount: 600 }, { description: 'Nerve Conduction Study', amount: 3000 }], totalAmount: 5400, discount: 0, tax: 0, grandTotal: 5400, status: 'Pending', paidAmount: 0 },
  { id: 'INV-011', patientId: 'PAT-006', patientName: 'Priya Magar', date: '2026-09-07', items: [{ description: 'General Medicine Consultation', amount: 1000 }, { description: 'Thyroid Profile', amount: 1200 }, { description: 'Lipid Profile', amount: 600 }], totalAmount: 2800, discount: 0, tax: 0, grandTotal: 2800, status: 'Paid', paidAmount: 2800 },
  { id: 'INV-012', patientId: 'PAT-014', patientName: 'Mina Chhetri', date: '2026-09-03', items: [{ description: 'General Medicine Consultation', amount: 1000 }, { description: 'Blood Tests', amount: 500 }, { description: 'Hospital Stay (3 days)', amount: 7500 }], totalAmount: 9000, discount: 0, tax: 0, grandTotal: 9000, status: 'Partial', paidAmount: 5000 },
  { id: 'INV-013', patientId: 'PAT-002', patientName: 'Sunita Sharma', date: '2026-09-08', items: [{ description: 'Pediatrics Consultation', amount: 1500 }, { description: 'CBC', amount: 500 }, { description: 'X-Ray Chest', amount: 500 }], totalAmount: 2500, discount: 0, tax: 0, grandTotal: 2500, status: 'Paid', paidAmount: 2500 },
  { id: 'INV-014', patientId: 'PAT-008', patientName: 'Deepa Karki', date: '2026-09-09', items: [{ description: 'Neurology Consultation', amount: 2000 }, { description: 'MRI Brain', amount: 8000 }, { description: 'Blood Tests', amount: 400 }], totalAmount: 10400, discount: 0, tax: 0, grandTotal: 10400, status: 'Paid', paidAmount: 10400 },
  { id: 'INV-015', patientId: 'PAT-007', patientName: 'Santosh Tamang', date: '2026-06-20', items: [{ description: 'Orthopedics Consultation', amount: 1500 }, { description: 'X-Ray Spine', amount: 600 }, { description: 'Hospital Stay (5 days)', amount: 12500 }], totalAmount: 14600, discount: 0, tax: 0, grandTotal: 14600, status: 'Paid', paidAmount: 14600 },
];

export const payments: Payment[] = [
  { id: 'PAY-001', invoiceId: 'INV-001', patientName: 'Laxman Basnet', amount: 5000, method: 'Cash', date: '2026-09-12', reference: 'CASH-001', receivedBy: 'Anju Shrestha' },
  { id: 'PAY-002', invoiceId: 'INV-002', patientName: 'Ashok Khatri', amount: 20000, method: 'Online', date: '2026-09-08', reference: 'NEPAL-001234', receivedBy: 'Anju Shrestha' },
  { id: 'PAY-003', invoiceId: 'INV-003', patientName: 'Gopal Bisht', amount: 150000, method: 'Insurance', date: '2026-08-30', reference: 'INS-CLAIM-001', receivedBy: 'Anju Shrestha' },
  { id: 'PAY-004', invoiceId: 'INV-003', patientName: 'Gopal Bisht', amount: 120500, method: 'Card', date: '2026-09-10', reference: 'CARD-4567', receivedBy: 'Anju Shrestha' },
  { id: 'PAY-005', invoiceId: 'INV-004', patientName: 'Nirmala Shrestha', amount: 70000, method: 'Online', date: '2026-09-11', reference: 'NEPAL-005678', receivedBy: 'Anju Shrestha' },
  { id: 'PAY-006', invoiceId: 'INV-005', patientName: 'Anita Rai', amount: 3800, method: 'Cash', date: '2026-09-13', reference: 'CASH-002', receivedBy: 'Anju Shrestha' },
  { id: 'PAY-007', invoiceId: 'INV-006', patientName: 'Ram Bahadur Thapa', amount: 2300, method: 'Cash', date: '2026-09-10', reference: 'CASH-003', receivedBy: 'Anju Shrestha' },
  { id: 'PAY-008', invoiceId: 'INV-007', patientName: 'Bikash Gurung', amount: 6000, method: 'Card', date: '2026-09-05', reference: 'CARD-8901', receivedBy: 'Anju Shrestha' },
  { id: 'PAY-009', invoiceId: 'INV-008', patientName: 'Rajendra Prasad Poudel', amount: 2900, method: 'Cash', date: '2026-09-06', reference: 'CASH-004', receivedBy: 'Anju Shrestha' },
  { id: 'PAY-010', invoiceId: 'INV-011', patientName: 'Priya Magar', amount: 2800, method: 'Online', date: '2026-09-07', reference: 'NEPAL-009012', receivedBy: 'Anju Shrestha' },
  { id: 'PAY-011', invoiceId: 'INV-012', patientName: 'Mina Chhetri', amount: 5000, method: 'Cash', date: '2026-09-03', reference: 'CASH-005', receivedBy: 'Anju Shrestha' },
  { id: 'PAY-012', invoiceId: 'INV-013', patientName: 'Sunita Sharma', amount: 2500, method: 'Cash', date: '2026-09-08', reference: 'CASH-006', receivedBy: 'Anju Shrestha' },
];

export const pendingPayments: PendingPayment[] = [
  { id: 'PP-001', invoiceId: 'INV-001', patientName: 'Laxman Basnet', totalAmount: 11600, paidAmount: 5000, pendingAmount: 6600, dueDate: '2026-09-19', daysOverdue: 0 },
  { id: 'PP-002', invoiceId: 'INV-002', patientName: 'Ashok Khatri', totalAmount: 43000, paidAmount: 20000, pendingAmount: 23000, dueDate: '2026-09-15', daysOverdue: 0 },
  { id: 'PP-003', invoiceId: 'INV-004', patientName: 'Nirmala Shrestha', totalAmount: 139600, paidAmount: 70000, pendingAmount: 69600, dueDate: '2026-09-18', daysOverdue: 0 },
  { id: 'PP-004', invoiceId: 'INV-009', patientName: 'Sangita Limbu', totalAmount: 3500, paidAmount: 0, pendingAmount: 3500, dueDate: '2026-09-12', daysOverdue: 1 },
  { id: 'PP-005', invoiceId: 'INV-010', patientName: 'Krishna Prasad Adhikari', totalAmount: 5400, paidAmount: 0, pendingAmount: 5400, dueDate: '2026-09-11', daysOverdue: 2 },
];

export const billingServices: BillingService[] = [
  { id: 'BS-001', name: 'General Consultation', category: 'Consultation', price: 1000, status: 'Active' },
  { id: 'BS-002', name: 'Specialist Consultation', category: 'Consultation', price: 1500, status: 'Active' },
  { id: 'BS-003', name: 'Cardiology Consultation', category: 'Consultation', price: 2000, status: 'Active' },
  { id: 'BS-004', name: 'Emergency Consultation', category: 'Consultation', price: 1500, status: 'Active' },
  { id: 'BS-005', name: 'ECG', category: 'Diagnostic', price: 400, status: 'Active' },
  { id: 'BS-006', name: 'X-Ray', category: 'Diagnostic', price: 500, status: 'Active' },
  { id: 'BS-007', name: 'Ultrasound', category: 'Diagnostic', price: 1500, status: 'Active' },
  { id: 'BS-008', name: 'CT Scan', category: 'Diagnostic', price: 3500, status: 'Active' },
  { id: 'BS-009', name: 'MRI', category: 'Diagnostic', price: 8000, status: 'Active' },
  { id: 'BS-010', name: 'ICU per day', category: 'Ward', price: 8000, status: 'Active' },
];

export const refunds: Refund[] = [
  { id: 'REF-001', invoiceId: 'INV-005', patientName: 'Anita Rai', amount: 500, reason: 'Overcharged for lab test - corrected pricing', processedBy: 'Anju Shrestha', processedAt: '2026-09-13 10:00', status: 'Approved' },
  { id: 'REF-002', invoiceId: 'INV-007', patientName: 'Bikash Gurung', amount: 200, reason: 'Duplicate charge for ECG', processedBy: 'Anju Shrestha', processedAt: '2026-09-12 14:00', status: 'Approved' },
  { id: 'REF-003', invoiceId: 'INV-009', patientName: 'Sangita Limbu', amount: 3500, reason: 'Service cancelled by patient before billing', processedBy: 'Anju Shrestha', processedAt: '2026-09-13 11:00', status: 'Pending' },
];
