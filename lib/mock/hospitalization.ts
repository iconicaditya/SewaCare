export interface Admission {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  department: string;
  admissionDate: string;
  admissionType: 'Emergency' | 'Elective' | 'Referral';
  ward: string;
  room: string;
  bed: string;
  diagnosis: string;
  status: 'Active' | 'Discharged' | 'Transferred';
  estimatedDischarge: string;
}

export interface Ward {
  id: string;
  name: string;
  type: string;
  totalBeds: number;
  occupiedBeds: number;
  chargeNurse: string;
  status: 'Active' | 'Inactive';
}

export interface Room {
  id: string;
  number: string;
  ward: string;
  type: 'General' | 'Semi-Private' | 'Private' | 'ICU';
  beds: number;
  status: 'Available' | 'Occupied' | 'Maintenance';
}

export interface Bed {
  id: string;
  number: string;
  room: string;
  ward: string;
  status: 'Available' | 'Occupied' | 'Reserved' | 'Maintenance';
  patientId?: string;
  patientName?: string;
}

export interface NursingRecord {
  id: string;
  admissionId: string;
  patientName: string;
  nurseName: string;
  shift: 'Morning' | 'Afternoon' | 'Night';
  date: string;
  vitalSigns: string;
  notes: string;
  medications: string[];
}

export interface DoctorRound {
  id: string;
  admissionId: string;
  patientName: string;
  doctorName: string;
  date: string;
  findings: string;
  plan: string;
  notes: string;
}

export interface MedicationRecord {
  id: string;
  admissionId: string;
  patientName: string;
  medicine: string;
  dosage: string;
  frequency: string;
  administeredBy: string;
  administeredAt: string;
  status: 'Given' | 'Missed' | 'Scheduled' | 'PRN';
}

export interface DischargeRecord {
  id: string;
  admissionId: string;
  patientName: string;
  dischargeDate: string;
  dischargeType: 'Normal' | 'Against Medical Advice' | 'Transfer' | 'Deceased';
  dischargeSummary: string;
  followUpDate: string;
  followUpDoctor: string;
  medications: string[];
  instructions: string;
}

export const admissions: Admission[] = [
  { id: 'ADM-001', patientId: 'PAT-015', patientName: 'Laxman Basnet', doctorName: 'Dr. Suman Koirala', department: 'Cardiology', admissionDate: '2026-09-12', admissionType: 'Emergency', ward: 'Medical Ward A', room: 'Room 101', bed: 'Bed 1', diagnosis: 'Acute Decompensated Heart Failure', status: 'Active', estimatedDischarge: '2026-09-18' },
  { id: 'ADM-002', patientId: 'PAT-013', patientName: 'Ashok Khatri', doctorName: 'Dr. Rajesh Maharjan', department: 'Orthopedics', admissionDate: '2026-09-08', admissionType: 'Emergency', ward: 'Surgical Ward', room: 'Room 201', bed: 'Bed 3', diagnosis: 'Left Forearm Fracture', status: 'Active', estimatedDischarge: '2026-09-15' },
  { id: 'ADM-003', patientId: 'PAT-011', patientName: 'Gopal Bisht', doctorName: 'Dr. Suman Koirala', department: 'Cardiology', admissionDate: '2026-09-01', admissionType: 'Elective', ward: 'Medical Ward A', room: 'Room 102', bed: 'Bed 1', diagnosis: 'Post CABG Recovery', status: 'Active', estimatedDischarge: '2026-09-14' },
  { id: 'ADM-004', patientId: 'PAT-014', patientName: 'Mina Chhetri', doctorName: 'Dr. Aarav Shrestha', department: 'General Medicine', admissionDate: '2026-09-10', admissionType: 'Referral', ward: 'Medical Ward B', room: 'Room 105', bed: 'Bed 2', diagnosis: 'Rheumatoid Arthritis Flare', status: 'Active', estimatedDischarge: '2026-09-16' },
  { id: 'ADM-005', patientId: 'PAT-012', patientName: 'Nirmala Shrestha', doctorName: 'Dr. Rajesh Maharjan', department: 'Orthopedics', admissionDate: '2026-09-11', admissionType: 'Elective', ward: 'Surgical Ward', room: 'Room 203', bed: 'Bed 1', diagnosis: 'Right Knee Replacement', status: 'Active', estimatedDischarge: '2026-09-18' },
  { id: 'ADM-006', patientId: 'PAT-005', patientName: 'Krishna Prasad Adhikari', doctorName: 'Dr. Aarav Shrestha', department: 'General Medicine', admissionDate: '2026-09-12', admissionType: 'Emergency', ward: 'Medical Ward A', room: 'Room 103', bed: 'Bed 2', diagnosis: 'Uncontrolled Diabetes with Complications', status: 'Active', estimatedDischarge: '2026-09-17' },
  { id: 'ADM-007', patientId: 'PAT-007', patientName: 'Santosh Tamang', doctorName: 'Dr. Rajesh Maharjan', department: 'Orthopedics', admissionDate: '2026-09-05', admissionType: 'Elective', ward: 'Surgical Ward', room: 'Room 202', bed: 'Bed 4', diagnosis: 'Lumbar Disc Herniation', status: 'Discharged', estimatedDischarge: '2026-09-10' },
  { id: 'ADM-008', patientId: 'PAT-002', patientName: 'Sunita Sharma', doctorName: 'Dr. Priya Bhandari', department: 'Pediatrics', admissionDate: '2026-09-08', admissionType: 'Emergency', ward: 'Pediatric Ward', room: 'Room 301', bed: 'Bed 2', diagnosis: 'Severe Asthma Exacerbation', status: 'Discharged', estimatedDischarge: '2026-09-10' },
];

