export type TestCategory =
  | "Metabolic"
  | "Heart"
  | "Hormones"
  | "Thyroid"
  | "Vitamins"
  | "Inflammation"
  | "Blood"
  | "Kidney"
  | "Liver";

export type BiomarkerFlag = "low" | "normal" | "high" | "critical";

export type LabTest = {
  id: string;
  name: string;
  category: TestCategory;
  price: number;
  biomarkers: string[];
  specimen: "Blood" | "Urine" | "Saliva";
  fasting: string;
  turnaround: string;
  providerCode: string;
  tags: string[];
  description: string;
};

export type Panel = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  compareAt: number;
  testIds: string[];
  tags: string[];
  goal: "baseline" | "energy" | "heart" | "hormones" | "comprehensive";
  description: string;
};

export type OrderStatus =
  | "draft"
  | "eligible"
  | "paid"
  | "submitted_to_provider"
  | "lab_order_ready"
  | "collected"
  | "results_received"
  | "reviewed"
  | "released";

export type ProviderOrder = {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  provider: string;
  requisitionUrl: string;
  appointmentUrl: string;
};

export type BiomarkerResult = {
  name: string;
  value: string;
  unit: string;
  range: string;
  flag: BiomarkerFlag;
  insight: string;
};

export type ResultReport = {
  id: string;
  orderNumber: string;
  panelName: string;
  collectionDate: string;
  reviewStatus: "pending" | "reviewed" | "released";
  pdfUrl: string;
  biomarkers: BiomarkerResult[];
};
