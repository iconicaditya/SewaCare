export interface InsuranceProvider {
  id: string;
  name: string;
  contact: string;
  email: string;
  address: string;
  networkHospitals: number;
  status: 'Active' | 'Inactive';
}

export interface PatientInsurance {
  id: string;
  patientId: string;
  patientName: string;
  providerId: string;
  providerName: string;
  policyNumber: string;
  coverageType: 'Basic' | 'Standard' | 'Premium';
  sumInsured: number;
  validFrom: string;
  validUntil: string;
  status: 'Active' | 'Expired' | 'Suspended';
}

export interface InsuranceClaim {
  id: string;
  patientId: string;
  patientName: string;
  providerName: string;
  policyNumber: string;
  invoiceId: string;
  claimAmount: number;
  approvedAmount: number;
  submittedDate: string;
  processedDate: string;
  status: 'Submitted' | 'Under Review' | 'Approved' | 'Rejected' | 'Partially Approved';
  remarks: string;
}

export const insuranceProviders: InsuranceProvider[] = [
  { id: 'INS-001', name: 'Nepal Insurance Company', contact: '01-4221234', email: 'claims@nepalinsurance.com', address: 'Kathmandu', networkHospitals: 150, status: 'Active' },
  { id: 'INS-002', name: 'Siddhartha Insurance', contact: '01-4234567', email: 'info@siddharthainsurance.com', address: 'Kathmandu', networkHospitals: 120, status: 'Active' },
  { id: 'INS-003', name: 'NLG Insurance', contact: '01-4245678', email: 'claims@nlginsurance.com', address: 'Lalitpur', networkHospitals: 100, status: 'Active' },
  { id: 'INS-004', name: 'Prudential Insurance Nepal', contact: '01-4256789', email: 'support@prudential.com.np', address: 'Kathmandu', networkHospitals: 80, status: 'Active' },
  { id: 'INS-005', name: 'Sanima Insurance', contact: '01-4267890', email: 'health@sanima.com.np', address: 'Kathmandu', networkHospitals: 90, status: 'Active' },
];

export const patientInsurance: PatientInsurance[] = [
  { id: 'PI-001', patientId: 'PAT-011', patientName: 'Gopal Bisht', providerId: 'INS-001', providerName: 'Nepal Insurance Company', policyNumber: 'NIC-2026-001234', coverageType: 'Premium', sumInsured: 500000, validFrom: '2026-01-01', validUntil: '2026-12-31', status: 'Active' },
  { id: 'PI-002', patientId: 'PAT-015', patientName: 'Laxman Basnet', providerId: 'INS-002', providerName: 'Siddhartha Insurance', policyNumber: 'SI-2026-005678', coverageType: 'Standard', sumInsured: 300000, validFrom: '2026-04-01', validUntil: '2027-03-31', status: 'Active' },
  { id: 'PI-003', patientId: 'PAT-001', patientName: 'Ram Bahadur Thapa', providerId: 'INS-003', providerName: 'NLG Insurance', policyNumber: 'NLG-2025-009876', coverageType: 'Basic', sumInsured: 100000, validFrom: '2025-07-01', validUntil: '2026-06-30', status: 'Expired' },
  { id: 'PI-004', patientId: 'PAT-005', patientName: 'Krishna Prasad Adhikari', providerId: 'INS-001', providerName: 'Nepal Insurance Company', policyNumber: 'NIC-2026-003456', coverageType: 'Premium', sumInsured: 400000, validFrom: '2026-02-01', validUntil: '2027-01-31', status: 'Active' },
  { id: 'PI-005', patientId: 'PAT-003', patientName: 'Bikash Gurung', providerId: 'INS-004', providerName: 'Prudential Insurance Nepal', policyNumber: 'PI-2026-007890', coverageType: 'Standard', sumInsured: 250000, validFrom: '2026-03-01', validUntil: '2027-02-28', status: 'Active' },
  { id: 'PI-006', patientId: 'PAT-009', patientName: 'Rajendra Prasad Poudel', providerId: 'INS-005', providerName: 'Sanima Insurance', policyNumber: 'SAN-2026-004567', coverageType: 'Basic', sumInsured: 150000, validFrom: '2026-01-15', validUntil: '2027-01-14', status: 'Active' },
  { id: 'PI-007', patientId: 'PAT-012', patientName: 'Nirmala Shrestha', providerId: 'INS-002', providerName: 'Siddhartha Insurance', policyNumber: 'SI-2025-008901', coverageType: 'Premium', sumInsured: 450000, validFrom: '2025-10-01', validUntil: '2026-09-30', status: 'Active' },
  { id: 'PI-008', patientId: 'PAT-006', patientName: 'Priya Magar', providerId: 'INS-003', providerName: 'NLG Insurance', policyNumber: 'NLG-2026-002345', coverageType: 'Standard', sumInsured: 200000, validFrom: '2026-06-01', validUntil: '2027-05-31', status: 'Active' },
  { id: 'PI-009', patientId: 'PAT-014', patientName: 'Mina Chhetri', providerId: 'INS-004', providerName: 'Prudential Insurance Nepal', policyNumber: 'PI-2025-006789', coverageType: 'Basic', sumInsured: 100000, validFrom: '2025-09-01', validUntil: '2026-08-31', status: 'Expired' },
  { id: 'PI-010', patientId: 'PAT-008', patientName: 'Deepa Karki', providerId: 'INS-005', providerName: 'Sanima Insurance', policyNumber: 'SAN-2026-001235', coverageType: 'Premium', sumInsured: 350000, validFrom: '2026-05-01', validUntil: '2027-04-30', status: 'Active' },
];