export const wards: Ward[] = [
  { id: 'WARD-001', name: 'Medical Ward A', type: 'General', totalBeds: 30, occupiedBeds: 22, chargeNurse: 'Sushila Bajracharya', status: 'Active' },
  { id: 'WARD-002', name: 'Medical Ward B', type: 'General', totalBeds: 25, occupiedBeds: 18, chargeNurse: 'Sarita Bhandari', status: 'Active' },
  { id: 'WARD-003', name: 'Surgical Ward', type: 'Surgical', totalBeds: 20, occupiedBeds: 14, chargeNurse: 'Mina Gurung', status: 'Active' },
  { id: 'WARD-004', name: 'Pediatric Ward', type: 'Pediatric', totalBeds: 15, occupiedBeds: 8, chargeNurse: 'Nisha Hamal', status: 'Active' },
  { id: 'WARD-005', name: 'Maternity Ward', type: 'Obstetric', totalBeds: 12, occupiedBeds: 7, chargeNurse: 'Kamala Dhungana', status: 'Active' },
];

export const rooms: Room[] = [
  { id: 'RM-001', number: '101', ward: 'Medical Ward A', type: 'General', beds: 4, status: 'Occupied' },
  { id: 'RM-002', number: '102', ward: 'Medical Ward A', type: 'General', beds: 4, status: 'Occupied' },
  { id: 'RM-003', number: '103', ward: 'Medical Ward A', type: 'Semi-Private', beds: 2, status: 'Occupied' },
  { id: 'RM-004', number: '104', ward: 'Medical Ward A', type: 'Private', beds: 1, status: 'Available' },
  { id: 'RM-005', number: '105', ward: 'Medical Ward B', type: 'General', beds: 4, status: 'Occupied' },
  { id: 'RM-006', number: '201', ward: 'Surgical Ward', type: 'General', beds: 4, status: 'Occupied' },
  { id: 'RM-007', number: '202', ward: 'Surgical Ward', type: 'Semi-Private', beds: 2, status: 'Available' },
  { id: 'RM-008', number: '203', ward: 'Surgical Ward', type: 'Private', beds: 1, status: 'Occupied' },
  { id: 'RM-009', number: '301', ward: 'Pediatric Ward', type: 'General', beds: 4, status: 'Occupied' },
  { id: 'RM-010', number: '302', ward: 'Pediatric Ward', type: 'Semi-Private', beds: 2, status: 'Available' },
  { id: 'RM-011', number: '303', ward: 'Pediatric Ward', type: 'Private', beds: 1, status: 'Available' },
  { id: 'RM-012', number: '401', ward: 'Maternity Ward', type: 'General', beds: 4, status: 'Occupied' },
  { id: 'RM-013', number: '402', ward: 'Maternity Ward', type: 'Semi-Private', beds: 2, status: 'Available' },
  { id: 'RM-014', number: '403', ward: 'Maternity Ward', type: 'Private', beds: 1, status: 'Available' },
  { id: 'RM-015', number: '404', ward: 'Maternity Ward', type: 'Private', beds: 1, status: 'Maintenance' },
];

