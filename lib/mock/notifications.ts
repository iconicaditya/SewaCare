export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  category: 'appointment' | 'lab' | 'billing' | 'emergency' | 'system' | 'pharmacy' | 'staff';
  read: boolean;
  createdAt: string;
  link?: string;
}

export const notifications: Notification[] = [
  { id: 'NOT-001', title: 'Emergency Patient Arrived', message: 'Laxman Basnet has been admitted through emergency with chest pain.', type: 'error', category: 'emergency', read: false, createdAt: '2026-09-12T21:30:00', link: '/dashboard/emergency/patients' },
  { id: 'NOT-002', title: 'Lab Report Ready', message: 'HbA1c report for Ram Bahadur Thapa is ready for review.', type: 'info', category: 'lab', read: false, createdAt: '2026-09-10T14:00:00', link: '/dashboard/laboratory/reports' },
  { id: 'NOT-003', title: 'Payment Received', message: 'NPR 270,500 insurance payment received for Gopal Bisht.', type: 'success', category: 'billing', read: true, createdAt: '2026-09-10T10:00:00' },
  { id: 'NOT-004', title: 'Appointment Reminder', message: 'Dr. Suman Koirala has 3 appointments scheduled for tomorrow.', type: 'info', category: 'appointment', read: false, createdAt: '2026-09-13T06:00:00', link: '/dashboard/appointments' },
  { id: 'NOT-005', title: 'Low Stock Alert', message: 'IV Cannula 18G is below reorder level. Current stock: 8 boxes.', type: 'warning', category: 'pharmacy', read: false, createdAt: '2026-09-10T09:00:00', link: '/dashboard/pharmacy/medicines' },
  { id: 'NOT-006', title: 'Critical Lab Result', message: 'Troponin I result for Laxman Basnet is critically elevated (2.5 ng/mL).', type: 'error', category: 'lab', read: false, createdAt: '2026-09-12T23:00:00', link: '/dashboard/laboratory/reports' },
  { id: 'NOT-007', title: 'Surgery Scheduled', message: 'Arthroscopic Knee Surgery for Mina Chhetri scheduled for Sep 15.', type: 'info', category: 'system', read: true, createdAt: '2026-09-13T08:00:00', link: '/dashboard/ot/schedule' },
  { id: 'NOT-008', title: 'Pending Payment', message: 'Invoice INV-009 for Sangita Limbu (NPR 3,500) is overdue.', type: 'warning', category: 'billing', read: false, createdAt: '2026-09-12T09:00:00', link: '/dashboard/billing/pending' },
  { id: 'NOT-009', title: 'Equipment Maintenance Due', message: 'Echocardiography Machine calibration scheduled for Oct 20.', type: 'warning', category: 'system', read: true, createdAt: '2026-09-12T10:00:00', link: '/dashboard/equipment/list' },
  { id: 'NOT-010', title: 'Staff Leave Approved', message: 'Annual leave for Mina Gurung (Sep 13-15) has been approved.', type: 'success', category: 'staff', read: true, createdAt: '2026-09-10T11:00:00' },
  { id: 'NOT-011', title: 'Blood Bank Alert', message: 'B- blood group inventory is critically low (2 units).', type: 'error', category: 'pharmacy', read: false, createdAt: '2026-09-13T07:00:00', link: '/dashboard/blood-bank/inventory' },
  { id: 'NOT-012', title: 'Insurance Claim Rejected', message: 'Claim for Ram Bahadur Thapa (NLG Insurance) rejected - policy expired.', type: 'warning', category: 'billing', read: true, createdAt: '2026-09-12T14:00:00' },
  { id: 'NOT-013', title: 'New Patient Registration', message: 'Laxman Basnet registered as a new patient in the system.', type: 'info', category: 'system', read: true, createdAt: '2026-09-12T21:15:00' },
  { id: 'NOT-014', title: 'Discharge Summary Ready', message: 'Discharge summary for Santosh Tamang has been prepared.', type: 'success', category: 'system', read: true, createdAt: '2026-09-10T15:00:00' },
  { id: 'NOT-015', title: 'Purchase Order Received', message: 'PO-003 (IV fluids) has been delivered. 150 bottles received.', type: 'success', category: 'pharmacy', read: true, createdAt: '2026-09-13T10:00:00', link: '/dashboard/inventory/received' },
];
