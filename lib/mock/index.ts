// Central export for all mock data
export { patients, type Patient } from './patients';
export { departments, type Department } from './departments';
export { doctors, type Doctor } from './doctors';
export { staff, type Staff } from './staff';
export { appointments, type Appointment } from './appointments';
export { consultations, type Consultation } from './consultations';
export { prescriptions, type Prescription, type PrescriptionMedicine } from './prescriptions';
export {
  labTests, labOrders, sampleCollections, labReports,
  type LabTest, type LabOrder, type SampleCollection, type LabReport,
} from './laboratory';
export {
  imagingServices, radiologyOrders, radiologyReports,
  type ImagingService, type RadiologyOrder, type RadiologyReport,
} from './radiology';
export {
  medicines, dispensingRecords, stockItems, pharmacySuppliers,
  type Medicine, type DispensingRecord, type StockItem, type Supplier,
} from './pharmacy';
export {
  emergencyPatients, triageRecords,
  type EmergencyPatient, type TriageRecord,
} from './emergency';
export {
  admissions, wards, rooms, beds, nursingRecords, doctorRounds, medicationRecords, dischargeRecords,
  type Admission, type Ward, type Room, type Bed, type NursingRecord, type DoctorRound, type MedicationRecord, type DischargeRecord,
} from './hospitalization';
export {
  icuPatients, icuBeds, monitoringRecords, icuNursingNotes,
  type ICUPatient, type ICUBed, type MonitoringRecord, type ICUNursingNote,
} from './icu';
export {
  surgeryRequests, surgerySchedule, operationTheatres, surgicalTeams, surgeryRecords,
  type SurgeryRequest, type SurgerySchedule, type OperationTheatre, type SurgicalTeam, type SurgeryRecord,
} from './operation-theatre';
export {
  bloodInventory, bloodDonors, bloodRequests, crossMatches, bloodIssues,
  type BloodUnit, type BloodDonor, type BloodRequest, type CrossMatch, type BloodIssue,
} from './blood-bank';
export {
  invoices, payments, pendingPayments, billingServices, refunds,
  type Invoice, type Payment, type PendingPayment, type BillingService, type Refund,
} from './billing';
export {
  insuranceProviders, patientInsurance, insuranceClaims,
  type InsuranceProvider, type PatientInsurance, type InsuranceClaim,
} from './insurance';
export {
  inventoryItems, inventoryStock, purchaseRequests, purchaseOrders, goodsReceived, inventorySuppliers,
  type InventoryItem, type InventoryStock, type PurchaseRequest, type PurchaseOrder, type GoodsReceived, type InventorySupplier,
} from './inventory';
export {
  equipmentList, maintenanceRecords, serviceHistory,
  type Equipment, type MaintenanceRecord, type ServiceHistory,
} from './equipment';
export { roles, type Role } from './roles';
export { attendanceRecords, type AttendanceRecord } from './attendance';
export { leaveRecords, type LeaveRecord } from './leave';
export { notifications, type Notification } from './notifications';
export { documents, type Document } from './documents';
export { auditLogs, type AuditLog } from './audit-logs';
export { revenueRecords, expenseRecords, type RevenueRecord, type ExpenseRecord } from './finance';