export const beds: Bed[] = [
  { id: 'BED-001', number: 'Bed 1', room: 'Room 101', ward: 'Medical Ward A', status: 'Occupied', patientId: 'PAT-015', patientName: 'Laxman Basnet' },
  { id: 'BED-002', number: 'Bed 2', room: 'Room 101', ward: 'Medical Ward A', status: 'Occupied' },
  { id: 'BED-003', number: 'Bed 3', room: 'Room 101', ward: 'Medical Ward A', status: 'Available' },
  { id: 'BED-004', number: 'Bed 4', room: 'Room 101', ward: 'Medical Ward A', status: 'Available' },
  { id: 'BED-005', number: 'Bed 1', room: 'Room 102', ward: 'Medical Ward A', status: 'Occupied', patientId: 'PAT-011', patientName: 'Gopal Bisht' },
  { id: 'BED-006', number: 'Bed 2', room: 'Room 102', ward: 'Medical Ward A', status: 'Available' },
  { id: 'BED-007', number: 'Bed 1', room: 'Room 103', ward: 'Medical Ward A', status: 'Occupied', patientId: 'PAT-005', patientName: 'Krishna Prasad Adhikari' },
  { id: 'BED-008', number: 'Bed 2', room: 'Room 103', ward: 'Medical Ward A', status: 'Available' },
  { id: 'BED-009', number: 'Bed 1', room: 'Room 104', ward: 'Medical Ward A', status: 'Available' },
  { id: 'BED-010', number: 'Bed 1', room: 'Room 105', ward: 'Medical Ward B', status: 'Occupied' },
  { id: 'BED-011', number: 'Bed 2', room: 'Room 105', ward: 'Medical Ward B', status: 'Occupied', patientId: 'PAT-014', patientName: 'Mina Chhetri' },
  { id: 'BED-012', number: 'Bed 1', room: 'Room 201', ward: 'Surgical Ward', status: 'Occupied' },
  { id: 'BED-013', number: 'Bed 3', room: 'Room 201', ward: 'Surgical Ward', status: 'Occupied', patientId: 'PAT-013', patientName: 'Ashok Khatri' },
  { id: 'BED-014', number: 'Bed 1', room: 'Room 203', ward: 'Surgical Ward', status: 'Occupied', patientId: 'PAT-012', patientName: 'Nirmala Shrestha' },
  { id: 'BED-015', number: 'Bed 2', room: 'Room 301', ward: 'Pediatric Ward', status: 'Available' },
  { id: 'BED-016', number: 'Bed 1', room: 'Room 401', ward: 'Maternity Ward', status: 'Occupied' },
  { id: 'BED-017', number: 'Bed 2', room: 'Room 401', ward: 'Maternity Ward', status: 'Available' },
  { id: 'BED-018', number: 'Bed 3', room: 'Room 401', ward: 'Maternity Ward', status: 'Available' },
  { id: 'BED-019', number: 'Bed 4', room: 'Room 401', ward: 'Maternity Ward', status: 'Occupied' },
  { id: 'BED-020', number: 'Bed 1', room: 'Room 402', ward: 'Maternity Ward', status: 'Reserved' },
];

