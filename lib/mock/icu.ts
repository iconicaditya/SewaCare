export interface ICUPatient {
  id: string;
  patientId: string;
  patientName: string;
  age: number;
  gender: 'Male' | 'Female';
  admissionDate: string;
  diagnosis: string;
  assignedDoctor: string;
  assignedNurse: string;
  bedNumber: string;
  status: 'Critical' | 'Stable' | 'Improving' | 'Transfer Pending';
  ventilator: boolean;
  notes: string;
}

export interface ICUBed {
  id: string;
  number: string;
  zone: string;
  status: 'Occupied' | 'Available' | 'Maintenance';
  patientId?: string;
  patientName?: string;
  ventilator: boolean;
}

export interface MonitoringRecord {
  id: string;
  patientId: string;
  patientName: string;
  time: string;
  heartRate: number;
  bloodPressure: string;
  spO2: number;
  temperature: number;
  respiratoryRate: number;
  urineOutput: string;
  fluidBalance: string;
  notes: string;
  recordedBy: string;
}

export interface ICUNursingNote {
  id: string;
  patientId: string;
  patientName: string;
  nurseName: string;
  shift: 'Morning' | 'Afternoon' | 'Night';
  date: string;
  neurologicalStatus: string;
  respiratoryStatus: string;
  cardiovascularStatus: string;
  ivAccess: string;
  drainOutput: string;
  generalNotes: string;
}

export const icuPatients: ICUPatient[] = [
  {
    id: 'ICUP-001', patientId: 'PAT-015', patientName: 'Laxman Basnet', age: 71, gender: 'Male',
    admissionDate: '2026-09-12', diagnosis: 'Acute Decompensated Heart Failure',
    assignedDoctor: 'Dr. Suman Koirala', assignedNurse: 'Kamala Dhungana', bedNumber: 'ICU-Bed-1',
    status: 'Critical', ventilator: true, notes: 'On mechanical ventilation. NIV trial failed. Continuous monitoring.',
  },
  {
    id: 'ICUP-002', patientId: 'PAT-011', patientName: 'Gopal Bisht', age: 56, gender: 'Male',
    admissionDate: '2026-09-01', diagnosis: 'Post CABG - ICU Recovery',
    assignedDoctor: 'Dr. Suman Koirala', assignedNurse: 'Sushila Bajracharya', bedNumber: 'ICU-Bed-3',
    status: 'Improving', ventilator: false, notes: 'Extubated day 2. Weaned off vasopressors. Monitoring hemodynamics.',
  },
  {
    id: 'ICUP-003', patientId: 'PAT-013', patientName: 'Ashok Khatri', age: 26, gender: 'Male',
    admissionDate: '2026-09-08', diagnosis: 'Multiple Trauma - Road Traffic Accident',
    assignedDoctor: 'Dr. Rajesh Maharjan', assignedNurse: 'Mina Gurung', bedNumber: 'ICU-Bed-5',
    status: 'Improving', ventilator: false, notes: 'Post-operative recovery. Fracture fixation done. Neurologically stable.',
  },
  {
    id: 'ICUP-004', patientId: 'PAT-005', patientName: 'Krishna Prasad Adhikari', age: 66, gender: 'Male',
    admissionDate: '2026-09-12', diagnosis: 'Uncontrolled DM with Diabetic Ketoacidosis',
    assignedDoctor: 'Dr. Aarav Shrestha', assignedNurse: 'Kamala Dhungana', bedNumber: 'ICU-Bed-7',
    status: 'Stable', ventilator: false, notes: 'DKA resolved. Insulin infusion ongoing. Blood sugar trending down.',
  },
  {
    id: 'ICUP-005', patientId: 'PAT-008', patientName: 'Deepa Karki', age: 32, gender: 'Female',
    admissionDate: '2026-09-07', diagnosis: 'Post Anaphylaxis - ICU Observation',
    assignedDoctor: 'Dr. Dinesh Poudel', assignedNurse: 'Sarita Bhandari', bedNumber: 'ICU-Bed-8',
    status: 'Transfer Pending', ventilator: false, notes: 'Stable for 24 hours. Plan to transfer to ward.',
  },
];

export const icuBeds: ICUBed[] = [
  { id: 'ICU-BED-001', number: 'ICU-Bed-1', zone: 'Zone A', status: 'Occupied', patientId: 'PAT-015', patientName: 'Laxman Basnet', ventilator: true },
  { id: 'ICU-BED-002', number: 'ICU-Bed-2', zone: 'Zone A', status: 'Available', ventilator: true },
  { id: 'ICU-BED-003', number: 'ICU-Bed-3', zone: 'Zone A', status: 'Occupied', patientId: 'PAT-011', patientName: 'Gopal Bisht', ventilator: false },
  { id: 'ICU-BED-004', number: 'ICU-Bed-4', zone: 'Zone B', status: 'Available', ventilator: false },
  { id: 'ICU-BED-005', number: 'ICU-Bed-5', zone: 'Zone B', status: 'Occupied', patientId: 'PAT-013', patientName: 'Ashok Khatri', ventilator: false },
  { id: 'ICU-BED-006', number: 'ICU-Bed-6', zone: 'Zone B', status: 'Maintenance', ventilator: false },
  { id: 'ICU-BED-007', number: 'ICU-Bed-7', zone: 'Zone C', status: 'Occupied', patientId: 'PAT-005', patientName: 'Krishna Prasad Adhikari', ventilator: false },
  { id: 'ICU-BED-008', number: 'ICU-Bed-8', zone: 'Zone C', status: 'Occupied', patientId: 'PAT-008', patientName: 'Deepa Karki', ventilator: false },
];

