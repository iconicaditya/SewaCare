export interface BloodUnit {
  id: string;
  bloodGroup: string;
  units: number;
  collectionDate: string;
  expiryDate: string;
  donorId: string;
  status: 'Available' | 'Reserved' | 'Issued' | 'Expired' | 'Discarded';
  tested: boolean;
}

export interface BloodDonor {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  bloodGroup: string;
  phone: string;
  lastDonationDate: string;
  totalDonations: number;
  status: 'Eligible' | 'Deferred' | 'Inactive';
}

export interface BloodRequest {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  bloodGroup: string;
  units: number;
  purpose: string;
  urgency: 'Emergency' | 'Urgent' | 'Routine';
  requestDate: string;
  status: 'Pending' | 'Approved' | 'Fulfilled' | 'Cancelled';
}

export interface CrossMatch {
  id: string;
  requestId: string;
  patientName: string;
  bloodGroup: string;
  unitIds: string[];
  crossMatchResult: 'Compatible' | 'Incompatible';
  performedBy: string;
  performedAt: string;
  status: 'Completed' | 'Pending';
}

export interface BloodIssue {
  id: string;
  requestId: string;
  patientName: string;
  bloodGroup: string;
  units: number;
  unitIds: string[];
  issuedTo: string;
  issuedBy: string;
  issuedAt: string;
  status: 'Issued' | 'Returned';
}

export const bloodInventory: BloodUnit[] = [
  { id: 'BU-001', bloodGroup: 'A+', units: 5, collectionDate: '2026-09-01', expiryDate: '2026-10-01', donorId: 'BD-001', status: 'Available', tested: true },
  { id: 'BU-002', bloodGroup: 'A+', units: 3, collectionDate: '2026-09-05', expiryDate: '2026-10-05', donorId: 'BD-002', status: 'Available', tested: true },
  { id: 'BU-003', bloodGroup: 'A-', units: 2, collectionDate: '2026-09-03', expiryDate: '2026-10-03', donorId: 'BD-003', status: 'Available', tested: true },
  { id: 'BU-004', bloodGroup: 'B+', units: 4, collectionDate: '2026-09-07', expiryDate: '2026-10-07', donorId: 'BD-004', status: 'Available', tested: true },
  { id: 'BU-005', bloodGroup: 'B+', units: 2, collectionDate: '2026-09-10', expiryDate: '2026-10-10', donorId: 'BD-005', status: 'Reserved', tested: true },
  { id: 'BU-006', bloodGroup: 'B-', units: 1, collectionDate: '2026-08-28', expiryDate: '2026-09-28', donorId: 'BD-006', status: 'Available', tested: true },
  { id: 'BU-007', bloodGroup: 'O+', units: 6, collectionDate: '2026-09-02', expiryDate: '2026-10-02', donorId: 'BD-007', status: 'Available', tested: true },
  { id: 'BU-008', bloodGroup: 'O+', units: 3, collectionDate: '2026-09-08', expiryDate: '2026-10-08', donorId: 'BD-008', status: 'Available', tested: true },
  { id: 'BU-009', bloodGroup: 'O-', units: 2, collectionDate: '2026-09-04', expiryDate: '2026-10-04', donorId: 'BD-001', status: 'Available', tested: true },
  { id: 'BU-010', bloodGroup: 'AB+', units: 2, collectionDate: '2026-09-06', expiryDate: '2026-10-06', donorId: 'BD-003', status: 'Available', tested: true },
  { id: 'BU-011', bloodGroup: 'AB-', units: 1, collectionDate: '2026-09-09', expiryDate: '2026-10-09', donorId: 'BD-005', status: 'Available', tested: true },
  { id: 'BU-012', bloodGroup: 'A+', units: 2, collectionDate: '2026-09-11', expiryDate: '2026-10-11', donorId: 'BD-002', status: 'Available', tested: true },
  { id: 'BU-013', bloodGroup: 'B+', units: 3, collectionDate: '2026-09-12', expiryDate: '2026-10-12', donorId: 'BD-004', status: 'Available', tested: true },
  { id: 'BU-014', bloodGroup: 'O+', units: 2, collectionDate: '2026-09-13', expiryDate: '2026-10-13', donorId: 'BD-007', status: 'Available', tested: false },
  { id: 'BU-015', bloodGroup: 'A+', units: 1, collectionDate: '2026-08-15', expiryDate: '2026-09-14', donorId: 'BD-001', status: 'Expired', tested: true },
  { id: 'BU-016', bloodGroup: 'B+', units: 1, collectionDate: '2026-08-20', expiryDate: '2026-09-19', donorId: 'BD-005', status: 'Available', tested: true },
  { id: 'BU-017', bloodGroup: 'O-', units: 1, collectionDate: '2026-09-10', expiryDate: '2026-10-10', donorId: 'BD-008', status: 'Issued', tested: true },
  { id: 'BU-018', bloodGroup: 'A+', units: 2, collectionDate: '2026-09-11', expiryDate: '2026-10-11', donorId: 'BD-003', status: 'Available', tested: true },
  { id: 'BU-019', bloodGroup: 'B-', units: 1, collectionDate: '2026-09-12', expiryDate: '2026-10-12', donorId: 'BD-006', status: 'Available', tested: true },
  { id: 'BU-020', bloodGroup: 'O+', units: 2, collectionDate: '2026-09-13', expiryDate: '2026-10-13', donorId: 'BD-007', status: 'Available', tested: false },
];