export const insuranceClaims: InsuranceClaim[] = [
  { id: 'CLM-001', patientId: 'PAT-011', patientName: 'Gopal Bisht', providerName: 'Nepal Insurance Company', policyNumber: 'NIC-2026-001234', invoiceId: 'INV-003', claimAmount: 270500, approvedAmount: 250000, submittedDate: '2026-09-01', processedDate: '2026-09-10', status: 'Partially Approved', remarks: 'ICU stay limited to 10 days covered under premium plan' },
  { id: 'CLM-002', patientId: 'PAT-015', patientName: 'Laxman Basnet', providerName: 'Siddhartha Insurance', policyNumber: 'SI-2026-005678', invoiceId: 'INV-001', claimAmount: 6600, approvedAmount: 0, submittedDate: '2026-09-13', processedDate: '', status: 'Under Review', remarks: 'Claim submitted, awaiting document verification' },
  { id: 'CLM-003', patientId: 'PAT-001', patientName: 'Ram Bahadur Thapa', providerName: 'NLG Insurance', policyNumber: 'NLG-2025-009876', invoiceId: 'INV-006', claimAmount: 2300, approvedAmount: 0, submittedDate: '2026-09-10', processedDate: '2026-09-12', status: 'Rejected', remarks: 'Policy expired on 2026-06-30' },
  { id: 'CLM-004', patientId: 'PAT-005', patientName: 'Krishna Prasad Adhikari', providerName: 'Nepal Insurance Company', policyNumber: 'NIC-2026-003456', invoiceId: 'INV-010', claimAmount: 5400, approvedAmount: 4500, submittedDate: '2026-09-12', processedDate: '2026-09-13', status: 'Approved', remarks: 'Nerve conduction study partially covered' },
  { id: 'CLM-005', patientId: 'PAT-003', patientName: 'Bikash Gurung', providerName: 'Prudential Insurance Nepal', policyNumber: 'PI-2026-007890', invoiceId: 'INV-007', claimAmount: 6000, approvedAmount: 5500, submittedDate: '2026-09-06', processedDate: '2026-09-11', status: 'Approved', remarks: 'Cardiology consultation covered. ECG partially covered.' },
  { id: 'CLM-006', patientId: 'PAT-012', patientName: 'Nirmala Shrestha', providerName: 'Siddhartha Insurance', policyNumber: 'SI-2025-008901', invoiceId: 'INV-004', claimAmount: 69600, approvedAmount: 0, submittedDate: '2026-09-12', processedDate: '', status: 'Submitted', remarks: 'Knee replacement surgery claim - awaiting review' },
  { id: 'CLM-007', patientId: 'PAT-009', patientName: 'Rajendra Prasad Poudel', providerName: 'Sanima Insurance', policyNumber: 'SAN-2026-004567', invoiceId: 'INV-008', claimAmount: 2900, approvedAmount: 2000, submittedDate: '2026-09-07', processedDate: '2026-09-12', status: 'Partially Approved', remarks: 'Basic plan covers consultation and ultrasound only' },
  { id: 'CLM-008', patientId: 'PAT-008', patientName: 'Deepa Karki', providerName: 'Sanima Insurance', policyNumber: 'SAN-2026-001235', invoiceId: 'INV-014', claimAmount: 10400, approvedAmount: 9500, submittedDate: '2026-09-10', processedDate: '2026-09-13', status: 'Approved', remarks: 'MRI and consultation covered under premium plan' },
];
