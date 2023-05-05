import { createRef, forwardRef } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import classNames from 'classnames';
import { defineMessages, useIntl } from 'react-intl';

import '../../css/input.css';

import { isNumber } from '../../utility';
import DebounceInput from './DebounceInput';
import Tooltip from '../Tooltip';
import ConditionalWrapper from '../ConditionalWrapper';
import BaseInputComponent, { IBaseInputComponentProps } from './BaseInputComponent';
import { CommonProps } from '../../types/OverridableComponent';
import Icon from '../Icon';
import InputAdornment from './InputAdornment';

export const IS_SAVED_PASSWORD = '~$$~PASSWORD~$$~';

export interface IInputProps extends IBaseInputComponentProps {
  placeholder?:  string;

  inputAdornmentStart?: React.ReactNode;
  inputAdornmentEnd?:   React.ReactNode;

  debounceTimeout?: number;
  saveValue?: string;

  onChange?: (name: string, newValue: string) => void;
}

export type ITextInputProps = {
  type?:  'text' | 'password';
  rows?:  number;
  maxLength?: number;

  value?: string;

  onChange?: (name: string, newValue: string) => void;
} & IBaseInputComponentProps & IInputProps;

export type INumberInputProps = {
  type?:  'number';

  value?: string | number;
  min?:   number;
  max?:   number;

  onChange?: (name: string, newValue: number) => void;
} & IBaseInputComponentProps & IInputProps;

export type IAnyInputProps = ITextInputProps | INumberInputProps;
export const isTextInput   = (inp: IAnyInputProps): inp is ITextInputProps => (inp as ITextInputProps).type == null || (inp as ITextInputProps).type === 'text' || (inp as ITextInputProps).type === 'password';
export const isNumberInput = (inp: IAnyInputProps): inp is INumberInputProps => (inp as INumberInputProps).type === 'number';

interface IInputState {
  hasFocus: boolean;
  showCapsWarning: boolean;
  showPassword: boolean;
}

