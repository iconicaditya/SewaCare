export interface SurgeryRequest {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  department: string;
  surgeryType: string;
  surgeryDate: string;
  scheduledTime: string;
  priority: 'Emergency' | 'Urgent' | 'Elective';
  status: 'Pending' | 'Approved' | 'Scheduled' | 'Completed' | 'Cancelled';
  preOpDiagnosis: string;
  notes: string;
}

export interface SurgerySchedule {
  id: string;
  requestId: string;
  patientName: string;
  surgeryType: string;
  doctorName: string;
  otNumber: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
}

export interface OperationTheatre {
  id: string;
  name: string;
  type: string;
  equipment: string[];
  status: 'Available' | 'Occupied' | 'Maintenance';
  lastSterilized: string;
}

export interface SurgicalTeam {
  id: string;
  surgeryId: string;
  surgeon: string;
  assistantSurgeon: string;
  anesthesiologist: string;
  scrubNurse: string;
  circulatingNurse: string;
}

export interface SurgeryRecord {
  id: string;
  scheduleId: string;
  patientName: string;
  surgeryType: string;
  surgeon: string;
  startTime: string;
  endTime: string;
  duration: string;
  findings: string;
  complications: string;
  bloodLoss: string;
  implants: string;
  status: 'Completed' | 'In Progress';
  notes: string;
}

export const surgeryRequests: SurgeryRequest[] = [
  { id: 'SR-001', patientId: 'PAT-012', patientName: 'Nirmala Shrestha', doctorName: 'Dr. Rajesh Maharjan', department: 'Orthopedics', surgeryType: 'Total Knee Replacement (Right)', surgeryDate: '2026-09-11', scheduledTime: '08:00', priority: 'Elective', status: 'Completed', preOpDiagnosis: 'Bilateral Osteoarthritis of Knee - Severe', notes: 'Pre-operative assessment done. Clearance obtained.' },
  { id: 'SR-002', patientId: 'PAT-013', patientName: 'Ashok Khatri', doctorName: 'Dr. Rajesh Maharjan', department: 'Orthopedics', surgeryType: 'Open Reduction Internal Fixation - Left Forearm', surgeryDate: '2026-09-09', scheduledTime: '14:00', priority: 'Urgent', status: 'Completed', preOpDiagnosis: 'Left Forearm Fracture (Radius & Ulna)', notes: 'Post RTA. Surgery done within 24 hours.' },
  { id: 'SR-003', patientId: 'PAT-011', patientName: 'Gopal Bisht', doctorName: 'Dr. Suman Koirala', department: 'Cardiology', surgeryType: 'CABG (Triple Bypass)', surgeryDate: '2026-08-30', scheduledTime: '07:00', priority: 'Elective', status: 'Completed', preOpDiagnosis: 'Triple Vessel Coronary Artery Disease', notes: 'CABG x3 with LIMA to LAD, SVG to OM1, SVG to RCA.' },
  { id: 'SR-004', patientId: 'PAT-014', patientName: 'Mina Chhetri', doctorName: 'Dr. Rajesh Maharjan', department: 'Orthopedics', surgeryType: 'Arthroscopic Knee Surgery (Left)', surgeryDate: '2026-09-15', scheduledTime: '10:00', priority: 'Elective', status: 'Approved', preOpDiagnosis: 'Rheumatoid Arthritis - Left Knee', notes: 'Arthroscopic debridement and synovectomy planned.' },
  { id: 'SR-005', patientId: 'PAT-003', patientName: 'Bikash Gurung', doctorName: 'Dr. Suman Koirala', department: 'Cardiology', surgeryType: 'Coronary Angioplasty with Stenting', surgeryDate: '2026-09-18', scheduledTime: '09:00', priority: 'Urgent', status: 'Pending', preOpDiagnosis: 'Significant LAD stenosis on angiography', notes: 'Angiography showed 80% LAD stenosis. PCI planned.' },
  { id: 'SR-006', patientId: 'PAT-009', patientName: 'Rajendra Prasad Poudel', doctorName: 'Dr. Aarav Shrestha', department: 'General Medicine', surgeryType: 'Ureteroscopy with Lithotripsy', surgeryDate: '2026-09-20', scheduledTime: '11:00', priority: 'Elective', status: 'Scheduled', preOpDiagnosis: 'Right Ureteric Calculus (6mm)', notes: 'Failed conservative management. Proceeding with intervention.' },
  { id: 'SR-007', patientId: 'PAT-015', patientName: 'Laxman Basnet', doctorName: 'Dr. Suman Koirala', department: 'Cardiology', surgeryType: 'Emergency Percutaneous Coronary Intervention', surgeryDate: '2026-09-12', scheduledTime: '23:00', priority: 'Emergency', status: 'Cancelled', preOpDiagnosis: 'Acute Coronary Syndrome', notes: 'Patient too unstable for catheterization. Managed medically.' },
  { id: 'SR-008', patientId: 'PAT-005', patientName: 'Krishna Prasad Adhikari', doctorName: 'Dr. Rajesh Maharjan', department: 'Orthopedics', surgeryType: 'Carpal Tunnel Release', surgeryDate: '2026-09-22', scheduledTime: '14:00', priority: 'Elective', status: 'Pending', preOpDiagnosis: 'Bilateral Carpal Tunnel Syndrome', notes: 'Nerve conduction study confirmed. Conservative treatment failed.' },
];

