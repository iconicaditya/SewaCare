export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  unit: string;
  unitPrice: number;
  description: string;
  status: 'Active' | 'Inactive';
}

export interface InventoryStock {
  id: string;
  itemId: string;
  itemName: string;
  batchNumber: string;
  quantity: number;
  reorderLevel: number;
  location: string;
  lastUpdated: string;
}

export interface PurchaseRequest {
  id: string;
  requestId: string;
  items: { name: string; quantity: number; estimatedCost: number }[];
  requestedBy: string;
  department: string;
  requestDate: string;
  urgency: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'Approved' | 'Rejected' | 'Ordered';
  totalEstimatedCost: number;
}

export interface PurchaseOrder {
  id: string;
  requestId: string;
  supplierName: string;
  items: { name: string; quantity: number; unitPrice: number; total: number }[];
  orderDate: string;
  expectedDelivery: string;
  status: 'Sent' | 'Confirmed' | 'Delivered' | 'Cancelled';
  totalAmount: number;
}

export interface GoodsReceived {
  id: string;
  orderId: string;
  supplierName: string;
  receivedDate: string;
  items: { name: string; ordered: number; received: number; condition: 'Good' | 'Damaged' }[];
  receivedBy: string;
  status: 'Accepted' | 'Partially Accepted' | 'Rejected';
}

export interface InventorySupplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  category: string;
  address: string;
  status: 'Active' | 'Inactive';
}

export const inventoryItems: InventoryItem[] = [
  { id: 'ITM-001', name: 'Surgical Gloves (L)', category: 'PPE', unit: 'Box (100)', unitPrice: 350, description: 'Latex-free surgical gloves, large', status: 'Active' },
  { id: 'ITM-002', name: 'Surgical Gloves (M)', category: 'PPE', unit: 'Box (100)', unitPrice: 350, description: 'Latex-free surgical gloves, medium', status: 'Active' },
  { id: 'ITM-003', name: 'Face Masks', category: 'PPE', unit: 'Box (50)', unitPrice: 200, description: 'Disposable surgical face masks', status: 'Active' },
  { id: 'ITM-004', name: 'IV Cannula 18G', category: 'Consumables', unit: 'Pack (50)', unitPrice: 500, description: 'Intravenous cannula 18 gauge', status: 'Active' },
  { id: 'ITM-005', name: 'IV Cannula 20G', category: 'Consumables', unit: 'Pack (50)', unitPrice: 450, description: 'Intravenous cannula 20 gauge', status: 'Active' },
  { id: 'ITM-006', name: 'Normal Saline 500ml', category: 'IV Fluids', unit: 'Bottle', unitPrice: 25, description: '0.9% NaCl solution', status: 'Active' },
  { id: 'ITM-007', name: 'Ringer Lactate 500ml', category: 'IV Fluids', unit: 'Bottle', unitPrice: 30, description: 'Ringer Lactate solution', status: 'Active' },
  { id: 'ITM-008', name: 'Gauze Pads 10x10', category: 'Consumables', unit: 'Pack (100)', unitPrice: 300, description: 'Sterile gauze pads', status: 'Active' },
  { id: 'ITM-009', name: 'Suture Kit', category: 'Surgical', unit: 'Kit', unitPrice: 200, description: 'Disposable suture kit', status: 'Active' },
  { id: 'ITM-010', name: 'Blood Collection Tube (EDTA)', category: 'Lab Supplies', unit: 'Box (100)', unitPrice: 400, description: 'Purple top EDTA tubes for CBC', status: 'Active' },
  { id: 'ITM-011', name: 'Blood Collection Tube (Plain)', category: 'Lab Supplies', unit: 'Box (100)', unitPrice: 350, description: 'Red top plain tubes', status: 'Active' },
  { id: 'ITM-012', name: 'Syringe 5ml', category: 'Consumables', unit: 'Box (100)', unitPrice: 500, description: 'Disposable 5ml syringes', status: 'Active' },
  { id: 'ITM-013', name: 'Syringe 10ml', category: 'Consumables', unit: 'Box (100)', unitPrice: 600, description: 'Disposable 10ml syringes', status: 'Active' },
  { id: 'ITM-014', name: 'Hand Sanitizer 500ml', category: 'Hygiene', unit: 'Bottle', unitPrice: 150, description: 'Alcohol-based hand sanitizer', status: 'Active' },
  { id: 'ITM-015', name: 'Disposable Bed Sheets', category: 'Linens', unit: 'Pack (20)', unitPrice: 400, description: 'Disposable bed sheets', status: 'Active' },
  { id: 'ITM-016', name: 'Cotton Roll', category: 'Consumables', unit: 'Roll', unitPrice: 50, description: 'Absorbent cotton roll', status: 'Active' },
  { id: 'ITM-017', name: 'Bandage Rolls', category: 'Consumables', unit: 'Pack (10)', unitPrice: 200, description: 'Elastic bandage rolls', status: 'Active' },
  { id: 'ITM-018', name: 'Thermometer Probe Cover', category: 'Lab Supplies', unit: 'Box (200)', unitPrice: 300, description: 'Disposable probe covers for digital thermometer', status: 'Active' },
  { id: 'ITM-019', name: 'Pulse Oximeter Finger Probe', category: 'Equipment', unit: 'Piece', unitPrice: 2500, description: 'Reusable finger probe for pulse oximeter', status: 'Active' },
  { id: 'ITM-020', name: 'ECG Electrodes', category: 'Lab Supplies', unit: 'Pack (50)', unitPrice: 250, description: 'Disposable ECG electrodes', status: 'Active' },
];

