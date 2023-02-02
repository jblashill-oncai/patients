import React, { useCallback, useState } from 'react';
import { Patient, PatientHistology, PatientSex, PatientStatus } from "../Patient"
import Modal from 'react-modal';
import { TextField } from '../components/TextField';
import { NumberField } from '../components/NumberField';
import { Checkbox } from '../components/Checkbox';
import { Select } from '../components/Select';
import _ from 'lodash';

type TPatientModalProps = {
  onSubmit: (params: Patient) => Promise<void>;
  onClose: () => void;
  patient?: Patient;
}

export const PatientModal = (props: TPatientModalProps) => {
  const { onSubmit: propsOnSubmit, patient, onClose } = props;
  const [isSubmitting, setIsSubmitting] = useState<boolean>();

  const [data, setData] = useState<Patient>(patient || {});

  const onSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>((e) => {
    setIsSubmitting(true);
    e.preventDefault();

    if (!data.pd_l1?.test_complete && data.pd_l1?.tps != null) {
      data.pd_l1.tps = undefined;
    }

    propsOnSubmit(data).then(() => setIsSubmitting(false));
  }, [propsOnSubmit, data]);

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
    >
      <form onSubmit={onSubmit}>
        <TextField
          name='name'
          onChange={(v) => setData((d) => {
            d.name = v;
            return _.cloneDeep(d);
          })}
          value={data.name}
        />
        <TextField
          name='mrn'
          onChange={(v) => setData((d) => {
            d.mrn = v
            return _.cloneDeep(d);
          })}
          value={data.mrn}
        />
        <TextField
          name='date_of_birth'
          onChange={(v) => setData((d) => {
            d.date_of_birth = v;
            return _.cloneDeep(d);
          })}
          type='date'
          value={data.date_of_birth}
        />
        <Select<PatientHistology>
          name='histology'
          options={Object.values(PatientHistology).map((v) => ({ label: v, value: v }))}
          onChange={(v) => setData((d) => {
            d.histology = v;
            return _.cloneDeep(d);
          })}
          value={data.histology}
        />
        <div>
          <Checkbox
            name='pd_l1[test_complete]'
            onChange={(v) => setData((d) => {
              if (d.pd_l1 == null) d.pd_l1 = {};
              d.pd_l1.test_complete = v;
              return _.cloneDeep(d);
            })}
            value={data.pd_l1?.test_complete}
          />
          {
            data?.pd_l1?.test_complete && (
              <NumberField
                name='pd_l1[tps]'
                onChange={(v) => setData((d) => {
                  if (d.pd_l1 == null) d.pd_l1 = {};
                  d.pd_l1.tps = v;
                  return _.cloneDeep(d);
                })}
                value={data.pd_l1.tps}
              />
            )
          }
        </div>
        <Select<PatientSex>
          name='sex'
          options={Object.values(PatientSex).map((v) => ({ label: v, value: v }))}
          onChange={(v) => setData((d) => {
            d.sex = v;
            return _.cloneDeep(d);
          }) }
          value={data.sex}
        />
        {
          patient == null && (
            <TextField
              name='id'
              onChange={(v) => setData((d) => {
                d.id = v;
                return _.cloneDeep(d);
              })}
              value={data.id}
            />
          )
        }
        <Select<PatientStatus>
          name='status'
          options={Object.values(PatientStatus).map((v) => ({ label: v, value: v }))}
          onChange={(v) => setData((d) => {
            d.status = v;
            return _.cloneDeep(d);
          })}
          value={data.status}
        />
        <button disabled={isSubmitting} type='submit'>Submit</button>
      </form>
    </Modal>
  )
}