export const surgerySchedule: SurgerySchedule[] = [
  { id: 'SS-001', requestId: 'SR-001', patientName: 'Nirmala Shrestha', surgeryType: 'Total Knee Replacement (Right)', doctorName: 'Dr. Rajesh Maharjan', otNumber: 'OT-01', date: '2026-09-11', startTime: '08:00', endTime: '11:30', status: 'Completed' },
  { id: 'SS-002', requestId: 'SR-002', patientName: 'Ashok Khatri', surgeryType: 'ORIF Left Forearm', doctorName: 'Dr. Rajesh Maharjan', otNumber: 'OT-02', date: '2026-09-09', startTime: '14:00', endTime: '17:00', status: 'Completed' },
  { id: 'SS-003', requestId: 'SR-003', patientName: 'Gopal Bisht', surgeryType: 'CABG (Triple Bypass)', doctorName: 'Dr. Suman Koirala', otNumber: 'OT-01', date: '2026-08-30', startTime: '07:00', endTime: '14:00', status: 'Completed' },
  { id: 'SS-004', requestId: 'SR-004', patientName: 'Mina Chhetri', surgeryType: 'Arthroscopic Knee Surgery', doctorName: 'Dr. Rajesh Maharjan', otNumber: 'OT-02', date: '2026-09-15', startTime: '10:00', endTime: '12:30', status: 'Scheduled' },
  { id: 'SS-005', requestId: 'SR-005', patientName: 'Bikash Gurung', surgeryType: 'Coronary Angioplasty', doctorName: 'Dr. Suman Koirala', otNumber: 'OT-03', date: '2026-09-18', startTime: '09:00', endTime: '11:00', status: 'Scheduled' },
  { id: 'SS-006', requestId: 'SR-006', patientName: 'Rajendra Prasad Poudel', surgeryType: 'Ureteroscopy with Lithotripsy', doctorName: 'Dr. Aarav Shrestha', otNumber: 'OT-02', date: '2026-09-20', startTime: '11:00', endTime: '13:00', status: 'Scheduled' },
];

export const operationTheatres: OperationTheatre[] = [
  { id: 'OT-01', name: 'OT-01 (Major)', type: 'Major Surgery', equipment: ['C-Arm', 'Anesthesia Machine', 'Electrocautery', 'Surgical Table'], status: 'Available', lastSterilized: '2026-09-13 06:00' },
  { id: 'OT-02', name: 'OT-02 (Minor)', type: 'Minor Surgery', equipment: ['Anesthesia Machine', 'Electrocautery', 'Arthroscopy Tower'], status: 'Available', lastSterilized: '2026-09-13 06:30' },
  { id: 'OT-03', name: 'OT-03 (Cath Lab)', type: 'Interventional', equipment: ['Cath Lab', 'IVUS', 'Balloon Pump', 'Defibrillator'], status: 'Available', lastSterilized: '2026-09-12 22:00' },
];