export const inventoryStock: InventoryStock[] = [
  { id: 'STK-001', itemId: 'ITM-001', itemName: 'Surgical Gloves (L)', batchNumber: 'GL-2026-001', quantity: 50, reorderLevel: 20, location: 'Store Room A', lastUpdated: '2026-09-12' },
  { id: 'STK-002', itemId: 'ITM-002', itemName: 'Surgical Gloves (M)', batchNumber: 'GM-2026-001', quantity: 45, reorderLevel: 20, location: 'Store Room A', lastUpdated: '2026-09-12' },
  { id: 'STK-003', itemId: 'ITM-003', itemName: 'Face Masks', batchNumber: 'FM-2026-001', quantity: 30, reorderLevel: 15, location: 'Store Room A', lastUpdated: '2026-09-11' },
  { id: 'STK-004', itemId: 'ITM-004', itemName: 'IV Cannula 18G', batchNumber: 'IC-2026-001', quantity: 8, reorderLevel: 10, location: 'OT Store', lastUpdated: '2026-09-10' },
  { id: 'STK-005', itemId: 'ITM-005', itemName: 'IV Cannula 20G', batchNumber: 'IC-2026-002', quantity: 12, reorderLevel: 10, location: 'OT Store', lastUpdated: '2026-09-10' },
  { id: 'STK-006', itemId: 'ITM-006', itemName: 'Normal Saline 500ml', batchNumber: 'NS-2026-001', quantity: 200, reorderLevel: 50, location: 'Pharmacy Store', lastUpdated: '2026-09-13' },
  { id: 'STK-007', itemId: 'ITM-007', itemName: 'Ringer Lactate 500ml', batchNumber: 'RL-2026-001', quantity: 150, reorderLevel: 40, location: 'Pharmacy Store', lastUpdated: '2026-09-13' },
  { id: 'STK-008', itemId: 'ITM-008', itemName: 'Gauze Pads 10x10', batchNumber: 'GP-2026-001', quantity: 25, reorderLevel: 10, location: 'OT Store', lastUpdated: '2026-09-12' },
  { id: 'STK-009', itemId: 'ITM-009', itemName: 'Suture Kit', batchNumber: 'SK-2026-001', quantity: 15, reorderLevel: 10, location: 'OT Store', lastUpdated: '2026-09-11' },
  { id: 'STK-010', itemId: 'ITM-010', itemName: 'Blood Collection Tube (EDTA)', batchNumber: 'BC-2026-001', quantity: 5, reorderLevel: 8, location: 'Lab Store', lastUpdated: '2026-09-12' },
  { id: 'STK-011', itemId: 'ITM-011', itemName: 'Blood Collection Tube (Plain)', batchNumber: 'BC-2026-002', quantity: 10, reorderLevel: 8, location: 'Lab Store', lastUpdated: '2026-09-12' },
  { id: 'STK-012', itemId: 'ITM-012', itemName: 'Syringe 5ml', batchNumber: 'SY-2026-001', quantity: 40, reorderLevel: 15, location: 'Store Room A', lastUpdated: '2026-09-13' },
  { id: 'STK-013', itemId: 'ITM-013', itemName: 'Syringe 10ml', batchNumber: 'SY-2026-002', quantity: 35, reorderLevel: 15, location: 'Store Room A', lastUpdated: '2026-09-13' },
  { id: 'STK-014', itemId: 'ITM-014', itemName: 'Hand Sanitizer 500ml', batchNumber: 'HS-2026-001', quantity: 60, reorderLevel: 20, location: 'Store Room B', lastUpdated: '2026-09-11' },
  { id: 'STK-015', itemId: 'ITM-015', itemName: 'Disposable Bed Sheets', batchNumber: 'BS-2026-001', quantity: 18, reorderLevel: 10, location: 'Store Room B', lastUpdated: '2026-09-10' },
];

