import React, { useCallback } from 'react';
import { patientService } from "../ApiService";
import { Patient } from "../Patient";
import { useEffect, useState } from "react";
import { PatientModal } from './PatientModal';
import _ from 'lodash';

type TPatientListItemProps = {
  patient: Patient;
  onUpdateClick?: (patient: Patient) => void;
  onDeleteClick?: (patient: Patient) => void;
};

export const PatientListItem = (props: TPatientListItemProps) => {
  const { patient, onUpdateClick: propsOnUpdateClick, onDeleteClick: propsOnDeleteClick } = props;

  const onUpdateClick = useCallback(() => {
    if (propsOnUpdateClick) propsOnUpdateClick(patient);
  }, [patient, propsOnUpdateClick]);
  
  const onDeleteClick = useCallback(() => {
    if (propsOnDeleteClick) propsOnDeleteClick(patient);
  }, [propsOnDeleteClick]);

  return <li className='patientListItem'><p>{patient.id} - {patient.name}</p><button onClick={onUpdateClick}>Update Patient</button><button onClick={onDeleteClick}>Delete Patient</button></li>;
}

export const List = () => {
  const [patients, setPatients] = useState<Patient[]>();
  const [error, setError] = useState<any>();

  const [addLoading, setAddLoading] = useState<boolean>();
  const [updateLoading, setUpdateLoading] = useState<boolean>();

  const [patientBeingEdited, setPatientBeingEdited] = useState<Patient>();
  const [patientFormOpen, setPatientFormOpen] = useState<boolean>(false);

  useEffect(() => {
    setError(undefined);
    patientService.find()
      .then((data) => setPatients(data))
      .catch((error) => setError(error));
  }, []);

  const addPatient = useCallback((params: Patient) => {
    setAddLoading(true);
    return patientService.create(params)
      .then(() => setPatients((currentPatients) => [...(currentPatients || [])]))
      .catch((error) => setError(error))
      .then(() => setAddLoading(false));
  }, []);

  const updatePatient = useCallback((params: Patient) => {
    if (params.id) {
      setUpdateLoading(true);
      return patientService.update(params.id, _.omit(params, 'id'))
        .then(() => setPatients((patients) => {
          if (patients) {
            const ind = patients?.findIndex((p) => p.id === params.id);
            patients[ind] = params;
          }
          return _.cloneDeep(patients);
        }))
        .catch((error) => setError(error))
        .then(() => setAddLoading(false));
    }
  }, []);

  const onUpdateClick = useCallback((patient: Patient) => {
    setPatientBeingEdited(patient);
    setPatientFormOpen(true);
  }, []);

  const onCreateClick = useCallback(() => {
    setPatientBeingEdited(undefined);
    setPatientFormOpen(true);
  }, []);

  const onDeleteClick = useCallback((patient: Patient) => {
    if (patient.id) {
      patientService.delete(patient.id).then(() => {
        setPatients((patients) => {
          if (patients) {
            const ind = patients.findIndex((p) => p.id === patient.id);
            patients.splice(ind, 1);
          }

          return _.cloneDeep(patients);
        })
      })
    }
  }, []);

  const onSubmit = useCallback(async (data: Patient) => {
    if (patientBeingEdited != null) {
      await updatePatient(data);
    } else {
      await addPatient(data);
    }

    setPatientFormOpen(false);
  }, [patientBeingEdited, addPatient, updatePatient]);

  if (patients == null && !error) {
    return (<p>Loading...</p>)
  }

  if (error != null) {
    return (<p>Error: {error?.message}</p>)
  }

  return (
    <div>
      {
        patientFormOpen && (
          <PatientModal
            onSubmit={onSubmit}
            onClose={() => {
              setPatientFormOpen(false)
              setPatientBeingEdited(undefined);
            }}
            patient={patientBeingEdited}
          />
        )
      }
      <button onClick={onCreateClick}>Create Patient</button>
      <ul>
        {
          patients?.map((patient) => {
            return <PatientListItem key={patient.id} patient={patient} onUpdateClick={onUpdateClick} onDeleteClick={onDeleteClick} />;
          })
        }
      </ul>
    </div>
  )
};