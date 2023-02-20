import { Component } from 'react';
import { Form } from 'react-bootstrap';
import { FieldMetaState } from 'react-final-form';
import classNames from 'classnames';

import '../../css/button.css';
import '../../css/form_group.css';

import Icon from '../Icon';

export interface IBaseInputComponentProps {
  name:       string;
  label?:     string;

  autoFocus?: boolean;
  required?:  boolean;
  readOnly?:  boolean;
  disabled?:  boolean;

  autoComplete?: string;
  helpText?:  React.ReactNode;
  tooltip?:   React.ReactNode;
  errors?:    React.ReactNode;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?:      FieldMetaState<any>;

  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (name: string, newValue: any) => void;
  onBlur?:   (event: React.FocusEvent<HTMLElement, Element>) => void;
  onFocus?:  (event: React.FocusEvent<HTMLElement, Element>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
}

export interface BaseLabelProps {
  htmlFor?: string;
}

export default class BaseInputComponent<P extends IBaseInputComponentProps, S = {}> extends Component<P, S> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange = (event: any) => { // eslint-disable-line react/no-unused-class-component-methods
    if (this.props.readOnly || this.props.disabled) return;
    if (this.props.onChange) {
      this.props.onChange(this.props.name, event.target.value);
    }
  };

  hasError(): boolean {
    return !!this.props.errors;
  }

  isErrorneous(): boolean {
    return this.hasError() && (this.props.meta == null || this.props.meta.touched === true);
  }

  getErrorMessage() { // eslint-disable-line react/no-unused-class-component-methods
    return this.isErrorneous() ? <Form.Text className='error-text'>{this.props.errors}</Form.Text> : null;
  }

  getGroupProps() { // eslint-disable-line react/no-unused-class-component-methods
    return ({
      'data-api-field': this.props.name,
    });
  }

  getHelpText() { // eslint-disable-line react/no-unused-class-component-methods
    return this.props.helpText ? <Form.Text className='help-text'>{this.props.helpText}</Form.Text> : null;
  }

  getLabel(labelProps?: BaseLabelProps): React.ReactNode | undefined { // eslint-disable-line react/no-unused-class-component-methods
    if (this.props.label == null) {
      return null;
    } else if (this.props.tooltip) {
      return (
        <>
          <Form.Label htmlFor={labelProps?.htmlFor}>{this.props.label}</Form.Label>
          &nbsp;
          <Icon icon='info-circle' className='tooltip-icon' />
        </>
      );
    } else {
      return <Form.Label htmlFor={labelProps?.htmlFor}>{this.props.label}</Form.Label>;
    }
  }

  getFormGroupClassNames() { // eslint-disable-line react/no-unused-class-component-methods
    return classNames('form-group', this.props.className, {
      error:    this.isErrorneous(),
      readonly: this.props.readOnly,
      required: this.props.required && !this.props.readOnly,
      'no-label': this.props.label == null,
    });
  }
}