export const monitoringRecords: MonitoringRecord[] = [
  { id: 'MON-001', patientId: 'PAT-015', patientName: 'Laxman Basnet', time: '2026-09-13 08:00', heartRate: 95, bloodPressure: '100/65', spO2: 92, temperature: 36.8, respiratoryRate: 18, urineOutput: '30ml/hr', fluidBalance: '-500ml', notes: 'On ventilator. Hemodynamically stable on current settings.', recordedBy: 'Kamala Dhungana' },
  { id: 'MON-002', patientId: 'PAT-015', patientName: 'Laxman Basnet', time: '2026-09-13 12:00', heartRate: 88, bloodPressure: '105/68', spO2: 94, temperature: 36.9, respiratoryRate: 16, urineOutput: '35ml/hr', fluidBalance: '-200ml', notes: 'Improving. SpO2 better on current ventilator settings.', recordedBy: 'Sushila Bajracharya' },
  { id: 'MON-003', patientId: 'PAT-011', patientName: 'Gopal Bisht', time: '2026-09-13 08:00', heartRate: 72, bloodPressure: '125/80', spO2: 97, temperature: 36.7, respiratoryRate: 16, urineOutput: '50ml/hr', fluidBalance: '+100ml', notes: 'Stable hemodynamics. Walking with assistance during physio session.', recordedBy: 'Sushila Bajracharya' },
  { id: 'MON-004', patientId: 'PAT-013', patientName: 'Ashok Khatri', time: '2026-09-13 08:00', heartRate: 78, bloodPressure: '120/80', spO2: 98, temperature: 37.0, respiratoryRate: 18, urineOutput: '60ml/hr', fluidBalance: '+200ml', notes: 'Neurologically intact. GCS 15/15. Pain controlled.', recordedBy: 'Mina Gurung' },
  { id: 'MON-005', patientId: 'PAT-005', patientName: 'Krishna Prasad Adhikari', time: '2026-09-13 08:00', heartRate: 82, bloodPressure: '130/82', spO2: 96, temperature: 37.0, respiratoryRate: 20, urineOutput: '40ml/hr', fluidBalance: '0ml', notes: 'Blood sugar 180mg/dL. Adjusted insulin drip. DKA resolving.', recordedBy: 'Kamala Dhungana' },
  { id: 'MON-006', patientId: 'PAT-008', patientName: 'Deepa Karki', time: '2026-09-13 08:00', heartRate: 76, bloodPressure: '115/75', spO2: 98, temperature: 36.8, respiratoryRate: 16, urineOutput: '55ml/hr', fluidBalance: '+50ml', notes: 'Stable. No further allergic symptoms. Ready for ward transfer.', recordedBy: 'Sarita Bhandari' },
  { id: 'MON-007', patientId: 'PAT-015', patientName: 'Laxman Basnet', time: '2026-09-13 16:00', heartRate: 85, bloodPressure: '108/70', spO2: 95, temperature: 37.0, respiratoryRate: 15, urineOutput: '32ml/hr', fluidBalance: '-100ml', notes: 'Improving trend. Discussed ventilator weaning with team.', recordedBy: 'Kamala Dhungana' },
  { id: 'MON-008', patientId: 'PAT-011', patientName: 'Gopal Bisht', time: '2026-09-13 20:00', heartRate: 68, bloodPressure: '118/75', spO2: 97, temperature: 36.6, respiratoryRate: 14, urineOutput: '45ml/hr', fluidBalance: '+150ml', notes: 'Resting comfortably. Vital signs stable overnight.', recordedBy: 'Kamala Dhungana' },
  { id: 'MON-009', patientId: 'PAT-005', patientName: 'Krishna Prasad Adhikari', time: '2026-09-13 16:00', heartRate: 80, bloodPressure: '135/85', spO2: 96, temperature: 36.9, respiratoryRate: 18, urineOutput: '38ml/hr', fluidBalance: '-100ml', notes: 'Blood sugar 160mg/dL. Continue insulin infusion. Electrolytes normal.', recordedBy: 'Sushila Bajracharya' },
  { id: 'MON-010', patientId: 'PAT-013', patientName: 'Ashok Khatri', time: '2026-09-13 20:00', heartRate: 75, bloodPressure: '118/78', spO2: 98, temperature: 37.1, respiratoryRate: 16, urineOutput: '55ml/hr', fluidBalance: '+100ml', notes: 'Settled for the night. Pain well controlled with oral analgesics.', recordedBy: 'Mina Gurung' },
];

