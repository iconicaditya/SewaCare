export interface LabTest {
  id: string;
  name: string;
  category: string;
  price: number;
  sampleType: string;
  turnaroundTime: string;
  status: 'Active' | 'Inactive';
}

export interface LabOrder {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  tests: string[];
  orderDate: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
  priority: 'Routine' | 'Urgent' | 'STAT';
}

export interface SampleCollection {
  id: string;
  orderId: string;
  patientName: string;
  sampleType: string;
  collectedBy: string;
  collectedAt: string;
  status: 'Collected' | 'Received' | 'Rejected';
}

export interface LabReport {
  id: string;
  orderId: string;
  patientName: string;
  tests: { name: string; value: string; unit: string; referenceRange: string; status: 'Normal' | 'Abnormal' | 'Critical' }[];
  reportedBy: string;
  reportedDate: string;
  verifiedBy: string;
  status: 'Draft' | 'Verified' | 'Amended';
}

export const labTests: LabTest[] = [
  { id: 'LBT-001', name: 'Complete Blood Count (CBC)', category: 'Hematology', price: 500, sampleType: 'Blood', turnaroundTime: '4 hours', status: 'Active' },
  { id: 'LBT-002', name: 'Fasting Blood Sugar', category: 'Biochemistry', price: 200, sampleType: 'Blood', turnaroundTime: '2 hours', status: 'Active' },
  { id: 'LBT-003', name: 'HbA1c', category: 'Biochemistry', price: 800, sampleType: 'Blood', turnaroundTime: '24 hours', status: 'Active' },
  { id: 'LBT-004', name: 'Lipid Profile', category: 'Biochemistry', price: 600, sampleType: 'Blood', turnaroundTime: '6 hours', status: 'Active' },
  { id: 'LBT-005', name: 'Thyroid Profile (TSH, T3, T4)', category: 'Endocrinology', price: 1200, sampleType: 'Blood', turnaroundTime: '24 hours', status: 'Active' },
  { id: 'LBT-006', name: 'Liver Function Test', category: 'Biochemistry', price: 700, sampleType: 'Blood', turnaroundTime: '6 hours', status: 'Active' },
  { id: 'LBT-007', name: 'Renal Function Test', category: 'Biochemistry', price: 600, sampleType: 'Blood', turnaroundTime: '6 hours', status: 'Active' },
  { id: 'LBT-008', name: 'Urinalysis', category: 'Clinical Pathology', price: 150, sampleType: 'Urine', turnaroundTime: '1 hour', status: 'Active' },
  { id: 'LBT-009', name: 'ECG', category: 'Cardiology', price: 400, sampleType: 'N/A', turnaroundTime: '30 minutes', status: 'Active' },
  { id: 'LBT-010', name: 'X-Ray Chest', category: 'Radiology', price: 500, sampleType: 'N/A', turnaroundTime: '2 hours', status: 'Active' },
  { id: 'LBT-011', name: 'Blood Group & Cross Match', category: 'Blood Bank', price: 300, sampleType: 'Blood', turnaroundTime: '1 hour', status: 'Active' },
  { id: 'LBT-012', name: 'ESR', category: 'Hematology', price: 100, sampleType: 'Blood', turnaroundTime: '1 hour', status: 'Active' },
  { id: 'LBT-013', name: 'CRP', category: 'Immunology', price: 400, sampleType: 'Blood', turnaroundTime: '4 hours', status: 'Active' },
  { id: 'LBT-014', name: 'Blood Culture', category: 'Microbiology', price: 800, sampleType: 'Blood', turnaroundTime: '48 hours', status: 'Active' },
  { id: 'LBT-015', name: 'Stool Routine', category: 'Clinical Pathology', price: 150, sampleType: 'Stool', turnaroundTime: '2 hours', status: 'Active' },
  { id: 'LBT-016', name: 'Serum Creatinine', category: 'Biochemistry', price: 200, sampleType: 'Blood', turnaroundTime: '2 hours', status: 'Active' },
  { id: 'LBT-017', name: 'Vitamin D', category: 'Endocrinology', price: 1500, sampleType: 'Blood', turnaroundTime: '48 hours', status: 'Active' },
  { id: 'LBT-018', name: 'Vitamin B12', category: 'Endocrinology', price: 1200, sampleType: 'Blood', turnaroundTime: '48 hours', status: 'Active' },
  { id: 'LBT-019', name: 'Pregnancy Test (β-hCG)', category: 'Endocrinology', price: 300, sampleType: 'Urine', turnaroundTime: '30 minutes', status: 'Active' },
  { id: 'LBT-020', name: 'Dengue NS1 Antigen', category: 'Microbiology', price: 600, sampleType: 'Blood', turnaroundTime: '4 hours', status: 'Active' },
];