export const bloodDonors: BloodDonor[] = [
  { id: 'BD-001', name: 'Hari Bahadur Karki', age: 32, gender: 'Male', bloodGroup: 'A+', phone: '9843001001', lastDonationDate: '2026-09-01', totalDonations: 8, status: 'Eligible' },
  { id: 'BD-002', name: 'Sunita Tamang', age: 28, gender: 'Female', bloodGroup: 'A+', phone: '9843001002', lastDonationDate: '2026-09-05', totalDonations: 5, status: 'Eligible' },
  { id: 'BD-003', name: 'Rajan Sharma', age: 35, gender: 'Male', bloodGroup: 'A-', phone: '9843001003', lastDonationDate: '2026-09-03', totalDonations: 10, status: 'Eligible' },
  { id: 'BD-004', name: 'Anita Gurung', age: 30, gender: 'Female', bloodGroup: 'B+', phone: '9843001004', lastDonationDate: '2026-09-07', totalDonations: 4, status: 'Eligible' },
  { id: 'BD-005', name: 'Bikash Rai', age: 26, gender: 'Male', bloodGroup: 'B+', phone: '9843001005', lastDonationDate: '2026-09-10', totalDonations: 3, status: 'Eligible' },
  { id: 'BD-006', name: 'Deepa Thapa', age: 33, gender: 'Female', bloodGroup: 'B-', phone: '9843001006', lastDonationDate: '2026-08-28', totalDonations: 6, status: 'Eligible' },
  { id: 'BD-007', name: 'Prakash Shrestha', age: 40, gender: 'Male', bloodGroup: 'O+', phone: '9843001007', lastDonationDate: '2026-09-02', totalDonations: 12, status: 'Eligible' },
  { id: 'BD-008', name: 'Sangita Magar', age: 24, gender: 'Female', bloodGroup: 'O+', phone: '9843001008', lastDonationDate: '2026-09-08', totalDonations: 2, status: 'Eligible' },
];

export const bloodRequests: BloodRequest[] = [
  { id: 'BR-001', patientId: 'PAT-015', patientName: 'Laxman Basnet', doctorName: 'Dr. Suman Koirala', bloodGroup: 'B-', units: 2, purpose: 'Heart Failure - Transfusion', urgency: 'Emergency', requestDate: '2026-09-12', status: 'Fulfilled' },
  { id: 'BR-002', patientId: 'PAT-013', patientName: 'Ashok Khatri', doctorName: 'Dr. Rajesh Maharjan', bloodGroup: 'O+', units: 1, purpose: 'Post-surgical transfusion', urgency: 'Urgent', requestDate: '2026-09-09', status: 'Fulfilled' },
  { id: 'BR-003', patientId: 'PAT-011', patientName: 'Gopal Bisht', doctorName: 'Dr. Suman Koirala', bloodGroup: 'A+', units: 3, purpose: 'CABG surgery', urgency: 'Urgent', requestDate: '2026-08-29', status: 'Fulfilled' },
  { id: 'BR-004', patientId: 'PAT-012', patientName: 'Nirmala Shrestha', doctorName: 'Dr. Rajesh Maharjan', bloodGroup: 'B+', units: 2, purpose: 'Knee replacement surgery', urgency: 'Routine', requestDate: '2026-09-10', status: 'Fulfilled' },
  { id: 'BR-005', patientId: 'PAT-001', patientName: 'Ram Bahadur Thapa', doctorName: 'Dr. Aarav Shrestha', bloodGroup: 'B+', units: 1, purpose: 'Diagnostic - cross match', urgency: 'Routine', requestDate: '2026-09-10', status: 'Cancelled' },
  { id: 'BR-006', patientId: 'PAT-005', patientName: 'Krishna Prasad Adhikari', doctorName: 'Dr. Aarav Shrestha', bloodGroup: 'O+', units: 2, purpose: 'Severe anemia correction', urgency: 'Urgent', requestDate: '2026-09-12', status: 'Pending' },
  { id: 'BR-007', patientId: 'PAT-014', patientName: 'Mina Chhetri', doctorName: 'Dr. Rajesh Maharjan', bloodGroup: 'AB+', units: 1, purpose: 'Pre-surgical preparation', urgency: 'Routine', requestDate: '2026-09-13', status: 'Approved' },
  { id: 'BR-008', patientId: 'PAT-003', patientName: 'Bikash Gurung', doctorName: 'Dr. Suman Koirala', bloodGroup: 'A+', units: 2, purpose: 'Angioplasty preparation', urgency: 'Routine', requestDate: '2026-09-13', status: 'Pending' },
  { id: 'BR-009', patientId: 'PAT-009', patientName: 'Rajendra Prasad Poudel', doctorName: 'Dr. Aarav Shrestha', bloodGroup: 'O-', units: 1, purpose: 'Cross match before lithotripsy', urgency: 'Routine', requestDate: '2026-09-14', status: 'Pending' },
  { id: 'BR-010', patientId: 'PAT-008', patientName: 'Deepa Karki', doctorName: 'Dr. Dinesh Poudel', bloodGroup: 'B+', units: 1, purpose: 'Post-anaphylaxis recovery', urgency: 'Routine', requestDate: '2026-09-08', status: 'Fulfilled' },
];

