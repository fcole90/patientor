import React, { useState } from 'react';
import axios from 'axios';
import { Container, List, Card, Button } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';

import GenderIcon from '../components/GenderIcon';
import EntryDetails from '../components/EntryDetails';
import DiagnosesList from '../components/DiagnosesList';
import { useStateValue, updatePatient } from '../state';
import { apiBaseUrl } from '../constants';
import { Diagnosis, Patient } from '../types';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

const PatientDetailPage: React.FC = () => {
  const { id: patientIdMatch } = useParams<{ id: string }>();
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const patient = patients[patientIdMatch];

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (data: EntryFormValues) => {
    console.log('submitNewEntry:', data);
    
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${patient.id}/entries`, data);
      dispatch(updatePatient(updatedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  if (!patient) {
    return (
      <Container>
        <h1>No patient found with such ID</h1>
        <pre>Submitted ID: {patientIdMatch}</pre>
      </Container>
    );
  }
  return (
    <div className="App">
      <Container>
        <h1>{patient.name}<GenderIcon gender={patient.gender} /></h1>
        <List>
          <List.Item>ssn: {patient.ssn}</List.Item>
          <List.Item>occupation: {patient.occupation}</List.Item>
        </List>

        {
          patient.entries.length === 0
          ? <h2>No entries</h2>
          : <div>
            <h2>Entries:</h2>
            <Card.Group>
              {patient.entries.map(entry =>
                <EntryDetails key={entry.id} entry={entry}>
                  {
                  entry.diagnosisCodes 
                  ? <DiagnosesList diagnoses={entry.diagnosisCodes.map((code): Diagnosis =>
                      diagnoses[code] ?? {code, name: "Unknown"}
                    )} />
                  : <p>No diagnosis code available for this entry</p>
                  }
                </EntryDetails>
              )}
            </Card.Group>
          </div>
        }
      </Container>

      <AddEntryModal
        
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button style={{marginTop: 1 + 'em'}} onClick={openModal}>Add New Entry</Button>
    </div>
  );
};

export default PatientDetailPage;
