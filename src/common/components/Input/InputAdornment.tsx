import { forwardRef } from 'react';
import { InputGroup } from 'react-bootstrap';
import classNames from 'classnames';

import '../../css/input_adornment.css';

import { CommonProps } from '../../types/OverridableComponent';

export interface IInputAdornmentProps extends CommonProps {
  position: 'end' | 'start';
  inline?: boolean;
  children: React.ReactNode;
}

const InputAdornment = forwardRef<HTMLDivElement, IInputAdornmentProps>(({
  position, inline, children,
  className, ...rest }: IInputAdornmentProps, ref) => (
    <InputGroup.Text
        {...rest}
        className = {classNames('input-adornment', className, {
          'input-adornment-start': position === 'start',
          'input-adornment-end':   position === 'end',
          'input-adornment-inline': Boolean(inline),
        })}
        ref = {ref}>
      {children}
    </InputGroup.Text>
));

export default InputAdornment;
