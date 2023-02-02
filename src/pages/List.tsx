import React, { useCallback } from 'react';
import { patientService } from "../ApiService";
import { Patient } from "../Patient";
import { useEffect, useState } from "react";
import { create } from 'lodash';
import { CreatePatientModal } from './CreateModal';

type TPatientListItemProps = {
  patient: Patient;
};

export const PatientListItem = (props: TPatientListItemProps) => {
  const { patient } = props;

  return <li>{patient.id} - {patient.name}</li>;
}

export const List = () => {
  const [patients, setPatients] = useState<Patient[]>();
  const [error, setError] = useState<any>();

  const [addLoading, setAddLoading] = useState<boolean>();

  const [createModalPageOpen, setCreateModalPageOpen] = useState<boolean>(false);

  useEffect(() => {
    setError(undefined);
    patientService.find()
      .then((data) => setPatients(data))
      .catch((error) => setError(error));
  }, []);

  const addPatient = useCallback((params: Patient) => {
    setAddLoading(true);
    patientService.create(params)
      // .then((newPatient) => setPatients((currentPatients) => [...(currentPatients || []), newPatient]))
      .catch((error) => setError(error))
      .then(() => setAddLoading(false));
  }, []);

  if (patients == null && !error) {
    return (<p>Loading...</p>)
  }

  if (error != null) {
    return (<p>Error: {error?.message}</p>)
  }

  return (
    <div>
      {
        createModalPageOpen && (
          <CreatePatientModal
            addPatient={addPatient}
            onClose={() => setCreateModalPageOpen(false)}
          />
        )
      }
      <button onClick={() => setCreateModalPageOpen(true)}>Create Patient</button>
      <ul>
        {
          patients?.map((patient) => {
            return <PatientListItem key={patient.id} patient={patient} />;
          })
        }
      </ul>
    </div>
  )
};