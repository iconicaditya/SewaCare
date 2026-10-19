export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  category: string;
  manufacturer: string;
  form: string;
  strength: string;
  price: number;
  unit: string;
  status: 'Active' | 'Inactive' | 'Discontinued';
}

export interface DispensingRecord {
  id: string;
  prescriptionId: string;
  patientName: string;
  medicines: { name: string; quantity: number; dispensed: number }[];
  dispensedBy: string;
  dispensedAt: string;
  status: 'Dispensed' | 'Partially Dispensed' | 'Pending';
}

export interface StockItem {
  id: string;
  medicineId: string;
  medicineName: string;
  batchNumber: string;
  expiryDate: string;
  quantity: number;
  reorderLevel: number;
  lastUpdated: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  address: string;
  status: 'Active' | 'Inactive';
}

export const medicines: Medicine[] = [
  { id: 'MED-001', name: 'Metformin', genericName: 'Metformin HCl', category: 'Antidiabetic', manufacturer: 'Himalaya Pharma', form: 'Tablet', strength: '500mg', price: 12, unit: 'per tablet', status: 'Active' },
  { id: 'MED-002', name: 'Amlodipine', genericName: 'Amlodipine Besylate', category: 'Antihypertensive', manufacturer: 'Guna Pharma', form: 'Tablet', strength: '5mg', price: 15, unit: 'per tablet', status: 'Active' },
  { id: 'MED-003', name: 'Atenolol', genericName: 'Atenolol', category: 'Beta-blocker', manufacturer: 'Nepal Pharma', form: 'Tablet', strength: '50mg', price: 8, unit: 'per tablet', status: 'Active' },
  { id: 'MED-004', name: 'Omeprazole', genericName: 'Omeprazole', category: 'PPI', manufacturer: 'Himalaya Pharma', form: 'Capsule', strength: '20mg', price: 18, unit: 'per capsule', status: 'Active' },
  { id: 'MED-005', name: 'Amoxicillin', genericName: 'Amoxicillin', category: 'Antibiotic', manufacturer: 'Nepal Pharma', form: 'Capsule', strength: '500mg', price: 10, unit: 'per capsule', status: 'Active' },
  { id: 'MED-006', name: 'Paracetamol', genericName: 'Paracetamol', category: 'Analgesic', manufacturer: 'Nepal Pharma', form: 'Tablet', strength: '500mg', price: 2, unit: 'per tablet', status: 'Active' },
  { id: 'MED-007', name: 'Ibuprofen', genericName: 'Ibuprofen', category: 'NSAID', manufacturer: 'Guna Pharma', form: 'Tablet', strength: '400mg', price: 3, unit: 'per tablet', status: 'Active' },
  { id: 'MED-008', name: 'Cetirizine', genericName: 'Cetirizine HCl', category: 'Antihistamine', manufacturer: 'Himalaya Pharma', form: 'Tablet', strength: '10mg', price: 4, unit: 'per tablet', status: 'Active' },
  { id: 'MED-009', name: 'Pantoprazole', genericName: 'Pantoprazole', category: 'PPI', manufacturer: 'Guna Pharma', form: 'Tablet', strength: '40mg', price: 20, unit: 'per tablet', status: 'Active' },
  { id: 'MED-010', name: 'Diclofenac', genericName: 'Diclofenac Sodium', category: 'NSAID', manufacturer: 'Nepal Pharma', form: 'Tablet', strength: '50mg', price: 4, unit: 'per tablet', status: 'Active' },
  { id: 'MED-011', name: 'Levothyroxine', genericName: 'Levothyroxine Sodium', category: 'Thyroid', manufacturer: 'Himalaya Pharma', form: 'Tablet', strength: '50mcg', price: 25, unit: 'per tablet', status: 'Active' },
  { id: 'MED-012', name: 'Salbutamol', genericName: 'Salbutamol', category: 'Bronchodilator', manufacturer: 'Cipla Nepal', form: 'Inhaler', strength: '100mcg', price: 250, unit: 'per inhaler', status: 'Active' },
  { id: 'MED-013', name: 'Aspirin', genericName: 'Acetylsalicylic Acid', category: 'Antiplatelet', manufacturer: 'Nepal Pharma', form: 'Tablet', strength: '75mg', price: 1, unit: 'per tablet', status: 'Active' },
  { id: 'MED-014', name: 'Atorvastatin', genericName: 'Atorvastatin Calcium', category: 'Statin', manufacturer: 'Himalaya Pharma', form: 'Tablet', strength: '20mg', price: 22, unit: 'per tablet', status: 'Active' },
  { id: 'MED-015', name: 'Furosemide', genericName: 'Furosemide', category: 'Diuretic', manufacturer: 'Nepal Pharma', form: 'Tablet', strength: '40mg', price: 5, unit: 'per tablet', status: 'Active' },
  { id: 'MED-016', name: 'Metoprolol', genericName: 'Metoprolol Tartrate', category: 'Beta-blocker', manufacturer: 'Guna Pharma', form: 'Tablet', strength: '50mg', price: 10, unit: 'per tablet', status: 'Active' },
  { id: 'MED-017', name: 'Ramipril', genericName: 'Ramipril', category: 'ACE Inhibitor', manufacturer: 'Himalaya Pharma', form: 'Tablet', strength: '5mg', price: 18, unit: 'per tablet', status: 'Active' },
  { id: 'MED-018', name: 'Glimepiride', genericName: 'Glimepiride', category: 'Antidiabetic', manufacturer: 'Nepal Pharma', form: 'Tablet', strength: '2mg', price: 15, unit: 'per tablet', status: 'Active' },
  { id: 'MED-019', name: 'Calcium + Vitamin D', genericName: 'Calcium Carbonate + Cholecalciferol', category: 'Supplement', manufacturer: 'Himalaya Pharma', form: 'Tablet', strength: '500mg+250IU', price: 8, unit: 'per tablet', status: 'Active' },
  { id: 'MED-020', name: 'ORS Sachet', genericName: 'Oral Rehydration Salts', category: 'Electrolyte', manufacturer: 'Nepal Pharma', form: 'Powder', strength: 'Standard', price: 5, unit: 'per sachet', status: 'Active' },
];