export const icuNursingNotes: ICUNursingNote[] = [
  { id: 'ICUN-001', patientId: 'PAT-015', patientName: 'Laxman Basnet', nurseName: 'Kamala Dhungana', shift: 'Morning', date: '2026-09-13', neurologicalStatus: 'Sedated, GCS 8 (E2V2M4)', respiratoryStatus: 'On mechanical ventilation, AC mode, TV 400ml, RR 14, FiO2 50%', cardiovascularStatus: 'HR 95, BP 100/65, on noradrenaline 0.05mcg/kg/min', ivAccess: 'Two 18G cannulae - R forearm, L antecubital', drainOutput: 'Urinary catheter - 30ml/hr', generalNotes: 'Continuous monitoring. Family at bedside. Night shift to monitor closely.' },
  { id: 'ICUN-002', patientId: 'PAT-011', patientName: 'Gopal Bisht', nurseName: 'Sushila Bajracharya', shift: 'Morning', date: '2026-09-13', neurologicalStatus: 'Alert and oriented x4, GCS 15/15', respiratoryStatus: 'Spontaneous breathing, no O2 support, SpO2 97%', cardiovascularStatus: 'HR 72, BP 125/80, regular rhythm, no vasopressors', ivAccess: 'One 20G cannula - L hand', drainOutput: 'Urinary catheter removed, voiding spontaneously', generalNotes: 'Excellent recovery. Walking with physiotherapist. Discussing ward transfer.' },
  { id: 'ICUN-003', patientId: 'PAT-013', patientName: 'Ashok Khatri', nurseName: 'Mina Gurung', shift: 'Morning', date: '2026-09-13', neurologicalStatus: 'Alert and oriented x4, GCS 15/15, no signs of raised ICP', respiratoryStatus: 'Spontaneous breathing, SpO2 98% on room air', cardiovascularStatus: 'HR 78, BP 120/80, hemodynamically stable', ivAccess: 'One 20G cannula - R hand', drainOutput: 'Urinary catheter - 60ml/hr', generalNotes: 'Post-fracture fixation recovery. Pain managed with oral analgesics.' },
  { id: 'ICUN-004', patientId: 'PAT-005', patientName: 'Krishna Prasad Adhikari', nurseName: 'Kamala Dhungana', shift: 'Afternoon', date: '2026-09-13', neurologicalStatus: 'Alert, GCS 15/15, mild confusion resolving', respiratoryStatus: 'Spontaneous breathing, SpO2 96% on room air', cardiovascularStatus: 'HR 80, BP 130/82, stable', ivAccess: 'One 20G cannula - R forearm', drainOutput: 'Urinary catheter - 40ml/hr', generalNotes: 'DKA management. Insulin infusion running. Blood sugar monitoring Q2H.' },
  { id: 'ICUN-005', patientId: 'PAT-008', patientName: 'Deepa Karki', nurseName: 'Sarita Bhandari', shift: 'Morning', date: '2026-09-13', neurologicalStatus: 'Alert and oriented x4, GCS 15/15', respiratoryStatus: 'Spontaneous breathing, SpO2 98%', cardiovascularStatus: 'HR 76, BP 115/75, stable', ivAccess: 'One 20G cannula - L hand', drainOutput: 'Urinary catheter - 55ml/hr', generalNotes: 'Ready for ward transfer. Paperwork completed.' },
  { id: 'ICUN-006', patientId: 'PAT-015', patientName: 'Laxman Basnet', nurseName: 'Sushila Bajracharya', shift: 'Night', date: '2026-09-12', neurologicalStatus: 'Sedated, GCS 7 (E1V2M4)', respiratoryStatus: 'On mechanical ventilation, FiO2 60%, SpO2 89%', cardiovascularStatus: 'HR 108, BP 88/55, noradrenaline 0.1mcg/kg/min', ivAccess: 'Two 18G cannulae + central line', drainOutput: 'Urinary catheter - 20ml/hr, low output', generalNotes: 'Critical night. Hemodynamically unstable. Increasing vasopressor support.' },
  { id: 'ICUN-007', patientId: 'PAT-011', patientName: 'Gopal Bisht', nurseName: 'Sushila Bajracharya', shift: 'Night', date: '2026-09-12', neurologicalStatus: 'Sleeping, easily arousable, GCS 15/15', respiratoryStatus: 'Spontaneous breathing, SpO2 97%', cardiovascularStatus: 'HR 68, BP 120/78, stable', ivAccess: 'One 20G cannula - L hand', drainOutput: 'Urinary catheter removed', generalNotes: 'Restful night. Vitals stable. Ready for ward transfer.' },
  { id: 'ICUN-008', patientId: 'PAT-013', patientName: 'Ashok Khatri', nurseName: 'Mina Gurung', shift: 'Night', date: '2026-09-12', neurologicalStatus: 'Sleeping, GCS 15/15', respiratoryStatus: 'Spontaneous breathing, SpO2 98%', cardiovascularStatus: 'HR 74, BP 118/76, stable', ivAccess: 'One 20G cannula - R hand', drainOutput: 'Urinary catheter - 50ml/hr', generalNotes: 'Uneventful night. Pain well controlled. sleeping comfortably.' },
];