export default class Input extends BaseInputComponent<IAnyInputProps, IInputState> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private ref = createRef<any>();

  constructor(props: IAnyInputProps) {
    super(props);
    this.state = {
      hasFocus: false,
      showCapsWarning: false,
      showPassword: false,
    };
  }

  focus(): boolean { // eslint-disable-line react/no-unused-class-component-methods
    if (this.ref != null && this.ref.current) {
      this.ref.current.focus();
      return true;
    }
    return false;
  }

  formatValue(value: string, trim = false): string | number {
    const type = this.props.type ?? 'text';
    let valueTrimmed = value.trim();

    if (type === 'number') {
      if (valueTrimmed.length === 0) {
        return valueTrimmed;
      } else {
        valueTrimmed = valueTrimmed.replaceAll(',', '.');
        const inpIsNumber = isNumber(valueTrimmed);
        if (!inpIsNumber) {
          return valueTrimmed;
        } else {
          const numberProps: INumberInputProps = this.props as INumberInputProps;
          let valNum = parseFloat(value);
          const min = numberProps.min ?? -2147483647;
          const max = numberProps.max ??  2147483647;
          if (valNum < min) {
            valNum = min;
          } else if (valNum > max) {
            valNum = max;
          }
          return valNum;
        }
      }
    } else {
      return trim ? valueTrimmed : value;
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.readOnly || this.props.disabled) return;

    const value = this.formatValue(event.target.value);

    const { name, onChange } = this.props;
    if (onChange) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange(name, value as any);
    }
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.defaultPrevented) return;
    this.props.onKeyDown?.(event);
    if (event.ctrlKey || event.shiftKey) return;

    const value = this.formatValue((event.target as HTMLInputElement).value, true);
    const type  = this.props.type ?? 'text';
    const rows  = (this.props as ITextInputProps).rows ?? 1;
    const isTextArea = type === 'text' && rows > 1;

    if (type === 'number') {
      const numberProps: INumberInputProps = this.props as INumberInputProps;
      const min = numberProps.min ?? -2147483647;
      const max = numberProps.max ??  2147483647;

      let newVal: number | undefined;

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (value == null || value === '') {
          newVal = (min != null ? min : Math.min(1, max ?? 1));
        } else if (typeof value === 'number' && value < max) {
          newVal = value + 1;
        }
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (value == null || value === '') {
          newVal = (max != null ? max : Math.min(1, min ?? 1));
        } else if (typeof value === 'number' && value > min) {
          newVal = value - 1;
        }
      }

      if (this.props.onChange && newVal != null && newVal !== value) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.props.onChange(this.props.name, newVal as any);
      }
    }

    if (this.props.onChange && event.key === 'Enter' && !isTextArea) {
      const valueS = this.formatValue(String(value), true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.props.onChange(this.props.name, valueS as any);
    }
  };

  doHandleBlurInput = (event: React.FocusEvent<HTMLInputElement>) => {
    this.setState({
      hasFocus: false,
      showPassword: false,
    });
    this.props.onBlur?.(event);
  };

  handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!this.props.onChange || this.props.readOnly || this.props.disabled) return;
    const value = this.formatValue(event.target.value, true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.props.onChange(this.props.name, value as any);

    const { relatedTarget } = event;
    const endAdornmentId = `${this.props.name}-endadornment`;
    if (relatedTarget instanceof Element && relatedTarget?.id === endAdornmentId) {
      return;
    }

    this.doHandleBlurInput(event);
  };

  handleBlurAdornment = (event: React.FocusEvent<HTMLButtonElement>) => {
    const { relatedTarget } = event;
    if (relatedTarget instanceof Element && relatedTarget?.id === this.props.name) {
      return;
    }

    this.doHandleBlurInput(event as React.FocusEvent<HTMLInputElement>);
  };

  updateShowCapsWarning = (isCaps: boolean) => {
    if (isCaps && !this.state.showCapsWarning) {
      this.setState({
        showCapsWarning: true,
      });
    } else if (!isCaps && this.state.showCapsWarning) {
      this.setState({
        showCapsWarning: false,
      });
    }
  };

  handleClick = (event: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement | HTMLDivElement>) => {
    this.updateShowCapsWarning(event.getModifierState('CapsLock'));
    if (this.props.type === 'password' && this.props.value != null && String(this.props.value) === IS_SAVED_PASSWORD) {
      setTimeout(() => {
        // TODO
        // combinedRef.current?.select();
      }, 0);
    }
  };

  handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    this.updateShowCapsWarning(event.getModifierState('CapsLock'));
  };

  handleFocus = () => {
    this.setState({
      hasFocus: true,
    });
    if (this.props.type === 'password' && this.props.value != null && String(this.props.value) === IS_SAVED_PASSWORD) {
      // TODO
      // combinedRef.current?.select();
    }
  };

  handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.defaultPrevented || event.ctrlKey || event.shiftKey) return;

    if (this.props.type === 'password') {
      if (this.props.value != null && String(this.props.value) === IS_SAVED_PASSWORD
        && (event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'ArrowDown')) {
          event.preventDefault();
        }
    }
  };

  handleToggleShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  render() {
    // console.log(`[Input] name=${this.props.name}`);

    const { inputAdornmentStart, inputAdornmentEnd, debounceTimeout, value, saveValue, onChange, // eslint-disable-line @typescript-eslint/no-unused-vars
        type = 'text',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        rows, maxLength,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        min, max,
        name, style, tooltip,
        label, className, helpText, errors, meta, ...rest } = this.props; // eslint-disable-line @typescript-eslint/no-unused-vars

    const isDebounce = type === 'text' && debounceTimeout != null && debounceTimeout > 0;

    const currentLength = (value?.toString() ?? '').length;

    const showPasswordReveal = type === 'password' && value != null && String(value).length > 0 && String(value) !== IS_SAVED_PASSWORD;
    let endAdornmentJsx: React.ReactElement | undefined;
    if (showPasswordReveal) {
      endAdornmentJsx = <InputPasswordRevealAdornment showPassword={this.state.showPassword} onClick={this.handleToggleShowPassword} onBlur={this.handleBlurAdornment} />;
    }

    if (inputAdornmentEnd) {
      endAdornmentJsx = (
        <>
          {endAdornmentJsx}
          {inputAdornmentEnd}
        </>
      );
    }

    return (
      <Form.Group
          {...this.getGroupProps()}
          controlId = {name}
          className = {this.getFormGroupClassNames()}
          style     = {style}>
        <ConditionalWrapper
            condition = {tooltip != null}
            render    = {childr => <Tooltip id={`${name}-tooltip`} tooltip={tooltip}>{childr}</Tooltip>}>
          {this.getLabel()}
          {this.getHelpText()}
          {this.getErrorMessage()}
          <InputGroup>
            {inputAdornmentStart && <InputGroup.Text className='input-adornment-start'>{inputAdornmentStart}</InputGroup.Text>}
            {isDebounce && (
              <DebounceInput
                  minLength = {2}
                  debounceTimeout = {debounceTimeout}

                  name  = {name}
                  element = {isTextInput(this.props) && type === 'text' && rows != null ? 'textarea' : undefined}
                  value = {value ?? ''}
                  rows  = {isTextInput(this.props) && type === 'text' ? rows : undefined}
                  min   = {isNumberInput(this.props) ? min : undefined}
                  max   = {isNumberInput(this.props) ? max : undefined}

                  {...rest}

                  onBlur    = {this.handleBlur}
                  onChange  = {this.handleChange}
                  onClick   = {this.handleClick}
                  onKeyDown = {this.handleKeyDown}
                  onKeyUp   = {this.handleKeyUp}

                  className = {classNames('form-control', {
                    'adorned-start': inputAdornmentStart != null,
                    'adorned-end':   inputAdornmentEnd != null,
                  })}
                  ref = {this.ref} />
            )}
            {!isDebounce && (
              <Form.Control
                  name  = {name}
                  type  = {type === 'number' || this.state.showPassword ? 'text' : type}
                  as    = {isTextInput(this.props) && type === 'text' && rows != null ? 'textarea' : undefined}
                  value = {value ?? ''}
                  rows  = {isTextInput(this.props) && type === 'text' ? rows : undefined}

                  {...rest}

                  className = {classNames({
                    'adorned-start': inputAdornmentStart != null,
                    'adorned-end':   endAdornmentJsx != null,
                    'with-password-reveal': showPasswordReveal,
                  })}

                  onBlur    = {this.handleBlur}
                  onChange  = {this.handleChange}
                  onClick   = {this.handleClick}
                  onKeyDown = {this.handleKeyDown}
                  onKeyUp   = {this.handleKeyUp}

                  ref = {this.ref} />
              )}
            {endAdornmentJsx}
          </InputGroup>
          {type === 'password' && this.state.showCapsWarning && (
            <InputCapslockWarning />
          )}
          {isTextInput(this.props) && maxLength && (
            <InputLengthWarning length={currentLength} maxLength={maxLength} />
          )}
        </ConditionalWrapper>
      </Form.Group>
    );
  }
}

