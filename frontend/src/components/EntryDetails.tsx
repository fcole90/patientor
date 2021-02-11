import React, { ReactNode } from 'react';
import { Card, Icon, SemanticICONS } from 'semantic-ui-react';

import { Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from '../types';
import { assertNever } from '../utils';

interface BaseEntryDetails {
  entry: Entry;
  icon: SemanticICONS;
  extras?: ReactNode;
  headers?: ReactNode;
}

const BaseEntryDetals: React.FC<BaseEntryDetails> = ({entry, icon, children, extras, headers}) => (
  <Card fluid>
    <Card.Content>
      <Card.Header>{entry.date}<Icon name={icon} size='large'/>{headers}</Card.Header>
      <Card.Description>
        <em>{entry.description}</em>
      </Card.Description>
      { children }
    </Card.Content>
    <Card.Content extra>
      { extras }
    </Card.Content>
  </Card>
);

const HealthCheckDetails:  React.FC<{entry: HealthCheckEntry }> = ({entry, children}) => (
  <BaseEntryDetals entry={entry} icon="doctor" extras={children}>
    <Icon name='heart' color={
      entry.healthCheckRating === 0 ? 'green'
      : entry.healthCheckRating === 1 ? 'yellow'
      : entry.healthCheckRating === 2 ? 'orange'
      : 'red'
    }/>
  </BaseEntryDetals>
);

const OccupationalHealthcareDetails:  React.FC<{entry: OccupationalHealthcareEntry }> = ({entry, children}) => (
  <BaseEntryDetals entry={entry} icon="stethoscope" extras={children} headers={<>{entry.employerName}</>}>
    { entry.sickLeave && 
      <>
        <h4>Sick leave:</h4>
        <ul>
          <li><strong>From:</strong> {entry.sickLeave.startDate}</li>
          <li><strong>To:</strong> {entry.sickLeave.endDate}</li>
        </ul>
      </>
      
    }
  </BaseEntryDetals>
);

const HospitalDetails:  React.FC<{entry: HospitalEntry }> = ({entry, children}) => (
  <BaseEntryDetals entry={entry} icon="hospital symbol" extras={children}>
    <ul>
      <li><strong>Discharged on:</strong> {entry.discharge.date}</li>
      <li><strong>Criteria:</strong> {entry.discharge.criteria}</li>
    </ul>
  </BaseEntryDetals>
);


const EntryDetails: React.FC<{entry: Entry}> = ({entry, children}) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckDetails entry={entry}>{children}</HealthCheckDetails>;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareDetails entry={entry}>{children}</OccupationalHealthcareDetails>;
    case 'Hospital':
      return <HospitalDetails entry={entry}>{children}</HospitalDetails>;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;