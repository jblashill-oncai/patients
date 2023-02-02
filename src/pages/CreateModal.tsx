import React, { useCallback, useState } from 'react';
import { Patient, PatientHistology, PatientSex, PatientStatus } from "../Patient"
import Modal from 'react-modal';
import { TextField } from '../components/TextField';
import { NumberField } from '../components/NumberField';
import { Checkbox } from '../components/Checkbox';
import { Select } from '../components/Select';

type TCreatePatientModalProps = {
  addPatient: (params: Patient) => void;
  onClose: () => void;
}

export const CreatePatientModal = (props: TCreatePatientModalProps) => {
  const { addPatient, onClose } = props;

  const [data, setData] = useState<Patient>({});

  const onSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();
    addPatient(data);
  }, []);

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
    >
      <form onSubmit={onSubmit}>
        <TextField name='name' onChange={(v) => setData((d) => {
          d.name = v;
          return d;
        })} />
        <TextField name='mrn' onChange={(v) => setData((d) => {
          d.mrn = v
          return d;
        })} />
        <TextField name='date_of_birth' onChange={(v) => setData((d) => {
          d.date_of_birth = v;
          return d;
        })} type='date' />
        <TextField name='name' onChange={(v) => setData((d) => {
          d.name = v;
          return d;
        })} />
        <Select<PatientHistology>
          name='histology'
          options={Object.values(PatientHistology).map((v) => ({ label: v, value: v }))}
          onChange={(v) => setData((d) => {
            d.histology = v;
            return d;
          }) }
        />
        <div>
          <Checkbox name='pd_l1[test_complete]' onChange={(v) => setData((d) => {
            if (d.pd_l1 == null) d.pd_l1 = {};
            d.pd_l1.test_complete = v;
            return d;
          })} />
          {
            data?.pd_l1?.test_complete && (
              <NumberField
                name='pd_l1[tps]'
                onChange={(v) => setData((d) => {
                  if (d.pd_l1 == null) d.pd_l1 = {};
                  d.pd_l1.tps = v;
                  return d;
                })}
              />
            )
          }
        </div>
        <Select<PatientSex>
          name='sex'
          options={Object.values(PatientSex).map((v) => ({ label: v, value: v }))}
          onChange={(v) => setData((d) => {
            d.sex = v;
            return d;
          }) }
        />
        <TextField name='id' onChange={(v) => setData((d) => {
          d.id = v;
          return d;
        })} />
        <Select<PatientStatus>
          name='status'
          options={Object.values(PatientStatus).map((v) => ({ label: v, value: v }))}
          onChange={(v) => setData((d) => {
            d.status = v;
            return d;
          }) }
        />
        <button type='submit'>Submit</button>
      </form>
    </Modal>
  )
}