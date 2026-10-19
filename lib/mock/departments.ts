export interface Department {
  id: string;
  name: string;
  type: 'Clinical' | 'Operational';
  description: string;
  status: 'Active' | 'Inactive';
}

export const departments: Department[] = [
  { id: 'DEPT-001', name: 'General Medicine', type: 'Clinical', description: 'Primary care and general medical consultations', status: 'Active' },
  { id: 'DEPT-002', name: 'Cardiology', type: 'Clinical', description: 'Heart and cardiovascular system care', status: 'Active' },
  { id: 'DEPT-003', name: 'Orthopedics', type: 'Clinical', description: 'Bone, joint, and musculoskeletal system care', status: 'Active' },
  { id: 'DEPT-004', name: 'Pediatrics', type: 'Clinical', description: 'Medical care for infants, children, and adolescents', status: 'Active' },
  { id: 'DEPT-005', name: 'Gynecology', type: 'Clinical', description: 'Women reproductive health and obstetrics', status: 'Active' },
  { id: 'DEPT-006', name: 'Dermatology', type: 'Clinical', description: 'Skin, hair, and nail conditions', status: 'Active' },
  { id: 'DEPT-007', name: 'ENT', type: 'Clinical', description: 'Ear, nose, and throat specialist care', status: 'Active' },
  { id: 'DEPT-008', name: 'Neurology', type: 'Clinical', description: 'Brain and nervous system disorders', status: 'Active' },
  { id: 'DEPT-009', name: 'Ophthalmology', type: 'Clinical', description: 'Eye care and vision treatment', status: 'Active' },
  { id: 'DEPT-010', name: 'Emergency', type: 'Clinical', description: 'Emergency and trauma medical services', status: 'Active' },
  { id: 'DEPT-011', name: 'Laboratory', type: 'Operational', description: 'Diagnostic testing and lab services', status: 'Active' },
  { id: 'DEPT-012', name: 'Radiology', type: 'Operational', description: 'Medical imaging and diagnostic radiology', status: 'Active' },
  { id: 'DEPT-013', name: 'Pharmacy', type: 'Operational', description: 'Medication dispensing and pharmaceutical care', status: 'Active' },
  { id: 'DEPT-014', name: 'Nursing', type: 'Operational', description: 'Patient care and nursing services', status: 'Active' },
  { id: 'DEPT-015', name: 'Billing', type: 'Operational', description: 'Patient billing and financial operations', status: 'Active' },
  { id: 'DEPT-016', name: 'Administration', type: 'Operational', description: 'Hospital administration and management', status: 'Active' },
  { id: 'DEPT-017', name: 'HR', type: 'Operational', description: 'Human resources and staff management', status: 'Active' },
];
