export interface Equipment {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  serialNumber: string;
  department: string;
  location: string;
  purchaseDate: string;
  warrantyExpiry: string;
  status: 'Operational' | 'Under Maintenance' | 'Out of Service' | 'Retired';
  lastMaintenance: string;
}

export interface MaintenanceRecord {
  id: string;
  equipmentId: string;
  equipmentName: string;
  maintenanceType: 'Preventive' | 'Corrective' | 'Calibration' | 'Emergency';
  description: string;
  scheduledDate: string;
  completedDate: string;
  technician: string;
  cost: number;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Overdue';
  notes: string;
}

export interface ServiceHistory {
  id: string;
  equipmentId: string;
  equipmentName: string;
  serviceDate: string;
  issueReported: string;
  actionTaken: string;
  partsReplaced: string;
  technician: string;
  downtime: string;
  cost: number;
}

export const equipmentList: Equipment[] = [
  { id: 'EQ-001', name: 'X-Ray Machine', model: 'Philips DigitalDiagnost C90', manufacturer: 'Philips', serialNumber: 'PH-XR-2021-001', department: 'Radiology', location: 'X-Ray Room', purchaseDate: '2021-03-15', warrantyExpiry: '2026-03-15', status: 'Operational', lastMaintenance: '2026-08-15' },
  { id: 'EQ-002', name: 'CT Scanner', model: 'Siemens SOMATOM go.Top', manufacturer: 'Siemens', serialNumber: 'SI-CT-2022-001', department: 'Radiology', location: 'CT Room', purchaseDate: '2022-06-01', warrantyExpiry: '2027-06-01', status: 'Operational', lastMaintenance: '2026-07-20' },
  { id: 'EQ-003', name: 'MRI Machine', model: 'GE SIGNA Explorer', manufacturer: 'GE Healthcare', serialNumber: 'GE-MRI-2023-001', department: 'Radiology', location: 'MRI Room', purchaseDate: '2023-01-10', warrantyExpiry: '2028-01-10', status: 'Operational', lastMaintenance: '2026-09-01' },
  { id: 'EQ-004', name: 'Ultrasound Machine', model: 'GE LOGIQ P9', manufacturer: 'GE Healthcare', serialNumber: 'GE-US-2022-002', department: 'Radiology', location: 'Ultrasound Room', purchaseDate: '2022-04-20', warrantyExpiry: '2027-04-20', status: 'Operational', lastMaintenance: '2026-06-10' },
  { id: 'EQ-005', name: 'Echocardiography Machine', model: 'Philips EPIQ 5', manufacturer: 'Philips', serialNumber: 'PH-ECHO-2021-001', department: 'Cardiology', location: 'Cardiology OPD', purchaseDate: '2021-08-15', warrantyExpiry: '2026-08-15', status: 'Operational', lastMaintenance: '2026-05-20' },
  { id: 'EQ-006', name: 'ECG Machine', model: 'Nihon Kohden ECG-1350P', manufacturer: 'Nihon Kohden', serialNumber: 'NK-ECG-2020-003', department: 'Cardiology', location: 'Emergency', purchaseDate: '2020-11-01', warrantyExpiry: '2025-11-01', status: 'Operational', lastMaintenance: '2026-04-15' },
  { id: 'EQ-007', name: 'Ventilator', model: 'Hamilton C6', manufacturer: 'Hamilton Medical', serialNumber: 'HM-VT-2022-001', department: 'ICU', location: 'ICU Bed 1', purchaseDate: '2022-02-15', warrantyExpiry: '2027-02-15', status: 'Operational', lastMaintenance: '2026-08-01' },
  { id: 'EQ-008', name: 'Patient Monitor', model: 'Philips MX800', manufacturer: 'Philips', serialNumber: 'PH-PM-2021-005', department: 'ICU', location: 'ICU', purchaseDate: '2021-05-10', warrantyExpiry: '2026-05-10', status: 'Operational', lastMaintenance: '2026-07-15' },
  { id: 'EQ-009', name: 'Defibrillator', model: 'ZOLL X Series', manufacturer: 'ZOLL Medical', serialNumber: 'ZL-DEF-2023-001', department: 'Emergency', location: 'Emergency', purchaseDate: '2023-03-01', warrantyExpiry: '2028-03-01', status: 'Operational', lastMaintenance: '2026-06-20' },
  { id: 'EQ-010', name: 'Anesthesia Machine', model: 'Dräger Perseus A500', manufacturer: 'Dräger', serialNumber: 'DG-AM-2022-002', department: 'Operation Theatre', location: 'OT-01', purchaseDate: '2022-01-20', warrantyExpiry: '2027-01-20', status: 'Operational', lastMaintenance: '2026-09-05' },
  { id: 'EQ-011', name: 'C-Arm Fluoroscopy', model: 'Ziehm Vision RFD 3D', manufacturer: 'Ziehm Imaging', serialNumber: 'ZI-CA-2021-001', department: 'Operation Theatre', location: 'OT-01', purchaseDate: '2021-10-01', warrantyExpiry: '2026-10-01', status: 'Operational', lastMaintenance: '2026-08-10' },
  { id: 'EQ-012', name: 'Autoclave', model: 'Steris AMSCO V-PRO 1', manufacturer: 'Steris', serialNumber: 'ST-AC-2020-002', department: 'Central Sterile', location: 'CSSD', purchaseDate: '2020-06-15', warrantyExpiry: '2025-06-15', status: 'Under Maintenance', lastMaintenance: '2026-09-10' },
  { id: 'EQ-013', name: 'Blood Gas Analyzer', model: 'Radiometer ABL90 FLEX', manufacturer: 'Radiometer', serialNumber: 'RD-BGA-2022-001', department: 'Laboratory', location: 'Lab', purchaseDate: '2022-07-01', warrantyExpiry: '2027-07-01', status: 'Operational', lastMaintenance: '2026-07-01' },
  { id: 'EQ-014', name: 'Hematology Analyzer', model: 'Sysmex XN-1000', manufacturer: 'Sysmex', serialNumber: 'SY-HA-2021-001', department: 'Laboratory', location: 'Lab', purchaseDate: '2021-09-01', warrantyExpiry: '2026-09-01', status: 'Operational', lastMaintenance: '2026-08-20' },
  { id: 'EQ-015', name: 'Infusion Pump', model: 'B. Braun Infusomat Space', manufacturer: 'B. Braun', serialNumber: 'BB-IP-2023-005', department: 'ICU', location: 'ICU', purchaseDate: '2023-04-15', warrantyExpiry: '2028-04-15', status: 'Operational', lastMaintenance: '2026-06-01' },
];

