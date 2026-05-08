export type JunctionSandboxTestKind = "panel" | "biomarker";

export type JunctionSandboxTest = {
  id: string;
  name: string;
  kind: JunctionSandboxTestKind;
  observedLab?: string;
  markerId: string;
  commonTurnaround: string;
  worstCaseTurnaround: string;
  notes: string;
};

export const junctionSandboxTestsFromScreenshots: JunctionSandboxTest[] = [
  {
    id: "7325",
    name: "Estradiol Total, LH, Progesterone",
    kind: "panel",
    observedLab: "Sonora Quest",
    markerId: "27596",
    commonTurnaround: "N/A",
    worstCaseTurnaround: "N/A",
    notes: "Provider ID overlaps with an estradiol-sensitive biomarker row in the screenshots; confirm lab/provider before production use.",
  },
  {
    id: "803570",
    name: "CMP, Lipid, HsCRP, TSH",
    kind: "panel",
    observedLab: "Sonora Quest",
    markerId: "26836",
    commonTurnaround: "N/A",
    worstCaseTurnaround: "N/A",
    notes: "Useful for Heart and Metabolic sandbox testing; includes TSH in addition to the heart/metabolic markers.",
  },
  {
    id: "801762",
    name: "ATG, FT3, FT4, T3, T4, T4A, TSH",
    kind: "panel",
    observedLab: "Sonora Quest",
    markerId: "25958",
    commonTurnaround: "N/A",
    worstCaseTurnaround: "N/A",
    notes: "Best available sandbox match for Thyroid Expanded.",
  },
  {
    id: "804466",
    name: "CBC, CMP, DHEAS, SHBG, FT3, FT4, TESTO F/T, TSH, VITD 25OH",
    kind: "panel",
    observedLab: "Sonora Quest",
    markerId: "25843",
    commonTurnaround: "N/A",
    worstCaseTurnaround: "N/A",
    notes: "Best available sandbox match for Hormone Baseline core markers; estradiol still needs a separate row.",
  },
  {
    id: "804106",
    name: "A1C, CBC, CMP, LIPID, TSH, URGM, VIT D 25OH",
    kind: "panel",
    observedLab: "Sonora Quest",
    markerId: "25839",
    commonTurnaround: "N/A",
    worstCaseTurnaround: "N/A",
    notes: "Best available sandbox match for Essential Wellness; includes urinalysis/urine microscopy and vitamin D beyond the app panel.",
  },
  {
    id: "004598",
    name: "Ferritin",
    kind: "biomarker",
    observedLab: "Labcorp",
    markerId: "1313",
    commonTurnaround: "4 days",
    worstCaseTurnaround: "5 days",
    notes: "Good individual sandbox match for ferritin.",
  },
  {
    id: "804513",
    name: "B12, CMP, Copp, FE, FOL, MG, Selen, VitA, VitB1, VitC, VitD, VitE, Zinc",
    kind: "panel",
    observedLab: "Sonora Quest",
    markerId: "29975",
    commonTurnaround: "N/A",
    worstCaseTurnaround: "N/A",
    notes: "Best available sandbox match for B12/folate and nutrient markers; includes extra minerals/vitamins.",
  },
  {
    id: "7116",
    name: "Hemoglobin A1c",
    kind: "biomarker",
    observedLab: "IHD",
    markerId: "13480",
    commonTurnaround: "N/A",
    worstCaseTurnaround: "N/A",
    notes: "Good individual sandbox match for A1c.",
  },
  {
    id: "7325",
    name: "Estradiol (E2), Sensitive",
    kind: "biomarker",
    observedLab: "IHD",
    markerId: "13478",
    commonTurnaround: "N/A",
    worstCaseTurnaround: "N/A",
    notes: "Good individual sandbox match for estradiol if Junction resolves this provider ID to the IHD biomarker row.",
  },
];

export const junctionScreenshotSandboxLabTestMap = {
  "essential-wellness": ["804106"],
  "complete-wellness": ["804106", "803570", "804513", "004598"],
  "energy-check": ["804106", "801762", "804513", "004598"],
  "heart-metabolic": ["803570", "7116"],
  "hormone-baseline": ["804466", "7325"],
  a1c: "7116",
  ferritin: "004598",
  estradiol: "7325",
  "thyroid-full": "801762",
} as const;

export const junctionScreenshotSandboxEnvValue = JSON.stringify(junctionScreenshotSandboxLabTestMap);

export const junctionSandboxMappingWarnings = [
  "Sandbox only; do not use as production pricing, coverage, or medical menu truth.",
  "Several IDs are bundled panels that include extra markers and duplicate overlap.",
  "Provider ID 7325 appeared in screenshots for both an estradiol panel and an estradiol-sensitive biomarker; confirm the exact lab/provider row before production.",
  "Production launch still needs Junction's production menu export, prices, state availability, requisition behavior, and result payload confirmation.",
];
