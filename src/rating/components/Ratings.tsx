import { Button } from 'react-bootstrap';

import '../css/ratings.css';

import Icon from '../../common/components/Icon';
import ConditionalWrapper from '../../common/components/ConditionalWrapper';
import { useCallback } from 'react';

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
  const handleClick = useCallback(() => {
    onChange?.(num);
  }, [onChange, num]);

  const isHalfFilled = stars > (num - 1) && stars < num;
  const icon = isHalfFilled ? 'star-half' : 'star';
  const variant = num > stars || isHalfFilled ? 'light' : 'filled';

  return (
    <ConditionalWrapper
        condition={onChange != null}
        render    = {childr => <Button variant='transparent' className='rating' onClick={handleClick}>{childr}</Button>}
        key={num}>
      <Icon key={num} icon={icon} variant={variant} size={onChange != null ? '2x' : '1x'} />
    </ConditionalWrapper>
  );
};

const Ratings: React.FC<IRatingsProps> = ({ stars, onChange }: IRatingsProps) => {
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
      {starsList}
    </div>
  );
};

export default Ratings;
