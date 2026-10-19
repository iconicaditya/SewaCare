export interface EmergencyPatient {
  id: string;
  patientId: string;
  patientName: string;
  age: number;
  gender: 'Male' | 'Female';
  phone: string;
  arrivalTime: string;
  arrivalMode: 'Ambulance' | 'Walk-in' | 'Referral' | 'Police';
  chiefComplaint: string;
  triageLevel: 'Critical' | 'Emergent' | 'Urgent' | 'Less Urgent' | 'Non-Urgent';
  status: 'Waiting' | 'In Treatment' | 'Admitted' | 'Discharged' | 'Transferred' | 'Deceased';
  assignedDoctor: string;
  notes: string;
}

export interface TriageRecord {
  id: string;
  emergencyId: string;
  patientName: string;
  triageLevel: 'Critical' | 'Emergent' | 'Urgent' | 'Less Urgent' | 'Non-Urgent';
  vitalSigns: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    spO2: string;
    respiratoryRate: string;
    consciousness: string;
  };
  painScale: number;
  assessedBy: string;
  assessedAt: string;
  notes: string;
}

export const emergencyPatients: EmergencyPatient[] = [
  {
    id: 'EMR-001', patientId: 'PAT-015', patientName: 'Laxman Basnet', age: 71, gender: 'Male',
    phone: '9781234567', arrivalTime: '2026-09-12 21:30', arrivalMode: 'Ambulance',
    chiefComplaint: 'Severe chest pain and breathlessness',
    triageLevel: 'Critical', status: 'Admitted', assignedDoctor: 'Dr. Dinesh Poudel',
    notes: 'History of heart failure. ECG showed ST changes. Started emergency protocol.',
  },
  {
    id: 'EMR-002', patientId: 'PAT-005', patientName: 'Krishna Prasad Adhikari', age: 66, gender: 'Male',
    phone: '9881234567', arrivalTime: '2026-09-12 22:00', arrivalMode: 'Ambulance',
    chiefComplaint: 'Breathing difficulty with chest tightness',
    triageLevel: 'Emergent', status: 'Discharged', assignedDoctor: 'Dr. Dinesh Poudel',
    notes: 'Pulmonary edema secondary to heart failure. Stabilized and discharged after treatment.',
  },
  {
    id: 'EMR-003', patientId: 'PAT-001', patientName: 'Ram Bahadur Thapa', age: 41, gender: 'Male',
    phone: '9841234567', arrivalTime: '2026-09-11 14:00', arrivalMode: 'Walk-in',
    chiefComplaint: 'Severe headache with vomiting',
    triageLevel: 'Urgent', status: 'Discharged', assignedDoctor: 'Dr. Dinesh Poudel',
    notes: 'Hypertensive urgency. BP 180/110. Controlled with medication and discharged.',
  },
  {
    id: 'EMR-004', patientId: 'PAT-003', patientName: 'Bikash Gurung', age: 47, gender: 'Male',
    phone: '9861234567', arrivalTime: '2026-09-10 16:30', arrivalMode: 'Referral',
    chiefComplaint: 'Palpitations and dizziness',
    triageLevel: 'Emergent', status: 'Discharged', assignedDoctor: 'Dr. Dinesh Poudel',
    notes: 'Arrhythmia episode. Stabilized with medication. Cardiology follow-up scheduled.',
  },
  {
    id: 'EMR-005', patientId: 'PAT-004', patientName: 'Anita Rai', age: 31, gender: 'Female',
    phone: '9871234567', arrivalTime: '2026-09-09 10:00', arrivalMode: 'Walk-in',
    chiefComplaint: 'Severe abdominal pain',
    triageLevel: 'Urgent', status: 'Discharged', assignedDoctor: 'Dr. Dinesh Poudel',
    notes: 'Acute gastroenteritis. IV fluids and medication given. Discharged same day.',
  },
  {
    id: 'EMR-006', patientId: 'PAT-013', patientName: 'Ashok Khatri', age: 26, gender: 'Male',
    phone: '9761234567', arrivalTime: '2026-09-08 20:00', arrivalMode: 'Police',
    chiefComplaint: 'Road traffic accident - multiple injuries',
    triageLevel: 'Critical', status: 'Admitted', assignedDoctor: 'Dr. Dinesh Poudel',
    notes: 'Multiple lacerations, suspected fracture left forearm. CT scan done. Orthopedic consultation.',
  },
  {
    id: 'EMR-007', patientId: 'PAT-008', patientName: 'Deepa Karki', age: 32, gender: 'Female',
    phone: '9811234567', arrivalTime: '2026-09-07 11:30', arrivalMode: 'Ambulance',
    chiefComplaint: 'Severe allergic reaction - facial swelling',
    triageLevel: 'Emergent', status: 'Discharged', assignedDoctor: 'Dr. Dinesh Poudel',
    notes: 'Anaphylaxis. IV adrenaline and antihistamines administered. Recovered well.',
  },
  {
    id: 'EMR-008', patientId: 'PAT-010', patientName: 'Sangita Limbu', age: 28, gender: 'Female',
    phone: '9831234567', arrivalTime: '2026-09-06 15:00', arrivalMode: 'Walk-in',
    chiefComplaint: 'High fever with body ache',
    triageLevel: 'Less Urgent', status: 'Discharged', assignedDoctor: 'Dr. Dinesh Poudel',
    notes: 'Viral fever. Paracetamol and fluids. Advised rest and follow-up.',
  },
  {
    id: 'EMR-009', patientId: 'PAT-009', patientName: 'Rajendra Prasad Poudel', age: 56, gender: 'Male',
    phone: '9821234567', arrivalTime: '2026-09-05 08:00', arrivalMode: 'Ambulance',
    chiefComplaint: 'Severe renal colic with vomiting',
    triageLevel: 'Urgent', status: 'Discharged', assignedDoctor: 'Dr. Dinesh Poudel',
    notes: 'Renal colic. IV analgesia and antiemetics. Discharged after pain resolved.',
  },
  {
    id: 'EMR-010', patientId: 'PAT-014', patientName: 'Mina Chhetri', age: 43, gender: 'Female',
    phone: '9771234567', arrivalTime: '2026-09-04 13:00', arrivalMode: 'Referral',
    chiefComplaint: 'Severe joint pain flare-up',
    triageLevel: 'Less Urgent', status: 'Discharged', assignedDoctor: 'Dr. Dinesh Poudel',
    notes: 'Rheumatoid arthritis flare. Steroid injection and pain management.',
  },
];