export const maintenanceRecords: MaintenanceRecord[] = [
  { id: 'MNT-001', equipmentId: 'EQ-001', equipmentName: 'X-Ray Machine', maintenanceType: 'Preventive', description: 'Quarterly preventive maintenance - calibration and safety check', scheduledDate: '2026-08-15', completedDate: '2026-08-15', technician: 'Rajesh Electronics', cost: 5000, status: 'Completed', notes: 'All parameters within normal range' },
  { id: 'MNT-002', equipmentId: 'EQ-002', equipmentName: 'CT Scanner', maintenanceType: 'Preventive', description: 'Semi-annual preventive maintenance', scheduledDate: '2026-07-20', completedDate: '2026-07-20', technician: 'Siemens Service', cost: 15000, status: 'Completed', notes: 'Tube hours within limits. Software updated.' },
  { id: 'MNT-003', equipmentId: 'EQ-012', equipmentName: 'Autoclave', maintenanceType: 'Corrective', description: 'Door seal replacement and pressure calibration', scheduledDate: '2026-09-10', completedDate: '', technician: 'Steris Service Team', cost: 8000, status: 'In Progress', notes: 'Parts ordered, expected completion in 2 days' },
  { id: 'MNT-004', equipmentId: 'EQ-014', equipmentName: 'Hematology Analyzer', maintenanceType: 'Calibration', description: 'Annual calibration with reference materials', scheduledDate: '2026-08-20', completedDate: '2026-08-20', technician: 'Sysmex Nepal', cost: 12000, status: 'Completed', notes: 'All parameters calibrated. QC passed.' },
  { id: 'MNT-005', equipmentId: 'EQ-003', equipmentName: 'MRI Machine', maintenanceType: 'Preventive', description: 'Quarterly preventive maintenance', scheduledDate: '2026-09-01', completedDate: '2026-09-01', technician: 'GE Healthcare Nepal', cost: 20000, status: 'Completed', notes: 'Cryogen level checked. Helium topped up.' },
  { id: 'MNT-006', equipmentId: 'EQ-007', equipmentName: 'Ventilator', maintenanceType: 'Preventive', description: 'Annual preventive maintenance and calibration', scheduledDate: '2026-08-01', completedDate: '2026-08-01', technician: 'Hamilton Service', cost: 8000, status: 'Completed', notes: 'All alarm parameters verified. Flow sensors calibrated.' },
  { id: 'MNT-007', equipmentId: 'EQ-006', equipmentName: 'ECG Machine', maintenanceType: 'Calibration', description: 'Annual ECG calibration and lead testing', scheduledDate: '2026-04-15', completedDate: '2026-04-15', technician: 'Nihon Kohden Service', cost: 3000, status: 'Completed', notes: 'Accuracy verified against standard signals.' },
  { id: 'MNT-008', equipmentId: 'EQ-010', equipmentName: 'Anesthesia Machine', maintenanceType: 'Preventive', description: 'Preventive maintenance - vaporizer calibration, leak test', scheduledDate: '2026-09-05', completedDate: '2026-09-05', technician: 'Dräger Service', cost: 10000, status: 'Completed', notes: 'No leaks detected. Vaporizer accuracy within spec.' },
  { id: 'MNT-009', equipmentId: 'EQ-009', equipmentName: 'Defibrillator', maintenanceType: 'Preventive', description: 'Semi-annual battery and energy delivery test', scheduledDate: '2026-06-20', completedDate: '2026-06-20', technician: 'ZOLL Service', cost: 4000, status: 'Completed', notes: 'Battery health 95%. Energy delivery accurate.' },
  { id: 'MNT-010', equipmentId: 'EQ-005', equipmentName: 'Echocardiography Machine', maintenanceType: 'Calibration', description: 'Annual probe calibration and image quality check', scheduledDate: '2026-10-20', completedDate: '', technician: 'Philips Service', cost: 6000, status: 'Scheduled', notes: '' },
];

