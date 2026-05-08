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

export type LabPartnerTier = "aggregator" | "regional" | "mobile" | "national";

export type LabAccessMode = "clinician_authorized" | "direct_access" | "blocked";

export type LabOrderMode = "direct_access" | "provider_authorization_included";

export type CollectionType = "walk_in" | "mobile" | "kit";

export type LabOutreachCategory =
  | "api_network"
  | "national_lab"
  | "regional_lab"
  | "mobile_phlebotomy"
  | "specialty_lab"
  | "retail_collection"
  | "data_connectivity";

export type LabOutreachStage =
  | "research"
  | "queued"
  | "contacted"
  | "meeting_booked"
  | "packet_sent"
  | "pricing_received"
  | "contracting"
  | "integrating"
  | "active"
  | "not_fit";

export type LabEligibility = {
  state: string;
  eligible: boolean;
  message: string;
  accessMode: LabAccessMode;
  requiresClinicianAuthorization: boolean;
};

export type LabPartner = {
  id: string;
  name: string;
  tier: LabPartnerTier;
  cliaStatus: "verified" | "pending";
  statesServed: string[];
  cashPriceMenu: Array<{ testId: string; price: number }>;
  drawLocations: Array<{ id: string; name: string; state: string; zip: string; address: string }>;
  supportedTestIds: string[];
  orderWorkflow: string;
  requisitionProcess: string;
  resultDelivery: "api" | "sftp" | "portal" | "manual_pdf";
  turnaround: string;
  criticalResultPolicy: string;
  contact: {
    name: string;
    title: string;
    email: string;
  };
  strengths: string[];
};

export type LabNetworkStatus = "active_mock" | "contracting" | "candidate";

export type LabNetworkRoute = {
  id: string;
  name: string;
  partnerId: string;
  tier: LabPartnerTier;
  status: LabNetworkStatus;
  orderMode: LabOrderMode;
  collectionTypes: CollectionType[];
  statesServed: string[];
  restrictedStates: string[];
  priority: number;
  priceMultiplier: number;
  platformFee: number;
  drawFee: number;
  turnaround: string;
  supportNote: string;
};

export type LabLocationOption = {
  id: string;
  routeId: string;
  partnerId: string;
  name: string;
  address: string;
  state: string;
  zip: string;
  collectionType: CollectionType;
  distanceMiles: number;
  drawFee: number;
  appointmentRequired: boolean;
};

export type LabOrderQuote = {
  id: string;
  available: boolean;
  panelId: string;
  testIds: string[];
  state: string;
  zip: string;
  orderMode: LabOrderMode | "blocked";
  authorizationIncluded: boolean;
  collectionType: CollectionType;
  partnerId?: string;
  partnerName?: string;
  routeId?: string;
  networkName?: string;
  locationOptions: LabLocationOption[];
  selectedLocation?: LabLocationOption;
  subtotal: number;
  drawFee: number;
  total: number;
  estimatedSavings: number;
  turnaround: string;
  fastingNotes: string[];
  customerMessage: string;
  unavailableReason?: string;
};

export type LabOutreachTarget = {
  id: string;
  name: string;
  category: LabOutreachCategory;
  priority: 1 | 2 | 3 | 4 | 5;
  stage: LabOutreachStage;
  website: string;
  statesFocus: string[];
  relationshipType: string;
  whyTarget: string;
  ask: string;
  nextStep: string;
  evidenceNeeded: string[];
  sourceNote: string;
};

export type LabOutreachCadenceStep = {
  label: string;
  title: string;
  goal: string;
  actions: string[];
};

export type LabOutreachScript = {
  id: string;
  channel: "email" | "phone" | "form";
  title: string;
  subject?: string;
  body: string;
};

export type LabAccessRule = {
  state: string;
  mode: LabAccessMode;
  partnerIds: string[];
  note: string;
};

export type ClinicianAuthorization = {
  id: string;
  status: "approved" | "manual_review" | "blocked";
  reviewer: string;
  reason: string;
  authorizedAt: string;
  requiredFollowUp: string;
};

export type ConciergeTaskStatus = "scheduled" | "draw_completed" | "results_ready";

export type ConciergeTask = {
  id: string;
  status: ConciergeTaskStatus;
  label: string;
  owner: "concierge" | "lab" | "family";
  copy: string;
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
  | "clinician_review"
  | "authorized"
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
  partnerId: string;
  authorizationId: string;
  orderMode: LabOrderMode;
  locationId: string;
  labLocationName: string;
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