interface IInputPasswordRevealAdornment extends CommonProps {
  showPassword: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onBlur:  (event: React.FocusEvent<HTMLButtonElement>) => void;
}

const messages = defineMessages({
  hidePassword: {
    id: 'input.hide_password',
    description: 'Button label to mask the password.',
    defaultMessage: 'Hide the password',
  },
  revealPassword: {
    id: 'input.reveal_password',
    description: 'Button label to reveal the password.',
    defaultMessage: 'Reveal the password',
  },
  capslockWarning: {
    id: 'input.capslock_warning',
    description: 'Warning when password input has focus and capslock is active.',
    defaultMessage: 'Capslock is active.',
  },
  lengthWarning: {
    id: 'input.length_warning',
    description: 'Warning when text input with maxLength has only few remaining characters.',
    defaultMessage: '{amount, plural, one {# character} other {# characters}} remaining.',
  },
  lengthExceeded: {
    id: 'input.length_exceeded',
    description: 'Error when text input with maxLength has too many characters.',
    defaultMessage: 'Exceeded the character limit by {amount}.',
  },
});

const InputPasswordRevealAdornment = forwardRef<HTMLDivElement, IInputPasswordRevealAdornment>(({
    showPassword, onClick, onBlur,
    className, ...rest }: IInputPasswordRevealAdornment, ref) => {
  const { formatMessage } = useIntl();

  return (
    <InputAdornment position='end' inline {...rest} className={classNames('inline-adornment', className)} ref={ref}>
      <Button
          variant = 'text'
          onClick = {onClick}
          onBlur  = {onBlur}
          aria-label = {showPassword ? formatMessage(messages.hidePassword) : formatMessage(messages.revealPassword)}>
        <Icon icon={showPassword ? 'eye-slash' : 'eye'} variant='light' />
      </Button>
    </InputAdornment>
  );
});

const InputCapslockWarning = forwardRef<HTMLDivElement, CommonProps>(({ ...rest }: CommonProps, ref) => {
  const { formatMessage } = useIntl();

  return (
    <Form.Text
        className = {classNames('post-text', 'help-text')}
        {...rest}
        ref = {ref}>
      {formatMessage(messages.capslockWarning)}
    </Form.Text>
  );
});

interface IInputLengthWarning extends CommonProps {
  length: number;
  maxLength: number;
}

const InputLengthWarning = forwardRef<HTMLDivElement, IInputLengthWarning>(({
    length, maxLength, ...rest }: IInputLengthWarning, ref) => {
  const { formatMessage } = useIntl();

  const showLengthWarning = maxLength && maxLength > 19 && length >= (maxLength - Math.max(Math.floor(maxLength * 0.1), 9));
  const remainingChars = maxLength && maxLength > 0 ? (maxLength - length) : Number.POSITIVE_INFINITY;

  if (!showLengthWarning) return null;

  return (
    <Form.Text
        className = {classNames('post-text', {
          'help-text': remainingChars >= 0,
          'error-text': remainingChars < 0,
        })}
        {...rest}
        ref = {ref}>
      <>
        {remainingChars >= 0 && formatMessage(messages.lengthWarning, { amount: remainingChars })}
        {remainingChars < 0  && formatMessage(messages.lengthExceeded, { amount: remainingChars * -1 })}
      </>
    </Form.Text>
  );
});
