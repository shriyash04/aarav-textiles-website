export interface ProductSpec {
  id: string;
  title: string;
  categoryCode: string;
  description: string;
  applications: string;
  image: string;
  specs: {
    yarnCount: string;
    construction: string;
    weightGsm: string;
    widths: string;
    weaveType: string;
    finishOptions: string;
    moq: string;
    leadTime: string;
  };
  keyFeatures: string[];
  certifications: string[];
}

export interface QuoteFormData {
  fullName: string;
  workEmail: string;
  companyName: string;
  country: string;
  fabricCategory: string;
  estimatedVolume: string;
  specNotes: string;
}