export const serviceHistory: ServiceHistory[] = [
  { id: 'SH-001', equipmentId: 'EQ-008', equipmentName: 'Patient Monitor', serviceDate: '2026-09-05', issueReported: 'SpO2 readings inaccurate', actionTaken: 'Replaced SpO2 sensor module and recalibrated', partsReplaced: 'SpO2 sensor module', technician: 'Philips Service', downtime: '4 hours', cost: 15000 },
  { id: 'SH-002', equipmentId: 'EQ-006', equipmentName: 'ECG Machine', serviceDate: '2026-08-15', issueReported: 'Lead II not recording', actionTaken: 'Replaced lead cable and checked connections', partsReplaced: 'ECG Lead Cable Set', technician: 'Nihon Kohden Service', downtime: '2 hours', cost: 3000 },
  { id: 'SH-003', equipmentId: 'EQ-004', equipmentName: 'Ultrasound Machine', serviceDate: '2026-07-20', issueReported: 'Probe producing artifacts', actionTaken: 'Lens replacement and recalibration', partsReplaced: 'Probe Lens', technician: 'GE Healthcare', downtime: '6 hours', cost: 8000 },
  { id: 'SH-004', equipmentId: 'EQ-012', equipmentName: 'Autoclave', serviceDate: '2026-06-10', issueReported: 'Pressure not reaching target', actionTaken: 'Replaced pressure relief valve and gaskets', partsReplaced: 'Pressure Valve, Door Gaskets', technician: 'Steris Service', downtime: '24 hours', cost: 12000 },
  { id: 'SH-005', equipmentId: 'EQ-015', equipmentName: 'Infusion Pump', serviceDate: '2026-08-25', issueReported: 'Flow rate calibration drift', actionTaken: 'Recalibrated and replaced tubing mechanism', partsReplaced: 'Tubing Mechanism', technician: 'B. Braun Service', downtime: '3 hours', cost: 5000 },
  { id: 'SH-006', equipmentId: 'EQ-007', equipmentName: 'Ventilator', serviceDate: '2026-07-10', issueReported: 'Low battery warning during use', actionTaken: 'Replaced battery pack and tested backup system', partsReplaced: 'Battery Pack', technician: 'Hamilton Service', downtime: '5 hours', cost: 20000 },
  { id: 'SH-007', equipmentId: 'EQ-013', equipmentName: 'Blood Gas Analyzer', serviceDate: '2026-09-01', issueReported: 'Electrode warning - aging electrodes', actionTaken: 'Replaced pH, pCO2, and pO2 electrodes', partsReplaced: 'pH Electrode, pCO2 Electrode, pO2 Electrode', technician: 'Radiometer Service', downtime: '2 hours', cost: 25000 },
  { id: 'SH-008', equipmentId: 'EQ-001', equipmentName: 'X-Ray Machine', serviceDate: '2026-06-25', issueReported: 'Exposure timer inconsistency', actionTaken: 'Calibrated timer circuit and replaced worn relay', partsReplaced: 'Timer Relay', technician: 'Philips Service', downtime: '8 hours', cost: 7000 },
];