export const triageRecords: TriageRecord[] = [
  {
    id: 'TRI-001', emergencyId: 'EMR-001', patientName: 'Laxman Basnet', triageLevel: 'Critical',
    vitalSigns: { bloodPressure: '90/60', heartRate: '110', temperature: '36.8', spO2: '88%', respiratoryRate: '28', consciousness: 'Alert but anxious' },
    painScale: 9, assessedBy: 'Nurse Kamala Dhungana', assessedAt: '2026-09-12 21:35', notes: 'Immediate intervention required',
  },
  {
    id: 'TRI-002', emergencyId: 'EMR-002', patientName: 'Krishna Prasad Adhikari', triageLevel: 'Emergent',
    vitalSigns: { bloodPressure: '145/90', heartRate: '95', temperature: '37.0', spO2: '91%', respiratoryRate: '24', consciousness: 'Alert' },
    painScale: 7, assessedBy: 'Nurse Kamala Dhungana', assessedAt: '2026-09-12 22:05', notes: 'Respiratory distress, need immediate assessment',
  },
  {
    id: 'TRI-003', emergencyId: 'EMR-003', patientName: 'Ram Bahadur Thapa', triageLevel: 'Urgent',
    vitalSigns: { bloodPressure: '180/110', heartRate: '90', temperature: '37.2', spO2: '96%', respiratoryRate: '20', consciousness: 'Alert' },
    painScale: 8, assessedBy: 'Nurse Parbati Chapai', assessedAt: '2026-09-11 14:05', notes: 'Hypertensive urgency, needs BP control',
  },
  {
    id: 'TRI-004', emergencyId: 'EMR-006', patientName: 'Ashok Khatri', triageLevel: 'Critical',
    vitalSigns: { bloodPressure: '100/70', heartRate: '105', temperature: '37.5', spO2: '94%', respiratoryRate: '22', consciousness: 'Confused' },
    painScale: 8, assessedBy: 'Nurse Kamala Dhungana', assessedAt: '2026-09-08 20:05', notes: 'Trauma patient, possible internal injuries',
  },
  {
    id: 'TRI-005', emergencyId: 'EMR-004', patientName: 'Bikash Gurung', triageLevel: 'Emergent',
    vitalSigns: { bloodPressure: '110/70', heartRate: '140 irregular', temperature: '37.0', spO2: '95%', respiratoryRate: '18', consciousness: 'Alert but dizzy' },
    painScale: 5, assessedBy: 'Nurse Parbati Chapai', assessedAt: '2026-09-10 16:35', notes: 'Irregular heartbeat, ECG needed urgently',
  },
  {
    id: 'TRI-006', emergencyId: 'EMR-005', patientName: 'Anita Rai', triageLevel: 'Urgent',
    vitalSigns: { bloodPressure: '115/75', heartRate: '85', temperature: '38.5', spO2: '97%', respiratoryRate: '18', consciousness: 'Alert' },
    painScale: 7, assessedBy: 'Nurse Parbati Chapai', assessedAt: '2026-09-09 10:05', notes: 'Acute abdominal pain, need to rule out surgical cause',
  },
  {
    id: 'TRI-007', emergencyId: 'EMR-007', patientName: 'Deepa Karki', triageLevel: 'Emergent',
    vitalSigns: { bloodPressure: '95/60', heartRate: '115', temperature: '37.2', spO2: '93%', respiratoryRate: '24', consciousness: 'Alert' },
    painScale: 6, assessedBy: 'Nurse Kamala Dhungana', assessedAt: '2026-09-07 11:33', notes: 'Anaphylaxis - immediate adrenaline',
  },
  {
    id: 'TRI-008', emergencyId: 'EMR-008', patientName: 'Sangita Limbu', triageLevel: 'Less Urgent',
    vitalSigns: { bloodPressure: '110/70', heartRate: '88', temperature: '39.2', spO2: '98%', respiratoryRate: '18', consciousness: 'Alert' },
    painScale: 4, assessedBy: 'Nurse Parbati Chapai', assessedAt: '2026-09-06 15:03', notes: 'High fever, likely viral. Can wait for assessment.',
  },
];