export const dispensingRecords: DispensingRecord[] = [
  { id: 'DISP-001', prescriptionId: 'RX-001', patientName: 'Ram Bahadur Thapa', medicines: [{ name: 'Metformin 1000mg', quantity: 60, dispensed: 60 }, { name: 'Glimepiride 2mg', quantity: 30, dispensed: 30 }], dispensedBy: 'Prakash Tamang', dispensedAt: '2026-09-10 14:00', status: 'Dispensed' },
  { id: 'DISP-002', prescriptionId: 'RX-002', patientName: 'Bikash Gurung', medicines: [{ name: 'Atenolol 50mg', quantity: 30, dispensed: 30 }, { name: 'Aspirin 75mg', quantity: 30, dispensed: 30 }], dispensedBy: 'Prakash Tamang', dispensedAt: '2026-09-05 16:00', status: 'Dispensed' },
  { id: 'DISP-003', prescriptionId: 'RX-003', patientName: 'Anita Rai', medicines: [{ name: 'Mefenamic Acid 500mg', quantity: 15, dispensed: 15 }, { name: 'Iron Supplement', quantity: 30, dispensed: 30 }], dispensedBy: 'Surendra Bista', dispensedAt: '2026-09-13 15:00', status: 'Dispensed' },
  { id: 'DISP-004', prescriptionId: 'RX-004', patientName: 'Krishna Prasad Adhikari', medicines: [{ name: 'Metformin 850mg', quantity: 60, dispensed: 60 }, { name: 'Pregabalin 75mg', quantity: 30, dispensed: 30 }], dispensedBy: 'Prakash Tamang', dispensedAt: '2026-09-11 15:30', status: 'Dispensed' },
  { id: 'DISP-005', prescriptionId: 'RX-005', patientName: 'Rajendra Prasad Poudel', medicines: [{ name: 'Tamsulosin 0.4mg', quantity: 14, dispensed: 14 }], dispensedBy: 'Surendra Bista', dispensedAt: '2026-09-06 14:00', status: 'Dispensed' },
  { id: 'DISP-006', prescriptionId: 'RX-006', patientName: 'Nirmala Shrestha', medicines: [{ name: 'Aceclofenac 100mg', quantity: 28, dispensed: 28 }, { name: 'Calcium + Vitamin D', quantity: 90, dispensed: 90 }], dispensedBy: 'Prakash Tamang', dispensedAt: '2026-09-10 14:30', status: 'Dispensed' },
  { id: 'DISP-007', prescriptionId: 'RX-007', patientName: 'Priya Magar', medicines: [{ name: 'Levothyroxine 50mcg', quantity: 42, dispensed: 42 }], dispensedBy: 'Surendra Bista', dispensedAt: '2026-09-07 15:00', status: 'Dispensed' },
  { id: 'DISP-008', prescriptionId: 'RX-008', patientName: 'Sangita Limbu', medicines: [{ name: 'Clobetasol Cream', quantity: 1, dispensed: 1 }, { name: 'Cetirizine 10mg', quantity: 7, dispensed: 7 }], dispensedBy: 'Prakash Tamang', dispensedAt: '2026-09-12 16:00', status: 'Dispensed' },
  { id: 'DISP-009', prescriptionId: 'RX-009', patientName: 'Gopal Bisht', medicines: [{ name: 'Aspirin 75mg', quantity: 90, dispensed: 90 }, { name: 'Atorvastatin 40mg', quantity: 90, dispensed: 90 }], dispensedBy: 'Prakash Tamang', dispensedAt: '2026-09-04 16:30', status: 'Dispensed' },
  { id: 'DISP-010', prescriptionId: 'RX-010', patientName: 'Laxman Basnet', medicines: [{ name: 'Aspirin 300mg', quantity: 1, dispensed: 1 }], dispensedBy: 'Prakash Tamang', dispensedAt: '2026-09-12 22:30', status: 'Dispensed' },
];

