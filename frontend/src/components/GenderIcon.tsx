import React from 'react';
import { Icon } from 'semantic-ui-react';

import { Gender } from '../types';

interface GenderIconProps {
  gender: Gender;
}

const GenderIcon: React.FC<GenderIconProps> =  ({gender}) => {
  switch (gender) {
  case 'male':
    return <Icon name="mars"/>;
  case 'female':
    return <Icon name="venus"/>;
  case 'transmale':
  case 'transfemale':
    return <Icon name="transgender alternate"/>;
  case 'genderqueer':
    return <Icon name="mercury"/>;
  default:
    return <Icon name="genderless"/>;
  }
};

export default GenderIcon;