export const purchaseRequests: PurchaseRequest[] = [
  { id: 'PR-001', requestId: 'REQ-001', items: [{ name: 'Surgical Gloves (L)', quantity: 20, estimatedCost: 7000 }, { name: 'Surgical Gloves (M)', quantity: 20, estimatedCost: 7000 }], requestedBy: 'Manoj Basnet', department: 'Inventory', requestDate: '2026-09-10', urgency: 'High', status: 'Approved', totalEstimatedCost: 14000 },
  { id: 'PR-002', requestId: 'REQ-002', items: [{ name: 'IV Cannula 18G', quantity: 10, estimatedCost: 5000 }], requestedBy: 'Sunil Lama', department: 'OT', requestDate: '2026-09-11', urgency: 'Medium', status: 'Ordered', totalEstimatedCost: 5000 },
  { id: 'PR-003', requestId: 'REQ-003', items: [{ name: 'Blood Collection Tube (EDTA)', quantity: 15, estimatedCost: 6000 }], requestedBy: 'Binod Paudel', department: 'Laboratory', requestDate: '2026-09-12', urgency: 'High', status: 'Approved', totalEstimatedCost: 6000 },
  { id: 'PR-004', requestId: 'REQ-004', items: [{ name: 'Normal Saline 500ml', quantity: 100, estimatedCost: 2500 }, { name: 'Ringer Lactate 500ml', quantity: 50, estimatedCost: 1500 }], requestedBy: 'Prakash Tamang', department: 'Pharmacy', requestDate: '2026-09-09', urgency: 'Low', status: 'Ordered', totalEstimatedCost: 4000 },
  { id: 'PR-005', requestId: 'REQ-005', items: [{ name: 'Face Masks', quantity: 30, estimatedCost: 6000 }], requestedBy: 'Manoj Basnet', department: 'Inventory', requestDate: '2026-09-08', urgency: 'Medium', status: 'Approved', totalEstimatedCost: 6000 },
  { id: 'PR-006', requestId: 'REQ-006', items: [{ name: 'ECG Electrodes', quantity: 20, estimatedCost: 5000 }], requestedBy: 'Deepak Subedi', department: 'Radiology', requestDate: '2026-09-07', urgency: 'Low', status: 'Pending', totalEstimatedCost: 5000 },
  { id: 'PR-007', requestId: 'REQ-007', items: [{ name: 'Suture Kit', quantity: 10, estimatedCost: 2000 }, { name: 'Gauze Pads 10x10', quantity: 10, estimatedCost: 3000 }], requestedBy: 'Sunil Lama', department: 'OT', requestDate: '2026-09-06', urgency: 'Medium', status: 'Rejected', totalEstimatedCost: 5000 },
  { id: 'PR-008', requestId: 'REQ-008', items: [{ name: 'Disposable Bed Sheets', quantity: 10, estimatedCost: 2000 }], requestedBy: 'Sushila Bajracharya', department: 'Nursing', requestDate: '2026-09-05', urgency: 'Low', status: 'Ordered', totalEstimatedCost: 2000 },
];

export const purchaseOrders: PurchaseOrder[] = [
  { id: 'PO-001', requestId: 'PR-001', supplierName: 'MediSupply Nepal', items: [{ name: 'Surgical Gloves (L)', quantity: 20, unitPrice: 350, total: 7000 }, { name: 'Surgical Gloves (M)', quantity: 20, unitPrice: 350, total: 7000 }], orderDate: '2026-09-11', expectedDelivery: '2026-09-14', status: 'Confirmed', totalAmount: 14000 },
  { id: 'PO-002', requestId: 'PR-002', supplierName: 'HealthCare Distributors', items: [{ name: 'IV Cannula 18G', quantity: 10, unitPrice: 500, total: 5000 }], orderDate: '2026-09-12', expectedDelivery: '2026-09-15', status: 'Sent', totalAmount: 5000 },
  { id: 'PO-003', requestId: 'PR-004', supplierName: 'Nepal Pharma Distributors', items: [{ name: 'Normal Saline 500ml', quantity: 100, unitPrice: 25, total: 2500 }, { name: 'Ringer Lactate 500ml', quantity: 50, unitPrice: 30, total: 1500 }], orderDate: '2026-09-10', expectedDelivery: '2026-09-13', status: 'Delivered', totalAmount: 4000 },
  { id: 'PO-004', requestId: 'PR-005', supplierName: 'MediSupply Nepal', items: [{ name: 'Face Masks', quantity: 30, unitPrice: 200, total: 6000 }], orderDate: '2026-09-09', expectedDelivery: '2026-09-12', status: 'Delivered', totalAmount: 6000 },
  { id: 'PO-005', requestId: 'PR-003', supplierName: 'Lab Supplies Nepal', items: [{ name: 'Blood Collection Tube (EDTA)', quantity: 15, unitPrice: 400, total: 6000 }], orderDate: '2026-09-13', expectedDelivery: '2026-09-16', status: 'Sent', totalAmount: 6000 },
  { id: 'PO-006', requestId: 'PR-008', supplierName: 'MediSupply Nepal', items: [{ name: 'Disposable Bed Sheets', quantity: 10, unitPrice: 200, total: 2000 }], orderDate: '2026-09-06', expectedDelivery: '2026-09-09', status: 'Delivered', totalAmount: 2000 },
];

