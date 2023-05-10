import { useCallback } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Button } from 'react-bootstrap';

import '../css/ratings.css';

import Icon from '../../common/components/Icon';
import ConditionalWrapper from '../../common/components/ConditionalWrapper';

const messages = defineMessages({
  star_alt: {
    id: 'rating_comments.star_alt',
    description: 'Alt text for star button, for screen reader.',
    defaultMessage: 'Select to rate item {stars, plural, one {# star} other {# stars}}',
  },
  stars_alt: {
    id: 'rating_comments.stars_alt',
    description: 'Alt text for read-only stars (view).',
    defaultMessage: '{stars} out of 5 stars',
  },
});

export interface IRatingsProps {
  stars: number;
  onChange?: (stars: number) => void;
}

interface IStarProps {
  stars: number;
  num:   number;
  onChange?: (stars: number) => void;
}

const Star: React.FC<IStarProps> = ({ stars, num, onChange }: IStarProps) => {
  const { formatMessage } = useIntl();

  const handleClick = useCallback(() => {
    onChange?.(num);
  }, [onChange, num]);

  const isHalfFilled = stars > (num - 1) && stars < num;
  const icon = isHalfFilled ? 'star-half' : 'star';
  const variant = num > stars || isHalfFilled ? 'light' : 'filled';

  return (
    <ConditionalWrapper
        condition = {onChange != null}
        render    = {childr => <Button variant='transparent' className='rating' onClick={handleClick}>{childr}</Button>}
        key={num}>
      <Icon key={num} icon={icon} variant={variant} size={onChange != null ? '2x' : '1x'} ariaLabel={onChange ? formatMessage(messages.star_alt, { stars: num }) : undefined} />
    </ConditionalWrapper>
  );
};

const Ratings: React.FC<IRatingsProps> = ({ stars, onChange }: IRatingsProps) => {
  const { formatMessage } = useIntl();

  let starss = stars;
  if (stars > 5) {
    starss = 5;
  } else if (stars < 0) {
    starss = 0;
  }

  const starsList: Array<React.ReactNode> = Array.from({ length: 5 }, (_, i) => i + 1).map(num => (
    <Star key={num} stars={starss} num={num} onChange={onChange} />
  ));

  return (
    <div className='rating-stars'>
      <span aria-hidden>{starsList}</span>
      <span className='sr-only'>{formatMessage(messages.stars_alt, { stars: starss })}</span>
    </div>
  );
};

export default Ratings;
