import { createRef } from 'react';
import { Form } from 'react-bootstrap';

import '../../css/checkbox.css';

import BaseInputComponent, { IBaseInputComponentProps } from './BaseInputComponent';
import Tooltip from '../Tooltip';
import ConditionalWrapper from '../ConditionalWrapper';
import Icon from '../Icon';

export interface ICheckboxProps extends IBaseInputComponentProps {
  value?: boolean;

  onChange?: (name: string, newValue: boolean) => void;
}

export default class Checkbox extends BaseInputComponent<ICheckboxProps> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private ref = createRef<any>();

  focus(): boolean { // eslint-disable-line react/no-unused-class-component-methods
    if (this.ref != null && this.ref.current) {
      this.ref.current.focus();
      return true;
    }
    return false;
  }

  getLabel(): React.ReactNode | undefined { // eslint-disable-line react/no-unused-class-component-methods
    if (this.props.label == null) {
      return null;
    } else if (this.props.tooltip) {
      return (
        <>
          {this.props.label}
          &nbsp;
          <Icon icon='info-circle' className='tooltip-icon' />
        </>
      );
    } else {
      return this.props.label;
    }
  }

  handleChange = () => {
    // event: React.ChangeEvent<HTMLInputElement>
    // NOTE: bootstrap will pass as event.target.value always "on".
    if (this.props.readOnly || this.props.disabled) return;
    if (this.props.onChange) {
      this.props.onChange(this.props.name, !this.props.value);
    }
  };

  render() {
    // console.log(`[Checkbox] name=${this.props.name}`);

    return (
      <Form.Group
          controlId = {this.props.name}
          className = {this.getFormGroupClassNames()}>
        <ConditionalWrapper
            condition = {this.props.tooltip != null}
            render    = {childr => <Tooltip id={`${this.props.name}-tooltip`} tooltip={this.props.tooltip}>{childr}</Tooltip>}>
          {this.getHelpText()}
          {this.getErrorMessage()}
          <Form.Check
              name  = {this.props.name}
              checked = {this.props.value}
              label = {this.getLabel()}

              required  = {this.props.required}
              readOnly  = {this.props.readOnly}
              autoComplete = {this.props.autoComplete}
              autoFocus = {this.props.autoFocus}

              onChange  = {this.handleChange}
              onBlur    = {this.props.onBlur}
              onFocus   = {this.props.onFocus}
              ref = {this.ref} />
        </ConditionalWrapper>
      </Form.Group>
    );
  }
}
