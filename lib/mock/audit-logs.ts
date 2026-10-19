export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  resourceId: string;
  details: string;
  ipAddress: string;
  timestamp: string;
  status: 'Success' | 'Failed';
}

export const auditLogs: AuditLog[] = [
  { id: 'AL-001', userId: 'USR-001', userName: 'Admin User', action: 'Login', resource: 'Auth', resourceId: '', details: 'Successful login', ipAddress: '192.168.1.100', timestamp: '2026-09-13 08:00:00', status: 'Success' },
  { id: 'AL-002', userId: 'USR-002', userName: 'Dr. Aarav Shrestha', action: 'View', resource: 'Patient', resourceId: 'PAT-001', details: 'Viewed patient profile', ipAddress: '192.168.1.101', timestamp: '2026-09-13 08:15:00', status: 'Success' },
  { id: 'AL-003', userId: 'USR-002', userName: 'Dr. Aarav Shrestha', action: 'Create', resource: 'Consultation', resourceId: 'CON-001', details: 'Created consultation for Ram Bahadur Thapa', ipAddress: '192.168.1.101', timestamp: '2026-09-13 08:30:00', status: 'Success' },
  { id: 'AL-004', userId: 'USR-002', userName: 'Dr. Aarav Shrestha', action: 'Create', resource: 'Prescription', resourceId: 'RX-001', details: 'Created prescription for Ram Bahadur Thapa', ipAddress: '192.168.1.101', timestamp: '2026-09-13 08:35:00', status: 'Success' },
  { id: 'AL-005', userId: 'USR-003', userName: 'Binod Paudel', action: 'Create', resource: 'Lab Order', resourceId: 'LABO-003', details: 'Created lab order for Anita Rai - CBC, Thyroid Profile', ipAddress: '192.168.1.102', timestamp: '2026-09-13 09:00:00', status: 'Success' },
  { id: 'AL-006', userId: 'USR-004', userName: 'Rita Karki', action: 'Register', resource: 'Patient', resourceId: 'PAT-015', details: 'Registered new patient Laxman Basnet', ipAddress: '192.168.1.103', timestamp: '2026-09-12 21:15:00', status: 'Success' },
  { id: 'AL-007', userId: 'USR-005', userName: 'Prakash Tamang', action: 'Dispense', resource: 'Pharmacy', resourceId: 'DISP-001', details: 'Dispensed Metformin and Glimepiride for Ram Bahadur Thapa', ipAddress: '192.168.1.104', timestamp: '2026-09-13 14:00:00', status: 'Success' },
  { id: 'AL-008', userId: 'USR-006', userName: 'Anju Shrestha', action: 'Create', resource: 'Invoice', resourceId: 'INV-009', details: 'Created invoice for Sangita Limbu - NPR 3,500', ipAddress: '192.168.1.105', timestamp: '2026-09-12 16:00:00', status: 'Success' },
  { id: 'AL-009', userId: 'USR-006', userName: 'Anju Shrestha', action: 'Process Payment', resource: 'Payment', resourceId: 'PAY-006', details: 'Processed cash payment NPR 3,800 for Anita Rai', ipAddress: '192.168.1.105', timestamp: '2026-09-13 10:00:00', status: 'Success' },
  { id: 'AL-010', userId: 'USR-001', userName: 'Admin User', action: 'Update', resource: 'Settings', resourceId: '', details: 'Updated hospital information settings', ipAddress: '192.168.1.100', timestamp: '2026-09-13 09:30:00', status: 'Success' },
  { id: 'AL-011', userId: 'USR-002', userName: 'Dr. Aarav Shrestha', action: 'View', resource: 'Lab Report', resourceId: 'LBR-001', details: 'Viewed lab report for Ram Bahadur Thapa', ipAddress: '192.168.1.101', timestamp: '2026-09-13 10:15:00', status: 'Success' },
  { id: 'AL-012', userId: 'USR-007', userName: 'Deepak Subedi', action: 'Upload', resource: 'Radiology Report', resourceId: 'RDR-001', details: 'Uploaded echocardiography report for Bikash Gurung', ipAddress: '192.168.1.106', timestamp: '2026-09-06 16:00:00', status: 'Success' },
  { id: 'AL-013', userId: 'USR-001', userName: 'Admin User', action: 'Create', resource: 'Staff', resourceId: 'STF-016', details: 'Created staff account for Nisha Hamal', ipAddress: '192.168.1.100', timestamp: '2026-09-13 11:00:00', status: 'Success' },
  { id: 'AL-014', userId: 'USR-008', userName: 'Unknown User', action: 'Login', resource: 'Auth', resourceId: '', details: 'Failed login attempt - invalid password', ipAddress: '192.168.1.200', timestamp: '2026-09-13 03:45:00', status: 'Failed' },
  { id: 'AL-015', userId: 'USR-009', userName: 'Hari Prasad Neupane', action: 'Approve', resource: 'Purchase Request', resourceId: 'PR-001', details: 'Approved purchase request REQ-001 for surgical gloves', ipAddress: '192.168.1.107', timestamp: '2026-09-11 14:00:00', status: 'Success' },
  { id: 'AL-016', userId: 'USR-010', userName: 'Sushila Bajracharya', action: 'Update', resource: 'Nursing Record', resourceId: 'NR-001', details: 'Updated nursing record for Laxman Basnet - Morning shift', ipAddress: '192.168.1.108', timestamp: '2026-09-13 08:30:00', status: 'Success' },
  { id: 'AL-017', userId: 'USR-011', userName: 'Rajan K.C.', action: 'Issue', resource: 'Blood Bank', resourceId: 'BI-001', details: 'Issued 2 units B- blood for Laxman Basnet', ipAddress: '192.168.1.109', timestamp: '2026-09-12 23:30:00', status: 'Success' },
  { id: 'AL-018', userId: 'USR-006', userName: 'Anju Shrestha', action: 'Refund', resource: 'Billing', resourceId: 'REF-001', details: 'Processed refund NPR 500 for Anita Rai - overcharge correction', ipAddress: '192.168.1.105', timestamp: '2026-09-13 10:00:00', status: 'Success' },
  { id: 'AL-019', userId: 'USR-009', userName: 'Hari Prasad Neupane', action: 'Update', resource: 'Role', resourceId: 'ROLE-014', details: 'Updated Blood Bank Staff role permissions', ipAddress: '192.168.1.107', timestamp: '2026-09-12 16:00:00', status: 'Success' },
  { id: 'AL-020', userId: 'USR-012', userName: 'Manoj Basnet', action: 'Update', resource: 'Inventory', resourceId: 'STK-004', details: 'Updated stock level for IV Cannula 18G - new quantity: 8', ipAddress: '192.168.1.110', timestamp: '2026-09-12 17:00:00', status: 'Success' },
];
