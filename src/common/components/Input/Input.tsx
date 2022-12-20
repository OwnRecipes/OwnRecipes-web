import { createRef } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import classNames from 'classnames';

import '../../css/input.css';

import { isNumber } from '../../utility';
import DebounceInput from './DebounceInput';
import Tooltip from '../Tooltip';
import ConditionalWrapper from '../ConditionalWrapper';
import BaseInputComponent, { IBaseInputComponentProps } from './BaseInputComponent';

export interface IInputProps extends IBaseInputComponentProps {
  label?: string;

  placeholder?:  string;
  autoComplete?: string;

  inputAdornmentStart?: React.ReactNode;
  inputAdornmentEnd?:   React.ReactNode;

  debounceTimeout?: number;

  onChange?: (name: string, newValue: string) => void;
}

export type ITextInputProps = {
  type?:  'text' | 'password';
  rows?:  number;

  value?: string;
  saveValue?: string;

  onChange?: (name: string, newValue: string) => void;
} & IBaseInputComponentProps & IInputProps;

export type INumberInputProps = {
  type?:  'number';

  placeholder?:  string;
  autoComplete?: string;

  inputAdornmentStart?: React.ReactNode;

  value?: string | number;
  saveValue?: string;
  min?:   number;
  max?:   number;

  onChange?: (name: string, newValue: number) => void;
} & IBaseInputComponentProps & IInputProps;

export type IAnyInputProps = ITextInputProps | INumberInputProps;
export const isTextInput   = (inp: IAnyInputProps): inp is ITextInputProps => (inp as ITextInputProps).type == null || (inp as ITextInputProps).type === 'text' || (inp as ITextInputProps).type === 'password';
export const isNumberInput = (inp: IAnyInputProps): inp is INumberInputProps => (inp as INumberInputProps).type === 'number';

export default class Input extends BaseInputComponent<IAnyInputProps> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private ref = createRef<any>();

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

  handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.defaultPrevented || event.ctrlKey || event.shiftKey) return;

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

  handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
    if (!this.props.onChange || this.props.readOnly || this.props.disabled) return;
    const value = this.formatValue(event.target.value, true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.props.onChange(this.props.name, value as any);
  };

  render() {
    // console.log(`[Input] name=${this.props.name}`);

    const type = this.props.type ?? 'text';
    const isDebounce = this.props.debounceTimeout != null && this.props.debounceTimeout > 0;

    return (
      <Form.Group
          {...this.getGroupProps()}
          controlId = {this.props.name}
          className = {this.getFormGroupClassNames()}>
        <ConditionalWrapper
            condition = {this.props.tooltip != null}
            render    = {childr => <Tooltip id={`${this.props.name}-tooltip`} tooltip={this.props.tooltip}>{childr}</Tooltip>}>
          {this.getLabel()}
          {this.getHelpText()}
          {this.getErrorMessage()}
          <InputGroup>
            {this.props.inputAdornmentStart && <InputGroup.Text className='input-adornment-start'>{this.props.inputAdornmentStart}</InputGroup.Text>}
            {isDebounce && (
              <DebounceInput
                  minLength = {2}
                  debounceTimeout = {this.props.debounceTimeout}

                  name  = {this.props.name}
                  element = {isTextInput(this.props) && type === 'text' && this.props.rows != null ? 'textarea' : undefined}
                  value = {this.props.value ?? ''}
                  rows  = {isTextInput(this.props) && type === 'text' ? this.props.rows : undefined}
                  min   = {isNumberInput(this.props) ? this.props.min : undefined}
                  max   = {isNumberInput(this.props) ? this.props.max : undefined}

                  required  = {this.props.required}
                  readOnly  = {this.props.readOnly}
                  autoComplete = {this.props.autoComplete}
                  placeholder  = {this.props.placeholder}
                  autoFocus = {this.props.autoFocus}

                  onChange  = {this.handleChange}
                  onKeyDown = {this.handleKeyPress}
                  onBlur    = {this.handleBlur}
                  onFocus   = {this.props.onFocus}

                  className = {classNames('form-control', {
                    'adorned-start': this.props.inputAdornmentStart,
                    'adorned-end': this.props.inputAdornmentEnd,
                  })}
                  ref = {this.ref} />
            )}
            {!isDebounce && (
              <Form.Control
                  name  = {this.props.name}
                  type  = {type === 'number' ? 'text' : type}
                  as    = {isTextInput(this.props) && type === 'text' && this.props.rows != null ? 'textarea' : undefined}
                  value = {this.props.value ?? ''}
                  rows  = {isTextInput(this.props) && type === 'text' ? this.props.rows : undefined}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  min   = {isNumberInput(this.props) ? this.props.min : undefined}
                  max   = {isNumberInput(this.props) ? this.props.max : undefined}

                  required  = {this.props.required}
                  readOnly  = {this.props.readOnly}
                  autoComplete = {this.props.autoComplete}
                  placeholder  = {this.props.placeholder}
                  autoFocus = {this.props.autoFocus}

                  className = {classNames({
                    'adorned-start': this.props.inputAdornmentStart,
                    'adorned-end': this.props.inputAdornmentEnd,
                  })}

                  onChange  = {this.handleChange}
                  onKeyDown = {this.handleKeyPress}
                  onBlur    = {this.handleBlur}
                  onFocus   = {this.props.onFocus}

                  ref = {this.ref} />
              )}
            {this.props.inputAdornmentEnd && <InputGroup.Text className='input-adornment-end'>{this.props.inputAdornmentEnd}</InputGroup.Text>}
          </InputGroup>
        </ConditionalWrapper>
      </Form.Group>
    );
  }
}
