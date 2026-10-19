export interface PrescriptionMedicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  date: string;
  status: 'Active' | 'Completed' | 'Cancelled';
  medicines: PrescriptionMedicine[];
  notes: string;
}

export const prescriptions: Prescription[] = [
  {
    id: 'RX-001', patientId: 'PAT-001', patientName: 'Ram Bahadur Thapa',
    doctorName: 'Dr. Aarav Shrestha', date: '2026-09-10', status: 'Active',
    medicines: [
      { name: 'Metformin', dosage: '1000mg', frequency: 'Twice daily', duration: '3 months', instructions: 'Take with meals' },
      { name: 'Glimepiride', dosage: '2mg', frequency: 'Once daily', duration: '3 months', instructions: 'Take before breakfast' },
    ],
    notes: 'Monitor blood sugar regularly. Follow up in 4 weeks.',
  },
  {
    id: 'RX-002', patientId: 'PAT-003', patientName: 'Bikash Gurung',
    doctorName: 'Dr. Suman Koirala', date: '2026-09-05', status: 'Active',
    medicines: [
      { name: 'Atenolol', dosage: '50mg', frequency: 'Once daily', duration: '6 months', instructions: 'Take in the morning' },
      { name: 'Aspirin', dosage: '75mg', frequency: 'Once daily', duration: 'Ongoing', instructions: 'Take after food' },
      { name: 'Nitroglycerin', dosage: '0.5mg', frequency: 'As needed', duration: 'PRN', instructions: 'Sublingual for chest pain' },
    ],
    notes: 'Avoid strenuous activity. Low salt diet.',
  },
  {
    id: 'RX-003', patientId: 'PAT-004', patientName: 'Anita Rai',
    doctorName: 'Dr. Anjali Thapa', date: '2026-09-13', status: 'Active',
    medicines: [
      { name: 'Mefenamic Acid', dosage: '500mg', frequency: 'Thrice daily', duration: '5 days', instructions: 'Take during period pain only' },
      { name: 'Iron Supplement', dosage: '325mg', frequency: 'Once daily', duration: '1 month', instructions: 'Take on empty stomach' },
    ],
    notes: 'Start iron supplement. Return after reports.',
  },
  {
    id: 'RX-004', patientId: 'PAT-005', patientName: 'Krishna Prasad Adhikari',
    doctorName: 'Dr. Aarav Shrestha', date: '2026-09-11', status: 'Active',
    medicines: [
      { name: 'Metformin', dosage: '850mg', frequency: 'Twice daily', duration: '3 months', instructions: 'Take with meals' },
      { name: 'Pregabalin', dosage: '75mg', frequency: 'Once daily', duration: '1 month', instructions: 'Take at bedtime' },
      { name: 'Multivitamin', dosage: '1 tablet', frequency: 'Once daily', duration: '3 months', instructions: 'Take after breakfast' },
    ],
    notes: 'Strict blood sugar control. Regular foot care.',
  },
  {
    id: 'RX-005', patientId: 'PAT-009', patientName: 'Rajendra Prasad Poudel',
    doctorName: 'Dr. Aarav Shrestha', date: '2026-09-06', status: 'Active',
    medicines: [
      { name: 'Diclofenac', dosage: '75mg', frequency: 'Once daily', duration: '3 days', instructions: 'IM injection at hospital' },
      { name: 'Tamsulosin', dosage: '0.4mg', frequency: 'Once daily', duration: '2 weeks', instructions: 'Take at bedtime' },
    ],
    notes: 'Drink plenty of water. Strain urine if stone passes.',
  },
  {
    id: 'RX-006', patientId: 'PAT-012', patientName: 'Nirmala Shrestha',
    doctorName: 'Dr. Rajesh Maharjan', date: '2026-09-10', status: 'Active',
    medicines: [
      { name: 'Aceclofenac', dosage: '100mg', frequency: 'Twice daily', duration: '2 weeks', instructions: 'Take after food' },
      { name: 'Calcium + Vitamin D', dosage: '500mg + 250IU', frequency: 'Once daily', duration: '3 months', instructions: 'Take in the morning' },
    ],
    notes: 'Refer to physiotherapy. Weight management important.',
  },
  {
    id: 'RX-007', patientId: 'PAT-006', patientName: 'Priya Magar',
    doctorName: 'Dr. Aarav Shrestha', date: '2026-09-07', status: 'Active',
    medicines: [
      { name: 'Levothyroxine', dosage: '50mcg', frequency: 'Once daily', duration: '6 weeks', instructions: 'Take on empty stomach, 30 min before breakfast' },
    ],
    notes: 'Repeat TSH after 6 weeks.',
  },
  {
    id: 'RX-008', patientId: 'PAT-010', patientName: 'Sangita Limbu',
    doctorName: 'Dr. Sanjay Adhikari', date: '2026-09-12', status: 'Active',
    medicines: [
      { name: 'Clobetasol Propionate Cream', dosage: '0.05%', frequency: 'Twice daily', duration: '2 weeks', instructions: 'Apply thin layer on affected areas' },
      { name: 'Cetirizine', dosage: '10mg', frequency: 'Once daily', duration: '1 week', instructions: 'Take at bedtime for itching' },
    ],
    notes: 'Use moisturizer regularly. Avoid harsh soaps.',
  },
  {
    id: 'RX-009', patientId: 'PAT-011', patientName: 'Gopal Bisht',
    doctorName: 'Dr. Suman Koirala', date: '2026-09-04', status: 'Active',
    medicines: [
      { name: 'Aspirin', dosage: '75mg', frequency: 'Once daily', duration: 'Lifelong', instructions: 'Take after food' },
      { name: 'Atorvastatin', dosage: '40mg', frequency: 'Once daily', duration: 'Lifelong', instructions: 'Take at bedtime' },
      { name: 'Metoprolol', dosage: '50mg', frequency: 'Twice daily', duration: '6 months', instructions: 'Do not stop abruptly' },
      { name: 'Ramipril', dosage: '5mg', frequency: 'Once daily', duration: 'Lifelong', instructions: 'Take in the morning' },
    ],
    notes: 'Cardiac rehabilitation program. Low-fat diet.',
  },
  {
    id: 'RX-010', patientId: 'PAT-015', patientName: 'Laxman Basnet',
    doctorName: 'Dr. Suman Koirala', date: '2026-09-12', status: 'Active',
    medicines: [
      { name: 'IV Furosemide', dosage: '40mg', frequency: 'Twice daily', duration: 'Until stabilized', instructions: 'IV slow push' },
      { name: 'Aspirin', dosage: '300mg', frequency: 'Loading dose', duration: 'Stat', instructions: 'Chew and swallow' },
      { name: 'Nitroglycerin IV', dosage: '5mcg/min', frequency: 'Continuous infusion', duration: '48 hours', instructions: 'Titrate to symptoms' },
    ],
    notes: 'Emergency admission. Monitor vitals every 15 minutes.',
  },
  {
    id: 'RX-011', patientId: 'PAT-002', patientName: 'Sunita Sharma',
    doctorName: 'Dr. Priya Bhandari', date: '2026-09-08', status: 'Completed',
    medicines: [
      { name: 'Amoxicillin', dosage: '250mg', frequency: 'Thrice daily', duration: '5 days', instructions: 'Complete the course' },
      { name: 'Salbutamol Inhaler', dosage: '2 puffs', frequency: 'As needed', duration: '1 month', instructions: 'Use during breathlessness' },
    ],
    notes: 'Asthma under control. Continue inhaler as needed.',
  },
  {
    id: 'RX-012', patientId: 'PAT-013', patientName: 'Ashok Khatri',
    doctorName: 'Dr. Meena Joshi', date: '2026-09-11', status: 'Cancelled',
    medicines: [
      { name: 'Ciprofloxacin', dosage: '500mg', frequency: 'Twice daily', duration: '7 days', instructions: 'Take with plenty of water' },
    ],
    notes: 'Patient did not attend follow-up. Prescription cancelled.',
  },
  {
    id: 'RX-013', patientId: 'PAT-014', patientName: 'Mina Chhetri',
    doctorName: 'Dr. Aarav Shrestha', date: '2026-09-03', status: 'Completed',
    medicines: [
      { name: 'Methotrexate', dosage: '7.5mg', frequency: 'Once weekly', duration: '3 months', instructions: 'Take on the same day each week' },
      { name: 'Folic Acid', dosage: '5mg', frequency: 'Once weekly', duration: '3 months', instructions: 'Take day after Methotrexate' },
    ],
    notes: 'Monitor liver function. Regular CBC.',
  },
  {
    id: 'RX-014', patientId: 'PAT-008', patientName: 'Deepa Karki',
    doctorName: 'Dr. Bikram Rai', date: '2026-09-09', status: 'Active',
    medicines: [
      { name: 'Sumatriptan', dosage: '50mg', frequency: 'As needed', duration: 'PRN', instructions: 'Take at onset of migraine' },
      { name: 'Propranolol', dosage: '40mg', frequency: 'Once daily', duration: '3 months', instructions: 'Take in the morning' },
    ],
    notes: 'Migraine prevention. Keep headache diary.',
  },
  {
    id: 'RX-015', patientId: 'PAT-007', patientName: 'Santosh Tamang',
    doctorName: 'Dr. Rajesh Maharjan', date: '2026-06-20', status: 'Completed',
    medicines: [
      { name: 'Naproxen', dosage: '500mg', frequency: 'Twice daily', duration: '2 weeks', instructions: 'Take after food' },
      { name: 'Muscle Relaxant', dosage: '4mg', frequency: 'At bedtime', duration: '1 week', instructions: 'May cause drowsiness' },
    ],
    notes: 'Back injury healing well. Continue physiotherapy.',
  },
];