export const labOrders: LabOrder[] = [
  { id: 'LABO-001', patientId: 'PAT-001', patientName: 'Ram Bahadur Thapa', doctorName: 'Dr. Aarav Shrestha', tests: ['HbA1c', 'Fasting Blood Sugar', 'Lipid Profile'], orderDate: '2026-09-10', status: 'Completed', priority: 'Routine' },
  { id: 'LABO-002', patientId: 'PAT-003', patientName: 'Bikash Gurung', doctorName: 'Dr. Suman Koirala', tests: ['ECG', 'Lipid Profile'], orderDate: '2026-09-05', status: 'Completed', priority: 'Routine' },
  { id: 'LABO-003', patientId: 'PAT-004', patientName: 'Anita Rai', doctorName: 'Dr. Anjali Thapa', tests: ['CBC', 'Thyroid Profile'], orderDate: '2026-09-13', status: 'In Progress', priority: 'Routine' },
  { id: 'LABO-004', patientId: 'PAT-005', patientName: 'Krishna Prasad Adhikari', doctorName: 'Dr. Aarav Shrestha', tests: ['HbA1c', 'Renal Function Test'], orderDate: '2026-09-11', status: 'Completed', priority: 'Urgent' },
  { id: 'LABO-005', patientId: 'PAT-009', patientName: 'Rajendra Prasad Poudel', doctorName: 'Dr. Aarav Shrestha', tests: ['Urinalysis', 'Serum Creatinine'], orderDate: '2026-09-06', status: 'Completed', priority: 'Routine' },
  { id: 'LABO-006', patientId: 'PAT-015', patientName: 'Laxman Basnet', doctorName: 'Dr. Suman Koirala', tests: ['ECG', 'CBC', 'Cardiac Enzymes'], orderDate: '2026-09-12', status: 'Completed', priority: 'STAT' },
  { id: 'LABO-007', patientId: 'PAT-010', patientName: 'Sangita Limbu', doctorName: 'Dr. Sanjay Adhikari', tests: ['CBC', 'ESR', 'CRP'], orderDate: '2026-09-12', status: 'In Progress', priority: 'Routine' },
  { id: 'LABO-008', patientId: 'PAT-006', patientName: 'Priya Magar', doctorName: 'Dr. Aarav Shrestha', tests: ['Thyroid Profile', 'Lipid Profile'], orderDate: '2026-09-07', status: 'Completed', priority: 'Routine' },
  { id: 'LABO-009', patientId: 'PAT-008', patientName: 'Deepa Karki', doctorName: 'Dr. Bikram Rai', tests: ['CBC', 'Vitamin D', 'Vitamin B12'], orderDate: '2026-09-09', status: 'Pending', priority: 'Routine' },
  { id: 'LABO-010', patientId: 'PAT-012', patientName: 'Nirmala Shrestha', doctorName: 'Dr. Rajesh Maharjan', tests: ['ESR', 'CRP'], orderDate: '2026-09-10', status: 'Completed', priority: 'Routine' },
  { id: 'LABO-011', patientId: 'PAT-011', patientName: 'Gopal Bisht', doctorName: 'Dr. Suman Koirala', tests: ['Lipid Profile', 'ECG', 'Echocardiography'], orderDate: '2026-09-04', status: 'Completed', priority: 'Routine' },
  { id: 'LABO-012', patientId: 'PAT-013', patientName: 'Ashok Khatri', doctorName: 'Dr. Meena Joshi', tests: ['Urinalysis'], orderDate: '2026-09-11', status: 'Cancelled', priority: 'Routine' },
  { id: 'LABO-013', patientId: 'PAT-002', patientName: 'Sunita Sharma', doctorName: 'Dr. Priya Bhandari', tests: ['CBC', 'X-Ray Chest'], orderDate: '2026-09-08', status: 'Completed', priority: 'Urgent' },
  { id: 'LABO-014', patientId: 'PAT-014', patientName: 'Mina Chhetri', doctorName: 'Dr. Aarav Shrestha', tests: ['CBC', 'Liver Function Test'], orderDate: '2026-09-03', status: 'Completed', priority: 'Routine' },
  { id: 'LABO-015', patientId: 'PAT-007', patientName: 'Santosh Tamang', doctorName: 'Dr. Rajesh Maharjan', tests: ['X-Ray Chest'], orderDate: '2026-06-20', status: 'Completed', priority: 'Routine' },
];