export const nursingRecords: NursingRecord[] = [
  { id: 'NR-001', admissionId: 'ADM-001', patientName: 'Laxman Basnet', nurseName: 'Kamala Dhungana', shift: 'Morning', date: '2026-09-13', vitalSigns: 'BP: 100/65, HR: 95, Temp: 36.8°C, SpO2: 92%', notes: 'Patient resting comfortably. Oxygen therapy continued. IV furosemide running.', medications: ['IV Furosemide', 'Aspirin', 'Metoprolol'] },
  { id: 'NR-002', admissionId: 'ADM-001', patientName: 'Laxman Basnet', nurseName: 'Sushila Bajracharya', shift: 'Night', date: '2026-09-12', vitalSigns: 'BP: 90/60, HR: 108, Temp: 36.9°C, SpO2: 89%', notes: 'Patient in respiratory distress. Increased O2 flow. Doctor notified.', medications: ['IV Furosemide', 'Nitroglycerin'] },
  { id: 'NR-003', admissionId: 'ADM-002', patientName: 'Ashok Khatri', nurseName: 'Mina Gurung', shift: 'Morning', date: '2026-09-13', vitalSigns: 'BP: 120/80, HR: 78, Temp: 37.0°C, SpO2: 98%', notes: 'Post-surgical site clean and dry. Cast in good position. Pain managed.', medications: ['Paracetamol', 'Amoxicillin'] },
  { id: 'NR-004', admissionId: 'ADM-003', patientName: 'Gopal Bisht', nurseName: 'Sarita Bhandari', shift: 'Afternoon', date: '2026-09-13', vitalSigns: 'BP: 125/80, HR: 72, Temp: 36.7°C, SpO2: 96%', notes: 'Recovery progressing well. Walking with assistance. Cardiac rehab session completed.', medications: ['Aspirin', 'Atorvastatin', 'Metoprolol', 'Ramipril'] },
  { id: 'NR-005', admissionId: 'ADM-004', patientName: 'Mina Chhetri', nurseName: 'Sushila Bajracharya', shift: 'Morning', date: '2026-09-13', vitalSigns: 'BP: 118/72, HR: 76, Temp: 37.2°C, SpO2: 97%', notes: 'Joint pain improving with steroid therapy. Range of motion exercises done.', medications: ['Methotrexate', 'Folic Acid', 'Paracetamol'] },
  { id: 'NR-006', admissionId: 'ADM-005', patientName: 'Nirmala Shrestha', nurseName: 'Kamala Dhungana', shift: 'Morning', date: '2026-09-13', vitalSigns: 'BP: 120/75, HR: 80, Temp: 37.1°C, SpO2: 97%', notes: 'Post knee replacement. Drain output minimal. Physiotherapy started.', medications: ['Diclofenac', 'Calcium + Vitamin D', 'Enoxaparin'] },
  { id: 'NR-007', admissionId: 'ADM-006', patientName: 'Krishna Prasad Adhikari', nurseName: 'Mina Gurung', shift: 'Night', date: '2026-09-12', vitalSigns: 'BP: 140/85, HR: 82, Temp: 37.0°C, SpO2: 94%', notes: 'Blood sugar monitored hourly. Insulin sliding scale initiated. Patient education on foot care.', medications: ['Metformin', 'Insulin', 'Pregabalin'] },
  { id: 'NR-008', admissionId: 'ADM-001', patientName: 'Laxman Basnet', nurseName: 'Parbati Chapai', shift: 'Afternoon', date: '2026-09-13', vitalSigns: 'BP: 95/62, HR: 92, Temp: 36.9°C, SpO2: 91%', notes: 'Patient reports improvement in breathing. Fluid balance monitored. Daily weight recorded.', medications: ['IV Furosemide', 'Aspirin', 'Metoprolol', 'Ramipril'] },
  { id: 'NR-009', admissionId: 'ADM-003', patientName: 'Gopal Bisht', nurseName: 'Sushila Bajracharya', shift: 'Morning', date: '2026-09-12', vitalSigns: 'BP: 128/82, HR: 74, Temp: 36.6°C, SpO2: 97%', notes: 'Chest wound healing well. Walking 200 meters with support. Appetite good.', medications: ['Aspirin', 'Atorvastatin', 'Metoprolol', 'Ramipril'] },
  { id: 'NR-010', admissionId: 'ADM-002', patientName: 'Ashok Khatri', nurseName: 'Nisha Hamal', shift: 'Afternoon', date: '2026-09-12', vitalSigns: 'BP: 115/78, HR: 80, Temp: 37.3°C, SpO2: 98%', notes: 'Elevated arm. Neurovascular checks normal. X-ray reviewed by doctor.', medications: ['Paracetamol', 'Amoxicillin'] },
];

