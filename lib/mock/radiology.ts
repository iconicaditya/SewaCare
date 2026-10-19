export interface ImagingService {
  id: string;
  name: string;
  category: string;
  price: number;
  turnaroundTime: string;
  status: 'Active' | 'Inactive';
}

export interface RadiologyOrder {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  service: string;
  bodyPart: string;
  clinicalInfo: string;
  orderDate: string;
  scheduledDate: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  priority: 'Routine' | 'Urgent';
}

export interface RadiologyReport {
  id: string;
  orderId: string;
  patientName: string;
  service: string;
  bodyPart: string;
  findings: string;
  impression: string;
  radiologist: string;
  reportDate: string;
  status: 'Draft' | 'Verified' | 'Amended';
}

export const imagingServices: ImagingService[] = [
  { id: 'IMG-001', name: 'X-Ray Chest (PA View)', category: 'X-Ray', price: 500, turnaroundTime: '2 hours', status: 'Active' },
  { id: 'IMG-002', name: 'X-Ray Both Knees', category: 'X-Ray', price: 600, turnaroundTime: '2 hours', status: 'Active' },
  { id: 'IMG-003', name: 'X-Ray Abdomen', category: 'X-Ray', price: 500, turnaroundTime: '2 hours', status: 'Active' },
  { id: 'IMG-004', name: 'CT Scan Head', category: 'CT Scan', price: 3500, turnaroundTime: '6 hours', status: 'Active' },
  { id: 'IMG-005', name: 'CT Scan Abdomen', category: 'CT Scan', price: 5000, turnaroundTime: '6 hours', status: 'Active' },
  { id: 'IMG-006', name: 'MRI Brain', category: 'MRI', price: 8000, turnaroundTime: '24 hours', status: 'Active' },
  { id: 'IMG-007', name: 'MRI Knee', category: 'MRI', price: 7000, turnaroundTime: '24 hours', status: 'Active' },
  { id: 'IMG-008', name: 'Ultrasound Abdomen', category: 'Ultrasound', price: 1500, turnaroundTime: '2 hours', status: 'Active' },
  { id: 'IMG-009', name: 'Ultrasound Pelvis', category: 'Ultrasound', price: 1500, turnaroundTime: '2 hours', status: 'Active' },
  { id: 'IMG-010', name: 'Echocardiography', category: 'Ultrasound', price: 3000, turnaroundTime: '4 hours', status: 'Active' },
];

export const radiologyOrders: RadiologyOrder[] = [
  { id: 'RAD-001', patientId: 'PAT-003', patientName: 'Bikash Gurung', doctorName: 'Dr. Suman Koirala', service: 'Echocardiography', bodyPart: 'Heart', clinicalInfo: 'Chest tightness, angina', orderDate: '2026-09-05', scheduledDate: '2026-09-06', status: 'Completed', priority: 'Routine' },
  { id: 'RAD-002', patientId: 'PAT-005', patientName: 'Krishna Prasad Adhikari', doctorName: 'Dr. Aarav Shrestha', service: 'X-Ray Chest (PA View)', bodyPart: 'Chest', clinicalInfo: 'Diabetes with respiratory symptoms', orderDate: '2026-09-11', scheduledDate: '2026-09-11', status: 'Completed', priority: 'Urgent' },
  { id: 'RAD-003', patientId: 'PAT-015', patientName: 'Laxman Basnet', doctorName: 'Dr. Suman Koirala', service: 'X-Ray Chest (PA View)', bodyPart: 'Chest', clinicalInfo: 'Acute heart failure', orderDate: '2026-09-12', scheduledDate: '2026-09-12', status: 'Completed', priority: 'Urgent' },
  { id: 'RAD-004', patientId: 'PAT-015', patientName: 'Laxman Basnet', doctorName: 'Dr. Suman Koirala', service: 'Echocardiography', bodyPart: 'Heart', clinicalInfo: 'Acute decompensated heart failure', orderDate: '2026-09-12', scheduledDate: '2026-09-12', status: 'Completed', priority: 'Urgent' },
  { id: 'RAD-005', patientId: 'PAT-012', patientName: 'Nirmala Shrestha', doctorName: 'Dr. Rajesh Maharjan', service: 'X-Ray Both Knees', bodyPart: 'Knees', clinicalInfo: 'Bilateral knee pain, OA', orderDate: '2026-09-10', scheduledDate: '2026-09-10', status: 'Completed', priority: 'Routine' },
  { id: 'RAD-006', patientId: 'PAT-008', patientName: 'Deepa Karki', doctorName: 'Dr. Bikram Rai', service: 'MRI Brain', bodyPart: 'Brain', clinicalInfo: 'Recurring migraine', orderDate: '2026-09-09', scheduledDate: '2026-09-14', status: 'Scheduled', priority: 'Routine' },
  { id: 'RAD-007', patientId: 'PAT-009', patientName: 'Rajendra Prasad Poudel', doctorName: 'Dr. Aarav Shrestha', service: 'Ultrasound Abdomen', bodyPart: 'Abdomen', clinicalInfo: 'Right flank pain, renal colic', orderDate: '2026-09-06', scheduledDate: '2026-09-06', status: 'Completed', priority: 'Routine' },
  { id: 'RAD-008', patientId: 'PAT-004', patientName: 'Anita Rai', doctorName: 'Dr. Anjali Thapa', service: 'Ultrasound Pelvis', bodyPart: 'Pelvis', clinicalInfo: 'Irregular menstrual cycles', orderDate: '2026-09-13', scheduledDate: '2026-09-15', status: 'Scheduled', priority: 'Routine' },
  { id: 'RAD-009', patientId: 'PAT-006', patientName: 'Priya Magar', doctorName: 'Dr. Aarav Shrestha', service: 'CT Scan Head', bodyPart: 'Head', clinicalInfo: 'Persistent headache, hypothyroid', orderDate: '2026-09-07', scheduledDate: '2026-09-16', status: 'Scheduled', priority: 'Routine' },
  { id: 'RAD-010', patientId: 'PAT-011', patientName: 'Gopal Bisht', doctorName: 'Dr. Suman Koirala', service: 'Echocardiography', bodyPart: 'Heart', clinicalInfo: 'Post CABG follow-up', orderDate: '2026-09-04', scheduledDate: '2026-09-05', status: 'Completed', priority: 'Routine' },
];

