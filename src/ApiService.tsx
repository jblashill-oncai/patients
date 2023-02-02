import { faker } from "@faker-js/faker";
import { assign, times } from "lodash";
import {
  Patient,
  PatientHistology,
  PatientSex,
  PatientStatus,
} from "./Patient";

export class PatientService {
  private patients: Patient[];

  constructor(numberOfPatients: number) {
    if (!localStorage["patients"]) {
      this.patients = times(numberOfPatients).map(fakePatient);
      this.persist();
    }

    this.patients = JSON.parse(localStorage["patients"]);
  }

  private persist() {
    localStorage["patients"] = JSON.stringify(this.patients);
  }

  async find(query?: { offset: number; limit: number }) {
    await latency();
    if (query) {
      return this.patients.slice(query.offset, query.offset + query.limit);
    }

    return this.patients;
  }

  async getById(id: string): Promise<Patient> {
    await latency();
    console.log(`GET /patients/${id}`);
    const patient = this.patients.find((patient) => patient.id === id);
    if (!patient) {
      throw new Error("Patient not found");
    }

    return patient;
  }

  async create(patient: Patient) {
    await latency();
    console.log("POST /patients");
    console.log(JSON.stringify(patient, " " as any, 2));
    this.patients.push(patient);
    this.persist();
    return patient;
  }

  async update(id: string, attributes: Partial<Omit<Patient, "id">>) {
    await latency();
    const patient = await this.getById(id);
    assign(patient, attributes);
    this.persist();
    return patient;
  }

  async delete(id: string) {
    await latency();
    console.log(`GET /DELETE/${id}`);
    this.patients = this.patients.filter((patient) => patient.id !== id);
    this.persist();
  }
}

// introduce random latency
const latency = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 300 + Math.random() * 1000);
  });
};

const fakePatient = (): Patient => {
  return {
    name: faker.name.fullName(),
    mrn: faker.datatype.string(),
    date_of_birth: faker.date.birthdate().toISOString(),
    histology: faker.helpers.arrayElement(Object.values(PatientHistology)),
    pd_l1:
      Math.random() > 0.5
        ? { test_complete: false }
        : { test_complete: true, tps: Math.random() },
    sex: faker.helpers.arrayElement(Object.values(PatientSex)),
    id: faker.datatype.string(),
    notes: [],
    results:
      Math.random() > 0.5
        ? []
        : [
            {
              result_generated_date: faker.date.past(5).toISOString(),
              patient_level_io_response: Math.random(),
            },
          ],
    status: faker.helpers.arrayElement(Object.values(PatientStatus)),
  };
};

export const patientService = new PatientService(10);