export const doctorRounds: DoctorRound[] = [
  { id: 'DR-001', admissionId: 'ADM-001', patientName: 'Laxman Basnet', doctorName: 'Dr. Suman Koirala', date: '2026-09-13', findings: 'Patient hemodynamically improving. Lung crepitations reduced. SpO2 improving with O2 support.', plan: 'Continue current treatment. Wean O2 if SpO2 stays > 93%. Repeat Echo in 3 days.', notes: 'Family counseled about condition and prognosis.' },
  { id: 'DR-002', admissionId: 'ADM-002', patientName: 'Ashok Khatri', doctorName: 'Dr. Rajesh Maharjan', date: '2026-09-13', findings: 'Post-surgical recovery satisfactory. No signs of compartment syndrome. Wound clean.', plan: 'Continue antibiotics for 5 days. Start gentle ROM exercises. Discharge planning.', notes: 'Will remove sutures in 10 days.' },
  { id: 'DR-003', admissionId: 'ADM-003', patientName: 'Gopal Bisht', doctorName: 'Dr. Suman Koirala', date: '2026-09-13', findings: 'Excellent recovery post CABG. Walking well. Cardiac function improving.', plan: 'Plan discharge tomorrow. Continue cardiac rehabilitation as outpatient.', notes: 'Final echo shows EF improved to 45%.' },
  { id: 'DR-004', admissionId: 'ADM-004', patientName: 'Mina Chhetri', doctorName: 'Dr. Aarav Shrestha', date: '2026-09-13', findings: 'Joint swelling reducing. Pain better controlled. Inflammatory markers trending down.', plan: 'Continue Methotrexate. Add physiotherapy session daily. Plan discharge in 3 days.', notes: 'Rheumatology follow-up in 2 weeks.' },
  { id: 'DR-005', admissionId: 'ADM-005', patientName: 'Nirmala Shrestha', doctorName: 'Dr. Rajesh Maharjan', date: '2026-09-13', findings: 'Post knee replacement recovery on track. Wound healing well. Drain removed.', plan: 'Intensive physiotherapy. Weight bearing as tolerated. Discharge in 5 days.', notes: 'Knee flexion at 70 degrees.' },
  { id: 'DR-006', admissionId: 'ADM-006', patientName: 'Krishna Prasad Adhikari', doctorName: 'Dr. Aarav Shrestha', date: '2026-09-13', findings: 'Blood sugar still erratic despite insulin. Foot examination shows no new ulcers.', plan: 'Adjust insulin dose. Endocrinology consultation. Continue diabetic foot care.', notes: 'HbA1c results pending.' },
  { id: 'DR-007', admissionId: 'ADM-001', patientName: 'Laxman Basnet', doctorName: 'Dr. Suman Koirala', date: '2026-09-12', findings: 'Critical condition. Severe pulmonary edema. Low cardiac output.', plan: 'Emergency treatment: IV Furosemide, Nitroglycerin. ICU transfer if no improvement.', notes: 'Poor prognosis. Family informed.' },
  { id: 'DR-008', admissionId: 'ADM-003', patientName: 'Gopal Bisht', doctorName: 'Dr. Suman Koirala', date: '2026-09-12', findings: 'Day 12 post CABG. Walking well. Chest pain free. Appetite improving.', plan: 'Increase walking distance. Light diet. Review medications before discharge.', notes: 'Very satisfied with recovery.' },
  { id: 'DR-009', admissionId: 'ADM-005', patientName: 'Nirmala Shrestha', doctorName: 'Dr. Rajesh Maharjan', date: '2026-09-12', findings: 'Day 1 post knee replacement. Pain controlled with epidural. Drain output 50ml.', plan: 'Mobilize with walker. Pain management. Monitor drain output.', notes: 'Night shift to monitor vitals closely.' },
  { id: 'DR-010', admissionId: 'ADM-002', patientName: 'Ashok Khatri', doctorName: 'Dr. Rajesh Maharjan', date: '2026-09-12', findings: 'Post-surgical day 5. Good healing. No infection signs.', plan: 'Continue current treatment. Prepare for discharge.', notes: 'Will need follow-up X-ray in 6 weeks.' },
];