export const surgicalTeams: SurgicalTeam[] = [
  { id: 'ST-001', surgeryId: 'SR-001', surgeon: 'Dr. Rajesh Maharjan', assistantSurgeon: 'Dr. Dinesh Poudel', anesthesiologist: 'Dr. Sanjay Adhikari', scrubNurse: 'Sunil Lama', circulatingNurse: 'Mina Gurung' },
  { id: 'ST-002', surgeryId: 'SR-002', surgeon: 'Dr. Rajesh Maharjan', assistantSurgeon: 'Dr. Dinesh Poudel', anesthesiologist: 'Dr. Sanjay Adhikari', scrubNurse: 'Sunil Lama', circulatingNurse: 'Kamala Dhungana' },
  { id: 'ST-003', surgeryId: 'SR-003', surgeon: 'Dr. Suman Koirala', assistantSurgeon: 'Dr. Dinesh Poudel', anesthesiologist: 'Dr. Sanjay Adhikari', scrubNurse: 'Sunil Lama', circulatingNurse: 'Sarita Bhandari' },
  { id: 'ST-004', surgeryId: 'SR-004', surgeon: 'Dr. Rajesh Maharjan', assistantSurgeon: null as any, anesthesiologist: 'Dr. Sanjay Adhikari', scrubNurse: 'Sunil Lama', circulatingNurse: 'Mina Gurung' },
  { id: 'ST-005', surgeryId: 'SR-005', surgeon: 'Dr. Suman Koirala', assistantSurgeon: 'Dr. Dinesh Poudel', anesthesiologist: 'Dr. Sanjay Adhikari', scrubNurse: 'Sunil Lama', circulatingNurse: 'Nisha Hamal' },
];

export const surgeryRecords: SurgeryRecord[] = [
  { id: 'SRC-001', scheduleId: 'SS-001', patientName: 'Nirmala Shrestha', surgeryType: 'Total Knee Replacement (Right)', surgeon: 'Dr. Rajesh Maharjan', startTime: '08:15', endTime: '11:15', duration: '3 hours', findings: 'Severe grade IV osteoarthritis with complete loss of cartilage. Bone on bone articulation.', complications: 'None', bloodLoss: '350ml', implants: 'Zimmer NexGen LPS Flex Knee Prosthesis', status: 'Completed', notes: 'Uneventful procedure. Patient shifted to recovery room in stable condition.' },
  { id: 'SRC-002', scheduleId: 'SS-002', patientName: 'Ashok Khatri', surgeryType: 'ORIF Left Forearm', surgeon: 'Dr. Rajesh Maharjan', startTime: '14:10', endTime: '16:45', duration: '2 hours 35 minutes', findings: 'Displaced fracture of both radius and ulna mid-shaft. Comminuted fracture fragments.', complications: 'None', bloodLoss: '200ml', implants: '3.5mm LC-DCP plates x2, 3.5mm cortical screws x12', status: 'Completed', notes: 'Anatomic reduction achieved. Good stability. Plaster slab applied.' },
  { id: 'SRC-003', scheduleId: 'SS-003', patientName: 'Gopal Bisht', surgeryType: 'CABG (Triple Bypass)', surgeon: 'Dr. Suman Koirala', startTime: '07:30', endTime: '13:45', duration: '6 hours 15 minutes', findings: 'Triple vessel disease. 90% LAD, 80% OM1, 70% RCA stenosis.', complications: 'None', bloodLoss: '800ml', implants: 'LIMA to LAD, SVG to OM1, SVG to RCA', status: 'Completed', notes: 'Smooth procedure. Patient extubated in ICU. Hemodynamically stable.' },
  { id: 'SRC-004', scheduleId: 'SS-004', patientName: 'Mina Chhetri', surgeryType: 'Arthroscopic Knee Surgery', surgeon: 'Dr. Rajesh Maharjan', startTime: null as any, endTime: null as any, duration: null as any, findings: null as any, complications: null as any, bloodLoss: null as any, implants: null as any, status: 'In Progress' as any, notes: 'Scheduled for 2026-09-15' },
  { id: 'SRC-005', scheduleId: 'SS-005', patientName: 'Bikash Gurung', surgeryType: 'Coronary Angioplasty', surgeon: 'Dr. Suman Koirala', startTime: null as any, endTime: null as any, duration: null as any, findings: null as any, complications: null as any, bloodLoss: null as any, implants: null as any, status: 'In Progress' as any, notes: 'Scheduled for 2026-09-18' },
];