export const goodsReceived: GoodsReceived[] = [
  { id: 'GR-001', orderId: 'PO-003', supplierName: 'Nepal Pharma Distributors', receivedDate: '2026-09-13', items: [{ name: 'Normal Saline 500ml', ordered: 100, received: 100, condition: 'Good' }, { name: 'Ringer Lactate 500ml', ordered: 50, received: 50, condition: 'Good' }], receivedBy: 'Manoj Basnet', status: 'Accepted' },
  { id: 'GR-002', orderId: 'PO-004', supplierName: 'MediSupply Nepal', receivedDate: '2026-09-12', items: [{ name: 'Face Masks', ordered: 30, received: 30, condition: 'Good' }], receivedBy: 'Manoj Basnet', status: 'Accepted' },
  { id: 'GR-003', orderId: 'PO-006', supplierName: 'MediSupply Nepal', receivedDate: '2026-09-09', items: [{ name: 'Disposable Bed Sheets', ordered: 10, received: 10, condition: 'Good' }], receivedBy: 'Manoj Basnet', status: 'Accepted' },
  { id: 'GR-004', orderId: 'PO-001', supplierName: 'MediSupply Nepal', receivedDate: '2026-09-14', items: [{ name: 'Surgical Gloves (L)', ordered: 20, received: 18, condition: 'Good' }, { name: 'Surgical Gloves (M)', ordered: 20, received: 20, condition: 'Good' }], receivedBy: 'Manoj Basnet', status: 'Partially Accepted' },
  { id: 'GR-005', orderId: 'PO-002', supplierName: 'HealthCare Distributors', receivedDate: '2026-09-15', items: [{ name: 'IV Cannula 18G', ordered: 10, received: 10, condition: 'Good' }], receivedBy: 'Manoj Basnet', status: 'Accepted' },
];

export const inventorySuppliers: InventorySupplier[] = [
  { id: 'ISUP-001', name: 'MediSupply Nepal', contact: '01-4567890', email: 'info@medisupply.com', category: 'General Medical Supplies', address: 'Kathmandu', status: 'Active' },
  { id: 'ISUP-002', name: 'HealthCare Distributors', contact: '01-4678901', email: 'orders@healthcaredist.com', category: 'Surgical Supplies', address: 'Lalitpur', status: 'Active' },
  { id: 'ISUP-003', name: 'Nepal Pharma Distributors', contact: '01-4789012', email: 'supply@nepalpharmadist.com', category: 'IV Fluids & Pharma', address: 'Kathmandu', status: 'Active' },
  { id: 'ISUP-004', name: 'Lab Supplies Nepal', contact: '01-4890123', email: 'orders@labsupplies.com', category: 'Laboratory Supplies', address: 'Bhaktapur', status: 'Active' },
  { id: 'ISUP-005', name: 'Safety First Medical', contact: '01-4901234', email: 'info@safetyfirst.com', category: 'PPE & Safety', address: 'Kathmandu', status: 'Active' },
  { id: 'ISUP-006', name: 'Surgical Instruments Co.', contact: '01-4012345', email: 'sales@surgicalinstruments.com', category: 'Surgical Instruments', address: 'Lalitpur', status: 'Active' },
  { id: 'ISUP-007', name: 'Digital Health Tech', contact: '01-4123456', email: 'info@digitalhealthtech.com', category: 'Medical Equipment', address: 'Kathmandu', status: 'Active' },
  { id: 'ISUP-008', name: 'BioClean Solutions', contact: '01-4234567', email: 'orders@bioclean.com', category: 'Cleaning & Sanitation', address: 'Chitwan', status: 'Inactive' },
];
