import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { Col, Row } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';

import { getRecipeImage, getRecipeImagePlaceholder } from '../../common/utility';
import WidthHeightRatio from '../../common/components/WidthHeightRatio';
import Image from '../../common/components/Image';
import ReFileSelect from '../../common/components/ReduxForm/ReFileSelect';
import FieldSpyValues from '../../common/components/ReduxForm/FieldSpyValues';

const RecipeFormImageRow: React.FC = () => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    photo_label: {
      id: 'recipe.create.photo_label',
      description: 'Photo label',
      defaultMessage: 'Photo',
    },
  });

  const { key } = useLocation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const photoInputRef = useRef<any>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const IMAGE_PLACEHOLDER = useMemo(() => getRecipeImagePlaceholder(), []);

  useEffect(() => {
    if (photoInputRef.current) {
      photoInputRef.current.clearValue();
    }
    setImageUrl(undefined);
  }, [key]);

  const handleImageChange = (_name: string, newValue: File | undefined) => {
    setImageUrl(newValue ? URL.createObjectURL(newValue) : '');
  };

  const getDisplayImage = (recipePhoto: string | undefined) => {
    if (imageUrl != null) {
      return imageUrl.length > 0 ? imageUrl : getRecipeImagePlaceholder();
    } else {
      return getRecipeImage(recipePhoto || IMAGE_PLACEHOLDER);
    }
  };

  return (
    <>
      <Row>
        <Col xs={12} lg={11} xl={10} xxl={9} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <WidthHeightRatio height={66.67} width={100}>
            <FieldSpyValues fieldNames={['photo']}>
              {values => (
                <Image
                    src   = {getDisplayImage(values.photo)}
                    alt   = ''
                    style = {{ objectFit: 'contain' }} />
              )}
            </FieldSpyValues>
          </WidthHeightRatio>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <ReFileSelect
              name     = 'photo'
              label    = {formatMessage(messages.photo_label)}
              accept   = 'image/*'
              onChange = {handleImageChange}
              ref = {photoInputRef} />
        </Col>
      </Row>
    </>
  );
};

export default RecipeFormImageRow;