export const radiologyReports: RadiologyReport[] = [
  {
    id: 'RDR-001', orderId: 'RAD-001', patientName: 'Bikash Gurung', service: 'Echocardiography', bodyPart: 'Heart',
    findings: 'Mild LV systolic dysfunction. EF 45%. Mild mitral regurgitation. No pericardial effusion.',
    impression: 'Mild dilated cardiomyopathy with LV dysfunction',
    radiologist: 'Dr. Sanjay Adhikari', reportDate: '2026-09-06', status: 'Verified',
  },
  {
    id: 'RDR-002', orderId: 'RAD-002', patientName: 'Krishna Prasad Adhikari', service: 'X-Ray Chest', bodyPart: 'Chest',
    findings: 'Bilateral mild basal congestion. Heart size mildly enlarged. No pleural effusion. Mild cardiomegaly with early pulmonary congestion.',
    impression: 'Mild cardiomegaly with early heart failure changes',
    radiologist: 'Dr. Sanjay Adhikari', reportDate: '2026-09-11', status: 'Verified',
  },
  {
    id: 'RDR-003', orderId: 'RAD-003', patientName: 'Laxman Basnet', service: 'X-Ray Chest', bodyPart: 'Chest',
    findings: 'Cardiomegaly. Bilateral pleural effusion. Pulmonary edema. Pulmonary venous congestion.',
    impression: 'Acute pulmonary edema with bilateral pleural effusion - consistent with acute heart failure',
    radiologist: 'Dr. Sanjay Adhikari', reportDate: '2026-09-12', status: 'Verified',
  },
  {
    id: 'RDR-004', orderId: 'RAD-004', patientName: 'Laxman Basnet', service: 'Echocardiography', bodyPart: 'Heart',
    findings: 'Severe LV systolic dysfunction. EF 25%. Severe MR. Moderate TR. No vegetations.',
    impression: 'Severe dilated cardiomyopathy with EF 25%. Severe mitral regurgitation.',
    radiologist: 'Dr. Sanjay Adhikari', reportDate: '2026-09-12', status: 'Verified',
  },
  {
    id: 'RDR-005', orderId: 'RAD-005', patientName: 'Nirmala Shrestha', service: 'X-Ray Both Knees', bodyPart: 'Knees',
    findings: 'Bilateral knee joints show joint space narrowing, osteophyte formation, subchondral sclerosis. Left > Right.',
    impression: 'Bilateral osteoarthritis of knee - moderate to severe grade',
    radiologist: 'Dr. Sanjay Adhikari', reportDate: '2026-09-10', status: 'Verified',
  },
  {
    id: 'RDR-006', orderId: 'RAD-007', patientName: 'Rajendra Prasad Poudel', service: 'Ultrasound Abdomen', bodyPart: 'Abdomen',
    findings: 'Right kidney shows 6mm calculus at the right UVJ. Mild right hydroureteronephrosis. Left kidney normal.',
    impression: 'Right ureteric calculus (6mm) with mild hydroureteronephrosis',
    radiologist: 'Dr. Sanjay Adhikari', reportDate: '2026-09-06', status: 'Verified',
  },
  {
    id: 'RDR-007', orderId: 'RAD-010', patientName: 'Gopal Bisht', service: 'Echocardiography', bodyPart: 'Heart',
    findings: 'Post CABG status. Mild LV systolic dysfunction. EF 40%. Graft patency not fully assessed on TTE. No RWMA.',
    impression: 'Post CABG with mild LV dysfunction. Clinical correlation recommended.',
    radiologist: 'Dr. Sanjay Adhikari', reportDate: '2026-09-05', status: 'Verified',
  },
  {
    id: 'RDR-008', orderId: 'RAD-009', patientName: 'Priya Magar', service: 'CT Scan Head', bodyPart: 'Head',
    findings: 'No acute intracranial abnormality. Brain parenchyma normal. No mass, bleed, or midline shift.',
    impression: 'Normal CT Brain',
    radiologist: 'Dr. Sanjay Adhikari', reportDate: '2026-09-16', status: 'Draft',
  },
];