export const medicationRecords: MedicationRecord[] = [
  { id: 'MEDR-001', admissionId: 'ADM-001', patientName: 'Laxman Basnet', medicine: 'IV Furosemide', dosage: '40mg', frequency: 'Twice daily', administeredBy: 'Kamala Dhungana', administeredAt: '2026-09-13 08:00', status: 'Given' },
  { id: 'MEDR-002', admissionId: 'ADM-001', patientName: 'Laxman Basnet', medicine: 'Aspirin', dosage: '300mg', frequency: 'Once daily', administeredBy: 'Kamala Dhungana', administeredAt: '2026-09-13 08:30', status: 'Given' },
  { id: 'MEDR-003', admissionId: 'ADM-001', patientName: 'Laxman Basnet', medicine: 'Metoprolol', dosage: '50mg', frequency: 'Twice daily', administeredBy: 'Kamala Dhungana', administeredAt: '2026-09-13 08:00', status: 'Given' },
  { id: 'MEDR-004', admissionId: 'ADM-002', patientName: 'Ashok Khatri', medicine: 'Paracetamol', dosage: '1000mg', frequency: 'Thrice daily', administeredBy: 'Mina Gurung', administeredAt: '2026-09-13 08:00', status: 'Given' },
  { id: 'MEDR-005', admissionId: 'ADM-002', patientName: 'Ashok Khatri', medicine: 'Amoxicillin', dosage: '500mg', frequency: 'Thrice daily', administeredBy: 'Mina Gurung', administeredAt: '2026-09-13 08:00', status: 'Given' },
  { id: 'MEDR-006', admissionId: 'ADM-003', patientName: 'Gopal Bisht', medicine: 'Aspirin', dosage: '75mg', frequency: 'Once daily', administeredBy: 'Sarita Bhandari', administeredAt: '2026-09-13 08:30', status: 'Given' },
  { id: 'MEDR-007', admissionId: 'ADM-003', patientName: 'Gopal Bisht', medicine: 'Atorvastatin', dosage: '40mg', frequency: 'Once daily', administeredBy: 'Sarita Bhandari', administeredAt: '2026-09-13 08:30', status: 'Given' },
  { id: 'MEDR-008', admissionId: 'ADM-004', patientName: 'Mina Chhetri', medicine: 'Methotrexate', dosage: '7.5mg', frequency: 'Once weekly', administeredBy: 'Sushila Bajracharya', administeredAt: '2026-09-13 09:00', status: 'Given' },
  { id: 'MEDR-009', admissionId: 'ADM-005', patientName: 'Nirmala Shrestha', medicine: 'Diclofenac', dosage: '75mg', frequency: 'Twice daily', administeredBy: 'Kamala Dhungana', administeredAt: '2026-09-13 08:00', status: 'Given' },
  { id: 'MEDR-010', admissionId: 'ADM-005', patientName: 'Nirmala Shrestha', medicine: 'Enoxaparin', dosage: '40mg', frequency: 'Once daily', administeredBy: 'Kamala Dhungana', administeredAt: '2026-09-13 20:00', status: 'Scheduled' },
  { id: 'MEDR-011', admissionId: 'ADM-006', patientName: 'Krishna Prasad Adhikari', medicine: 'Metformin', dosage: '850mg', frequency: 'Twice daily', administeredBy: 'Mina Gurung', administeredAt: '2026-09-13 08:00', status: 'Given' },
  { id: 'MEDR-012', admissionId: 'ADM-006', patientName: 'Krishna Prasad Adhikari', medicine: 'Insulin (Regular)', dosage: 'Per sliding scale', frequency: 'QID', administeredBy: 'Mina Gurung', administeredAt: '2026-09-13 12:00', status: 'Given' },
  { id: 'MEDR-013', admissionId: 'ADM-001', patientName: 'Laxman Basnet', medicine: 'IV Furosemide', dosage: '40mg', frequency: 'Twice daily', administeredBy: 'Sushila Bajracharya', administeredAt: '2026-09-13 20:00', status: 'Scheduled' },
  { id: 'MEDR-014', admissionId: 'ADM-003', patientName: 'Gopal Bisht', medicine: 'Metoprolol', dosage: '50mg', frequency: 'Twice daily', administeredBy: 'Sarita Bhandari', administeredAt: '2026-09-13 08:30', status: 'Given' },
  { id: 'MEDR-015', admissionId: 'ADM-004', patientName: 'Mina Chhetri', medicine: 'Folic Acid', dosage: '5mg', frequency: 'Once weekly', administeredBy: 'Sushila Bajracharya', administeredAt: '2026-09-14 09:00', status: 'Scheduled' },
];

export const dischargeRecords: DischargeRecord[] = [
  { id: 'DC-001', admissionId: 'ADM-007', patientName: 'Santosh Tamang', dischargeDate: '2026-09-10', dischargeType: 'Normal', dischargeSummary: 'Patient admitted for lumbar disc herniation. Treated conservatively with medications and physiotherapy. Symptoms improved significantly.', followUpDate: '2026-09-24', followUpDoctor: 'Dr. Rajesh Maharjan', medications: ['Naproxen 500mg twice daily for 2 weeks', 'Physiotherapy referral'], instructions: 'Avoid heavy lifting for 6 weeks. Continue physiotherapy exercises at home.' },
  { id: 'DC-002', admissionId: 'ADM-008', patientName: 'Sunita Sharma', dischargeDate: '2026-09-10', dischargeType: 'Normal', dischargeSummary: 'Admitted for severe asthma exacerbation. Responded well to nebulization and systemic steroids. Breathing normalized.', followUpDate: '2026-09-17', followUpDoctor: 'Dr. Priya Bhandari', medications: ['Salbutamol Inhaler as needed', 'Prednisolone taper 5 days'], instructions: 'Avoid dust and smoke triggers. Continue inhaler therapy. Review asthma action plan.' },
];
