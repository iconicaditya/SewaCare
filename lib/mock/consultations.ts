export interface Consultation {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  department: string;
  date: string;
  chiefComplaint: string;
  symptoms: string[];
  vitalSigns: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    weight: string;
    respiratoryRate: string;
  };
  examination: string;
  diagnosis: string;
  notes: string;
  testsOrdered: string[];
  prescription: string;
}

export const consultations: Consultation[] = [
  {
    id: 'CON-001', patientId: 'PAT-001', patientName: 'Ram Bahadur Thapa',
    doctorId: 'DOC-001', doctorName: 'Dr. Aarav Shrestha', department: 'General Medicine',
    date: '2026-09-10', chiefComplaint: 'Frequent urination and increased thirst',
    symptoms: ['Polyuria', 'Polydipsia', 'Fatigue'],
    vitalSigns: { bloodPressure: '140/90', heartRate: '82', temperature: '98.4', weight: '78', respiratoryRate: '18' },
    examination: 'Obese, mild dehydration. No peripheral neuropathy detected.',
    diagnosis: 'Uncontrolled Type 2 Diabetes Mellitus',
    notes: 'HbA1c elevated. Adjust medication dosage.',
    testsOrdered: ['HbA1c', 'Fasting Blood Sugar', 'Lipid Profile'],
    prescription: 'Metformin 1000mg twice daily, Glimepiride 2mg once daily',
  },
  {
    id: 'CON-002', patientId: 'PAT-003', patientName: 'Bikash Gurung',
    doctorId: 'DOC-002', doctorName: 'Dr. Suman Koirala', department: 'Cardiology',
    date: '2026-09-05', chiefComplaint: 'Chest tightness and shortness of breath',
    symptoms: ['Chest tightness', 'Dyspnea on exertion', 'Palpitations'],
    vitalSigns: { bloodPressure: '150/95', heartRate: '95', temperature: '98.6', weight: '85', respiratoryRate: '22' },
    examination: 'S4 gallop present. Bilateral mild pedal edema.',
    diagnosis: 'Stable Angina Pectoris, Hypertension',
    notes: 'Recommend echocardiography and stress test.',
    testsOrdered: ['ECG', 'Echocardiography', 'Stress Test', 'Cardiac Enzymes'],
    prescription: 'Atenolol 50mg once daily, Aspirin 75mg once daily, Nitroglycerin sublingual PRN',
  },
  {
    id: 'CON-003', patientId: 'PAT-004', patientName: 'Anita Rai',
    doctorId: 'DOC-005', doctorName: 'Dr. Anjali Thapa', department: 'Gynecology',
    date: '2026-09-13', chiefComplaint: 'Irregular menstrual cycles',
    symptoms: ['Irregular periods', 'Heavy bleeding', 'Mild cramping'],
    vitalSigns: { bloodPressure: '110/70', heartRate: '72', temperature: '98.2', weight: '58', respiratoryRate: '16' },
    examination: 'Abdominal examination normal. Pelvic examination within normal limits.',
    diagnosis: 'Dysmenorrhea with irregular cycles',
    notes: 'Rule out PCOS. Lifestyle modifications recommended.',
    testsOrdered: ['CBC', 'Thyroid Profile', 'Pelvic Ultrasound'],
    prescription: 'Mefenamic acid 500mg thrice daily during periods, Iron supplements',
  },
  {
    id: 'CON-004', patientId: 'PAT-005', patientName: 'Krishna Prasad Adhikari',
    doctorId: 'DOC-001', doctorName: 'Dr. Aarav Shrestha', department: 'General Medicine',
    date: '2026-09-11', chiefComplaint: 'Uncontrolled blood sugar levels',
    symptoms: ['Polyuria', 'Blurred vision', 'Numbness in feet'],
    vitalSigns: { bloodPressure: '145/88', heartRate: '78', temperature: '98.6', weight: '72', respiratoryRate: '18' },
    examination: 'Peripheral neuropathy detected in both feet. Fundoscopy shows mild retinopathy.',
    diagnosis: 'Type 2 Diabetes with complications',
    notes: 'Referral to ophthalmology and neurology.',
    testsOrdered: ['HbA1c', 'Renal Function Test', 'Nerve Conduction Study'],
    prescription: 'Metformin 850mg twice daily, Pregabalin 75mg at night, Multivitamins',
  },
  {
    id: 'CON-005', patientId: 'PAT-009', patientName: 'Rajendra Prasad Poudel',
    doctorId: 'DOC-001', doctorName: 'Dr. Aarav Shrestha', department: 'General Medicine',
    date: '2026-09-06', chiefComplaint: 'Severe right flank pain',
    symptoms: ['Flank pain', 'Hematuria', 'Nausea'],
    vitalSigns: { bloodPressure: '130/85', heartRate: '88', temperature: '99.2', weight: '80', respiratoryRate: '20' },
    examination: 'Right CVA tenderness positive. Abdomen soft, no guarding.',
    diagnosis: 'Renal Colic - Right Ureteric Calculus (6mm)',
    notes: 'Prescribed pain management and fluids. Follow-up in 2 weeks.',
    testsOrdered: ['Urinalysis', 'KUB Ultrasound', 'Serum Creatinine'],
    prescription: 'Diclofenac 75mg IM stat, Tamsulosin 0.4mg once daily, plenty of fluids',
  },
  {
    id: 'CON-006', patientId: 'PAT-012', patientName: 'Nirmala Shrestha',
    doctorId: 'DOC-004', doctorName: 'Dr. Rajesh Maharjan', department: 'Orthopedics',
    date: '2026-09-10', chiefComplaint: 'Bilateral knee pain for 6 months',
    symptoms: ['Knee pain', 'Stiffness', 'Difficulty climbing stairs'],
    vitalSigns: { bloodPressure: '125/80', heartRate: '74', temperature: '98.4', weight: '65', respiratoryRate: '16' },
    examination: 'Bilateral knee crepitus. Mild joint effusion on left. ROM reduced.',
    diagnosis: 'Bilateral Osteoarthritis of Knee',
    notes: 'Physiotherapy recommended. Consider joint replacement if no improvement.',
    testsOrdered: ['X-ray both knees', 'ESR', 'CRP'],
    prescription: 'Aceclofenac 100mg twice daily, Calcium + Vitamin D supplements, Physiotherapy referral',
  },
  {
    id: 'CON-007', patientId: 'PAT-006', patientName: 'Priya Magar',
    doctorId: 'DOC-001', doctorName: 'Dr. Aarav Shrestha', department: 'General Medicine',
    date: '2026-09-07', chiefComplaint: 'Weight gain and fatigue',
    symptoms: ['Weight gain', 'Fatigue', 'Hair loss', 'Constipation'],
    vitalSigns: { bloodPressure: '120/75', heartRate: '68', temperature: '97.8', weight: '68', respiratoryRate: '16' },
    examination: 'Dry skin, delayed relaxation of deep tendon reflexes.',
    diagnosis: 'Hypothyroidism',
    notes: 'Thyroid levels need monitoring. Start replacement therapy.',
    testsOrdered: ['TSH', 'Free T4', 'Lipid Profile'],
    prescription: 'Levothyroxine 50mcg once daily on empty stomach, Repeat TSH in 6 weeks',
  },
  {
    id: 'CON-008', patientId: 'PAT-010', patientName: 'Sangita Limbu',
    doctorId: 'DOC-008', doctorName: 'Dr. Sanjay Adhikari', department: 'Dermatology',
    date: '2026-09-12', chiefComplaint: 'Recurring skin rash on arms',
    symptoms: ['Itching', 'Red patches', 'Scaling'],
    vitalSigns: { bloodPressure: '115/70', heartRate: '72', temperature: '98.4', weight: '52', respiratoryRate: '16' },
    examination: 'Erythematous scaly plaques on both forearms. No vesicles.',
    diagnosis: 'Plaque Psoriasis - Mild',
    notes: 'Topical treatment. Avoid irritants.',
    testsOrdered: ['Skin Biopsy'],
    prescription: 'Clobetasol propionate cream 0.05% twice daily, Moisturizer, Antihistamine',
  },
  {
    id: 'CON-009', patientId: 'PAT-011', patientName: 'Gopal Bisht',
    doctorId: 'DOC-002', doctorName: 'Dr. Suman Koirala', department: 'Cardiology',
    date: '2026-09-04', chiefComplaint: 'Post cardiac surgery follow-up',
    symptoms: ['Mild chest discomfort', 'Fatigue'],
    vitalSigns: { bloodPressure: '128/82', heartRate: '76', temperature: '98.6', weight: '74', respiratoryRate: '18' },
    examination: 'Surgical scar healed. No murmurs. Lungs clear.',
    diagnosis: 'Post CABG - Stable recovery',
    notes: 'Good recovery. Continue cardiac rehabilitation.',
    testsOrdered: ['ECG', 'Echocardiography', 'Lipid Profile'],
    prescription: 'Aspirin 75mg, Atorvastatin 40mg, Metoprolol 50mg, Ramipril 5mg',
  },
  {
    id: 'CON-010', patientId: 'PAT-015', patientName: 'Laxman Basnet',
    doctorId: 'DOC-002', doctorName: 'Dr. Suman Koirala', department: 'Cardiology',
    date: '2026-09-12', chiefComplaint: 'Sudden onset chest pain and breathlessness',
    symptoms: ['Severe chest pain', 'Dyspnea', 'Sweating', 'Nausea'],
    vitalSigns: { bloodPressure: '90/60', heartRate: '110', temperature: '98.8', weight: '68', respiratoryRate: '28' },
    examination: 'Diaphoretic, anxious. Bilateral crackles on lung bases. S3 gallop.',
    diagnosis: 'Acute Decompensated Heart Failure',
    notes: 'Emergency admission. Start IV furosemide and monitor.',
    testsOrdered: ['ECG', 'Cardiac Enzymes', 'Chest X-ray', 'BNP', 'Echo'],
    prescription: 'IV Furosemide 40mg, Nitroglycerin IV, Aspirin 300mg loading dose',
  },
];