export const sampleCollections: SampleCollection[] = [
  { id: 'SC-001', orderId: 'LABO-001', patientName: 'Ram Bahadur Thapa', sampleType: 'Blood', collectedBy: 'Binod Paudel', collectedAt: '2026-09-10 08:30', status: 'Received' },
  { id: 'SC-002', orderId: 'LABO-002', patientName: 'Bikash Gurung', sampleType: 'Blood', collectedBy: 'Binod Paudel', collectedAt: '2026-09-05 09:00', status: 'Received' },
  { id: 'SC-003', orderId: 'LABO-003', patientName: 'Anita Rai', sampleType: 'Blood', collectedBy: 'Dipak Ranjitkar', collectedAt: '2026-09-13 08:45', status: 'Received' },
  { id: 'SC-004', orderId: 'LABO-004', patientName: 'Krishna Prasad Adhikari', sampleType: 'Blood', collectedBy: 'Binod Paudel', collectedAt: '2026-09-11 07:30', status: 'Received' },
  { id: 'SC-005', orderId: 'LABO-005', patientName: 'Rajendra Prasad Poudel', sampleType: 'Urine', collectedBy: 'Dipak Ranjitkar', collectedAt: '2026-09-06 10:00', status: 'Received' },
  { id: 'SC-006', orderId: 'LABO-006', patientName: 'Laxman Basnet', sampleType: 'Blood', collectedBy: 'Binod Paudel', collectedAt: '2026-09-12 22:15', status: 'Received' },
  { id: 'SC-007', orderId: 'LABO-007', patientName: 'Sangita Limbu', sampleType: 'Blood', collectedBy: 'Dipak Ranjitkar', collectedAt: '2026-09-12 14:30', status: 'Received' },
  { id: 'SC-008', orderId: 'LABO-008', patientName: 'Priya Magar', sampleType: 'Blood', collectedBy: 'Binod Paudel', collectedAt: '2026-09-07 09:15', status: 'Received' },
  { id: 'SC-009', orderId: 'LABO-010', patientName: 'Nirmala Shrestha', sampleType: 'Blood', collectedBy: 'Dipak Ranjitkar', collectedAt: '2026-09-10 11:00', status: 'Received' },
  { id: 'SC-010', orderId: 'LABO-013', patientName: 'Sunita Sharma', sampleType: 'Blood', collectedBy: 'Binod Paudel', collectedAt: '2026-09-08 10:30', status: 'Received' },
];