export const crossMatches: CrossMatch[] = [
  { id: 'CM-001', requestId: 'BR-001', patientName: 'Laxman Basnet', bloodGroup: 'B-', unitIds: ['BU-006', 'BU-019'], crossMatchResult: 'Compatible', performedBy: 'Rajan K.C.', performedAt: '2026-09-12 23:00', status: 'Completed' },
  { id: 'CM-002', requestId: 'BR-002', patientName: 'Ashok Khatri', bloodGroup: 'O+', unitIds: ['BU-017'], crossMatchResult: 'Compatible', performedBy: 'Rajan K.C.', performedAt: '2026-09-09 15:00', status: 'Completed' },
  { id: 'CM-003', requestId: 'BR-003', patientName: 'Gopal Bisht', bloodGroup: 'A+', unitIds: ['BU-001', 'BU-012', 'BU-018'], crossMatchResult: 'Compatible', performedBy: 'Rajan K.C.', performedAt: '2026-08-29 18:00', status: 'Completed' },
  { id: 'CM-004', requestId: 'BR-004', patientName: 'Nirmala Shrestha', bloodGroup: 'B+', unitIds: ['BU-004', 'BU-013'], crossMatchResult: 'Compatible', performedBy: 'Rajan K.C.', performedAt: '2026-09-10 16:00', status: 'Completed' },
  { id: 'CM-005', requestId: 'BR-010', patientName: 'Deepa Karki', bloodGroup: 'B+', unitIds: ['BU-016'], crossMatchResult: 'Compatible', performedBy: 'Rajan K.C.', performedAt: '2026-09-08 14:00', status: 'Completed' },
];

export const bloodIssues: BloodIssue[] = [
  { id: 'BI-001', requestId: 'BR-001', patientName: 'Laxman Basnet', bloodGroup: 'B-', units: 2, unitIds: ['BU-006', 'BU-019'], issuedTo: 'Kamala Dhungana', issuedBy: 'Rajan K.C.', issuedAt: '2026-09-12 23:30', status: 'Issued' },
  { id: 'BI-002', requestId: 'BR-002', patientName: 'Ashok Khatri', bloodGroup: 'O+', units: 1, unitIds: ['BU-017'], issuedTo: 'Mina Gurung', issuedBy: 'Rajan K.C.', issuedAt: '2026-09-09 16:00', status: 'Issued' },
  { id: 'BI-003', requestId: 'BR-003', patientName: 'Gopal Bisht', bloodGroup: 'A+', units: 3, unitIds: ['BU-001', 'BU-012', 'BU-018'], issuedTo: 'Sunil Lama', issuedBy: 'Rajan K.C.', issuedAt: '2026-08-30 06:30', status: 'Issued' },
  { id: 'BI-004', requestId: 'BR-004', patientName: 'Nirmala Shrestha', bloodGroup: 'B+', units: 2, unitIds: ['BU-004', 'BU-013'], issuedTo: 'Kamala Dhungana', issuedBy: 'Rajan K.C.', issuedAt: '2026-09-11 07:30', status: 'Issued' },
  { id: 'BI-005', requestId: 'BR-010', patientName: 'Deepa Karki', bloodGroup: 'B+', units: 1, unitIds: ['BU-016'], issuedTo: 'Sarita Bhandari', issuedBy: 'Rajan K.C.', issuedAt: '2026-09-08 15:00', status: 'Issued' },
];