export const stockItems: StockItem[] = [
  { id: 'STK-001', medicineId: 'MED-001', medicineName: 'Metformin 500mg', batchNumber: 'B2026-001', expiryDate: '2027-06-30', quantity: 500, reorderLevel: 100, lastUpdated: '2026-09-10' },
  { id: 'STK-002', medicineId: 'MED-002', medicineName: 'Amlodipine 5mg', batchNumber: 'B2026-002', expiryDate: '2027-09-30', quantity: 300, reorderLevel: 80, lastUpdated: '2026-09-08' },
  { id: 'STK-003', medicineId: 'MED-003', medicineName: 'Atenolol 50mg', batchNumber: 'B2026-003', expiryDate: '2027-03-31', quantity: 200, reorderLevel: 50, lastUpdated: '2026-09-05' },
  { id: 'STK-004', medicineId: 'MED-004', medicineName: 'Omeprazole 20mg', batchNumber: 'B2026-004', expiryDate: '2027-12-31', quantity: 400, reorderLevel: 100, lastUpdated: '2026-09-12' },
  { id: 'STK-005', medicineId: 'MED-005', medicineName: 'Amoxicillin 500mg', batchNumber: 'B2026-005', expiryDate: '2027-08-31', quantity: 150, reorderLevel: 100, lastUpdated: '2026-09-07' },
  { id: 'STK-006', medicineId: 'MED-006', medicineName: 'Paracetamol 500mg', batchNumber: 'B2026-006', expiryDate: '2028-01-31', quantity: 1000, reorderLevel: 200, lastUpdated: '2026-09-11' },
  { id: 'STK-007', medicineId: 'MED-007', medicineName: 'Ibuprofen 400mg', batchNumber: 'B2026-007', expiryDate: '2027-07-31', quantity: 600, reorderLevel: 150, lastUpdated: '2026-09-10' },
  { id: 'STK-008', medicineId: 'MED-008', medicineName: 'Cetirizine 10mg', batchNumber: 'B2026-008', expiryDate: '2027-11-30', quantity: 80, reorderLevel: 100, lastUpdated: '2026-09-12' },
  { id: 'STK-009', medicineId: 'MED-009', medicineName: 'Pantoprazole 40mg', batchNumber: 'B2026-009', expiryDate: '2027-05-31', quantity: 250, reorderLevel: 60, lastUpdated: '2026-09-09' },
  { id: 'STK-010', medicineId: 'MED-010', medicineName: 'Diclofenac 50mg', batchNumber: 'B2026-010', expiryDate: '2027-10-31', quantity: 350, reorderLevel: 100, lastUpdated: '2026-09-06' },
  { id: 'STK-011', medicineId: 'MED-011', medicineName: 'Levothyroxine 50mcg', batchNumber: 'B2026-011', expiryDate: '2027-04-30', quantity: 120, reorderLevel: 30, lastUpdated: '2026-09-07' },
  { id: 'STK-012', medicineId: 'MED-012', medicineName: 'Salbutamol Inhaler', batchNumber: 'B2026-012', expiryDate: '2027-02-28', quantity: 25, reorderLevel: 10, lastUpdated: '2026-09-08' },
  { id: 'STK-013', medicineId: 'MED-013', medicineName: 'Aspirin 75mg', batchNumber: 'B2026-013', expiryDate: '2028-03-31', quantity: 2000, reorderLevel: 500, lastUpdated: '2026-09-10' },
  { id: 'STK-014', medicineId: 'MED-014', medicineName: 'Atorvastatin 20mg', batchNumber: 'B2026-014', expiryDate: '2027-09-30', quantity: 180, reorderLevel: 50, lastUpdated: '2026-09-04' },
  { id: 'STK-015', medicineId: 'MED-015', medicineName: 'Furosemide 40mg', batchNumber: 'B2026-015', expiryDate: '2027-06-30', quantity: 30, reorderLevel: 50, lastUpdated: '2026-09-12' },
];

export const pharmacySuppliers: Supplier[] = [
  { id: 'SUP-001', name: 'Himalaya Pharma Pvt. Ltd.', contact: '01-4423456', email: 'sales@himalayapharma.com', address: 'Kathmandu', status: 'Active' },
  { id: 'SUP-002', name: 'Nepal Pharma Laboratories', contact: '01-4567890', email: 'info@nepalpharma.com', address: 'Bhaktapur', status: 'Active' },
  { id: 'SUP-003', name: 'Guna Pharma Pvt. Ltd.', contact: '01-4789012', email: 'orders@gunapharma.com', address: 'Lalitpur', status: 'Active' },
  { id: 'SUP-004', name: 'Cipla Nepal Pvt. Ltd.', contact: '01-4901234', email: 'supply@ciplanepal.com', address: 'Kathmandu', status: 'Active' },
  { id: 'SUP-005', name: 'Devi Pharma Distributors', contact: '01-4123456', email: 'devipharma@email.com', address: 'Pokhara', status: 'Inactive' },
];
