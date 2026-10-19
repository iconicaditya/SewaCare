export interface Document {
  id: string;
  name: string;
  type: 'Lab Report' | 'Discharge Summary' | 'Prescription' | 'X-Ray Report' | 'Insurance Document' | 'Consent Form' | 'Referral Letter' | 'Medical Certificate' | 'Bill' | 'Other';
  patientName: string;
  patientId: string;
  uploadedBy: string;
  uploadedAt: string;
  fileSize: string;
  fileType: string;
  status: 'Active' | 'Archived';
}

export const documents: Document[] = [
  { id: 'DOC-001', name: 'HbA1c Report - Ram Bahadur Thapa', type: 'Lab Report', patientName: 'Ram Bahadur Thapa', patientId: 'PAT-001', uploadedBy: 'Binod Paudel', uploadedAt: '2026-09-10', fileSize: '245 KB', fileType: 'PDF', status: 'Active' },
  { id: 'DOC-002', name: 'Discharge Summary - Santosh Tamang', type: 'Discharge Summary', patientName: 'Santosh Tamang', patientId: 'PAT-007', uploadedBy: 'Dr. Rajesh Maharjan', uploadedAt: '2026-09-10', fileSize: '380 KB', fileType: 'PDF', status: 'Active' },
  { id: 'DOC-003', name: 'ECG Report - Bikash Gurung', type: 'Lab Report', patientName: 'Bikash Gurung', patientId: 'PAT-003', uploadedBy: 'Binod Paudel', uploadedAt: '2026-09-05', fileSize: '520 KB', fileType: 'PDF', status: 'Active' },
  { id: 'DOC-004', name: 'X-Ray Chest - Laxman Basnet', type: 'X-Ray Report', patientName: 'Laxman Basnet', patientId: 'PAT-015', uploadedBy: 'Deepak Subedi', uploadedAt: '2026-09-12', fileSize: '1.2 MB', fileType: 'DICOM', status: 'Active' },
  { id: 'DOC-005', name: 'Insurance Policy - Gopal Bisht', type: 'Insurance Document', patientName: 'Gopal Bisht', patientId: 'PAT-011', uploadedBy: 'Anju Shrestha', uploadedAt: '2026-09-01', fileSize: '180 KB', fileType: 'PDF', status: 'Active' },
  { id: 'DOC-006', name: 'Surgery Consent - Nirmala Shrestha', type: 'Consent Form', patientName: 'Nirmala Shrestha', patientId: 'PAT-012', uploadedBy: 'Dr. Rajesh Maharjan', uploadedAt: '2026-09-10', fileSize: '95 KB', fileType: 'PDF', status: 'Active' },
  { id: 'DOC-007', name: 'Referral Letter - Mina Chhetri', type: 'Referral Letter', patientName: 'Mina Chhetri', patientId: 'PAT-014', uploadedBy: 'Dr. Aarav Shrestha', uploadedAt: '2026-09-03', fileSize: '120 KB', fileType: 'PDF', status: 'Active' },
  { id: 'DOC-008', name: 'Prescription - Priya Magar', type: 'Prescription', patientName: 'Priya Magar', patientId: 'PAT-006', uploadedBy: 'Dr. Aarav Shrestha', uploadedAt: '2026-09-07', fileSize: '85 KB', fileType: 'PDF', status: 'Active' },
  { id: 'DOC-009', name: 'Invoice INV-003 - Gopal Bisht', type: 'Bill', patientName: 'Gopal Bisht', patientId: 'PAT-011', uploadedBy: 'Anju Shrestha', uploadedAt: '2026-08-30', fileSize: '150 KB', fileType: 'PDF', status: 'Active' },
  { id: 'DOC-010', name: 'Medical Certificate - Ashok Khatri', type: 'Medical Certificate', patientName: 'Ashok Khatri', patientId: 'PAT-013', uploadedBy: 'Dr. Dinesh Poudel', uploadedAt: '2026-09-09', fileSize: '110 KB', fileType: 'PDF', status: 'Active' },
];