export const labReports: LabReport[] = [
  {
    id: 'LBR-001', orderId: 'LABO-001', patientName: 'Ram Bahadur Thapa',
    tests: [
      { name: 'HbA1c', value: '8.2', unit: '%', referenceRange: '< 6.5', status: 'Abnormal' },
      { name: 'Fasting Blood Sugar', value: '185', unit: 'mg/dL', referenceRange: '70-110', status: 'Abnormal' },
      { name: 'Total Cholesterol', value: '245', unit: 'mg/dL', referenceRange: '< 200', status: 'Abnormal' },
    ],
    reportedBy: 'Binod Paudel', reportedDate: '2026-09-10', verifiedBy: 'Dr. Aarav Shrestha', status: 'Verified',
  },
  {
    id: 'LBR-002', orderId: 'LABO-002', patientName: 'Bikash Gurung',
    tests: [
      { name: 'Total Cholesterol', value: '260', unit: 'mg/dL', referenceRange: '< 200', status: 'Abnormal' },
      { name: 'LDL', value: '170', unit: 'mg/dL', referenceRange: '< 100', status: 'Abnormal' },
      { name: 'HDL', value: '35', unit: 'mg/dL', referenceRange: '> 40', status: 'Abnormal' },
    ],
    reportedBy: 'Binod Paudel', reportedDate: '2026-09-05', verifiedBy: 'Dr. Suman Koirala', status: 'Verified',
  },
  {
    id: 'LBR-003', orderId: 'LABO-004', patientName: 'Krishna Prasad Adhikari',
    tests: [
      { name: 'HbA1c', value: '9.5', unit: '%', referenceRange: '< 6.5', status: 'Critical' },
      { name: 'Fasting Blood Sugar', value: '220', unit: 'mg/dL', referenceRange: '70-110', status: 'Critical' },
      { name: 'Serum Creatinine', value: '1.8', unit: 'mg/dL', referenceRange: '0.6-1.2', status: 'Abnormal' },
    ],
    reportedBy: 'Binod Paudel', reportedDate: '2026-09-11', verifiedBy: 'Dr. Aarav Shrestha', status: 'Verified',
  },
  {
    id: 'LBR-004', orderId: 'LABO-005', patientName: 'Rajendra Prasad Poudel',
    tests: [
      { name: 'RBC in Urine', value: '15-20/HPF', unit: '/HPF', referenceRange: '0-2', status: 'Abnormal' },
      { name: 'Serum Creatinine', value: '1.1', unit: 'mg/dL', referenceRange: '0.6-1.2', status: 'Normal' },
    ],
    reportedBy: 'Dipak Ranjitkar', reportedDate: '2026-09-06', verifiedBy: 'Dr. Aarav Shrestha', status: 'Verified',
  },
  {
    id: 'LBR-005', orderId: 'LABO-006', patientName: 'Laxman Basnet',
    tests: [
      { name: 'Troponin I', value: '2.5', unit: 'ng/mL', referenceRange: '< 0.04', status: 'Critical' },
      { name: 'CBC - WBC', value: '12500', unit: '/μL', referenceRange: '4000-11000', status: 'Abnormal' },
      { name: 'BNP', value: '850', unit: 'pg/mL', referenceRange: '< 100', status: 'Critical' },
    ],
    reportedBy: 'Binod Paudel', reportedDate: '2026-09-12', verifiedBy: 'Dr. Suman Koirala', status: 'Verified',
  },
  {
    id: 'LBR-006', orderId: 'LABO-008', patientName: 'Priya Magar',
    tests: [
      { name: 'TSH', value: '8.5', unit: 'mIU/L', referenceRange: '0.4-4.0', status: 'Abnormal' },
      { name: 'Free T4', value: '0.8', unit: 'ng/dL', referenceRange: '0.9-1.7', status: 'Abnormal' },
    ],
    reportedBy: 'Binod Paudel', reportedDate: '2026-09-07', verifiedBy: 'Dr. Aarav Shrestha', status: 'Verified',
  },
  {
    id: 'LBR-007', orderId: 'LABO-010', patientName: 'Nirmala Shrestha',
    tests: [
      { name: 'ESR', value: '45', unit: 'mm/hr', referenceRange: '0-20', status: 'Abnormal' },
      { name: 'CRP', value: '28', unit: 'mg/L', referenceRange: '< 5', status: 'Abnormal' },
    ],
    reportedBy: 'Dipak Ranjitkar', reportedDate: '2026-09-10', verifiedBy: 'Dr. Rajesh Maharjan', status: 'Verified',
  },
  {
    id: 'LBR-008', orderId: 'LABO-013', patientName: 'Sunita Sharma',
    tests: [
      { name: 'CBC - Hemoglobin', value: '11.5', unit: 'g/dL', referenceRange: '12-16', status: 'Abnormal' },
      { name: 'WBC Count', value: '14000', unit: '/μL', referenceRange: '4000-11000', status: 'Abnormal' },
    ],
    reportedBy: 'Binod Paudel', reportedDate: '2026-09-08', verifiedBy: 'Dr. Priya Bhandari', status: 'Verified',
  },
  {
    id: 'LBR-009', orderId: 'LABO-011', patientName: 'Gopal Bisht',
    tests: [
      { name: 'Total Cholesterol', value: '280', unit: 'mg/dL', referenceRange: '< 200', status: 'Abnormal' },
      { name: 'Triglycerides', value: '220', unit: 'mg/dL', referenceRange: '< 150', status: 'Abnormal' },
      { name: 'HDL', value: '30', unit: 'mg/dL', referenceRange: '> 40', status: 'Abnormal' },
    ],
    reportedBy: 'Binod Paudel', reportedDate: '2026-09-04', verifiedBy: 'Dr. Suman Koirala', status: 'Verified',
  },
  {
    id: 'LBR-010', orderId: 'LABO-014', patientName: 'Mina Chhetri',
    tests: [
      { name: 'ESR', value: '55', unit: 'mm/hr', referenceRange: '0-20', status: 'Abnormal' },
      { name: 'CRP', value: '35', unit: 'mg/L', referenceRange: '< 5', status: 'Abnormal' },
    ],
    reportedBy: 'Dipak Ranjitkar', reportedDate: '2026-09-03', verifiedBy: 'Dr. Aarav Shrestha', status: 'Verified',
  },
];
