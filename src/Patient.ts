export interface Patient {
  name?: string;
  mrn?: string;
  date_of_birth?: string;
  histology?: PatientHistology;
  pd_l1?: PatientPD_L1;
  sex?: PatientSex;
  id?: string;
  notes?: PatientNote[];
  results?: PatientInferenceResult[];
  status?: PatientStatus;
}

export enum PatientStatus {
  IMAGING_PENDING = "IMAGING_PENDING",
  IMAGING_RECEIVED = "IMAGING_RECEIVED",
  IMAGING_QC_FAIL = "IMAGING_QC_FAIL",
  IMAGING_QC_PASS = "IMAGING_QC_PASS",
  ANNOTATION_DONE = "ANNOTATION_DONE",
  PREDICTION_DONE = "PREDICTION_DONE",
}

export enum PatientSex {
  FEMALE = "FEMALE",
  MALE = "MALE",
  NON_BINARY = "NON_BINARY",
}

export enum PatientHistology {
  MIXED_OR_OTHER = "MIXED_OR_OTHER",
  ADENOCARCINOMA = "ADENOCARCINOMA",
  SQUAMOUS = "SQUAMOUS",
}

export interface PatientInferenceResult {
  result_generated_date?: string;
  patient_level_io_response?: number;
}

export interface PatientPD_L1 {
  test_complete?: boolean;
  tps?: number;
}

export interface PatientNote {
  date?: string;
  note?: string;
}
