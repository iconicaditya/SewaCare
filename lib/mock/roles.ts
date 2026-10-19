export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  status: 'Active' | 'Inactive';
}

export const roles: Role[] = [
  { id: 'ROLE-001', name: 'Administrator', description: 'Full system access with all permissions', permissions: ['all'], userCount: 1, status: 'Active' },
  { id: 'ROLE-002', name: 'Hospital Manager', description: 'Hospital-wide management and oversight', permissions: ['dashboard', 'patients', 'appointments', 'staff', 'billing', 'reports', 'settings', 'inventory', 'departments'], userCount: 1, status: 'Active' },
  { id: 'ROLE-003', name: 'Doctor', description: 'Clinical patient management and consultations', permissions: ['dashboard', 'patients', 'appointments', 'consultations', 'prescriptions', 'laboratory', 'radiology', 'reports'], userCount: 10, status: 'Active' },
  { id: 'ROLE-004', name: 'Nurse', description: 'Patient care, vitals monitoring, and medication administration', permissions: ['dashboard', 'patients', 'appointments', 'consultations', 'laboratory', 'hospitalization', 'icu', 'emergency'], userCount: 5, status: 'Active' },
  { id: 'ROLE-005', name: 'Receptionist', description: 'Front desk operations, patient registration, and appointments', permissions: ['dashboard', 'patients', 'appointments', 'billing'], userCount: 2, status: 'Active' },
  { id: 'ROLE-006', name: 'Lab Technician', description: 'Laboratory testing, sample processing, and report generation', permissions: ['dashboard', 'laboratory', 'patients'], userCount: 2, status: 'Active' },
  { id: 'ROLE-007', name: 'Radiology Technician', description: 'Medical imaging, equipment operation, and report assistance', permissions: ['dashboard', 'radiology', 'patients'], userCount: 1, status: 'Active' },
  { id: 'ROLE-008', name: 'Pharmacist', description: 'Medication dispensing, inventory, and drug information', permissions: ['dashboard', 'pharmacy', 'inventory', 'patients'], userCount: 2, status: 'Active' },
  { id: 'ROLE-009', name: 'Accountant', description: 'Financial operations, billing, and payment processing', permissions: ['dashboard', 'billing', 'insurance', 'finance', 'reports'], userCount: 2, status: 'Active' },
  { id: 'ROLE-010', name: 'Inventory Manager', description: 'Stock management, procurement, and supplier management', permissions: ['dashboard', 'inventory', 'equipment', 'reports'], userCount: 1, status: 'Active' },
  { id: 'ROLE-011', name: 'HR Staff', description: 'Staff management, attendance, leaves, and payroll', permissions: ['dashboard', 'staff', 'attendance', 'leave', 'departments'], userCount: 1, status: 'Active' },
  { id: 'ROLE-012', name: 'OT Staff', description: 'Operation theatre management and surgical coordination', permissions: ['dashboard', 'ot', 'patients', 'emergency'], userCount: 1, status: 'Active' },
  { id: 'ROLE-013', name: 'ICU Staff', description: 'ICU patient monitoring and intensive care management', permissions: ['dashboard', 'icu', 'patients', 'emergency'], userCount: 1, status: 'Active' },
  { id: 'ROLE-014', name: 'Blood Bank Staff', description: 'Blood inventory management, cross matching, and distribution', permissions: ['dashboard', 'blood-bank', 'patients'], userCount: 1, status: 'Active' },
];
