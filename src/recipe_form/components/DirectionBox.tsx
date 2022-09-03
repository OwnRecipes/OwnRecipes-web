import React, { useEffect, useState } from 'react';
import { FormSpy } from 'react-final-form';
import { defineMessages, useIntl } from 'react-intl';
import { useLocation } from 'react-router';
import FieldSpyValues from '../../common/components/ReduxForm/FieldSpyValues';
import ReInput from '../../common/components/ReduxForm/ReInput';
import { formatValidation } from '../../common/store/Validation';

import Directions from '../../recipe/components/Directions';
import TabbedView from './TabbedView';

export interface IDirectionBox {
  name:       string;
}

const DirectionBox: React.FC<IDirectionBox> = ({
    name }: IDirectionBox) => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const messages = defineMessages({
    directions_label: {
      id: 'recipe.create.directions_label',
      description: 'Directions label',
      defaultMessage: 'Directions',
    },
    directions_tooltip: {
      id: 'recipe.create.dir.tooltip',
      description: 'Directions Tooltip',
      defaultMessage: 'Each Direction should be on its own line. You can form chapters by ending the chapters heading with a colon (":").',
    },
    directions_placeholder: {
      id: 'recipe.create.dir.placeholder',
      description: 'Directions Placeholder',
      defaultMessage: 'Dough:\nPrepare the dough.\n\nDip:\nPrepare the dip.\n...',
    },
  });

  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>('0');

  useEffect(() => {
    if (location.pathname.endsWith('/create')) {
      setActiveTab('0');
    }
  }, [location.pathname]);

  return (
    <FormSpy subscription={{ errors: true }}>
      {({ errors }) => (
        <TabbedView
            id        = 'directions'
            labels    = {[formatMessage(messages.directions_label)]}

            activeTab = {activeTab}
            onSelect  = {setActiveTab}

            errors    = {formatValidation(intl, errors?.[name])}
            tooltips  = {[formatMessage(messages.directions_tooltip)]}>
          <ReInput
              name = {name}
              rows     = {8}
              placeholder = {formatMessage(messages.directions_placeholder)} />
          <FieldSpyValues fieldNames={[name]}>
            {values => (
              <>
                {activeTab === 'preview' && <DirectionsPreview directions={values[name] ?? ''} />}
              </>
            )}
          </FieldSpyValues>
        </TabbedView>
      )}
    </FormSpy>
  );
};

interface IDirectionsPreviewProps {
  directions: string;
}

const DirectionsPreview: React.FC<IDirectionsPreviewProps> = ({ directions }: IDirectionsPreviewProps) => (
  <div className='recipe-details'>
    <div className='recipe-schema'>
      <Directions data={directions} />
    </div>
  </div>
);

export default DirectionBox;
