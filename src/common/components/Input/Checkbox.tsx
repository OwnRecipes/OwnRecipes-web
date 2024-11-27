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
    this.props.onChange?.(this.props.name, !this.props.value);
  };

  render() {
    // console.log(`[Checkbox] name=${this.props.name}`);

    const { onChange, // eslint-disable-line @typescript-eslint/no-unused-vars
        name, style, tooltip, value,
        label, className, helpText, errors, meta, ...rest } = this.props; // eslint-disable-line @typescript-eslint/no-unused-vars

    return (
      <Form.Group
          {...this.getGroupProps()}
          controlId = {name}
          className = {this.getFormGroupClassNames()}
          style     = {style}>
        <ConditionalWrapper
            condition = {tooltip != null}
            render    = {childr => <Tooltip id={`${name}-tooltip`} tooltip={tooltip}>{childr}</Tooltip>}>
          {this.getHelpText()}
          {this.getErrorMessage()}
          <Form.Check
              name  = {name}
              checked = {value}
              label = {this.getLabel()}
              className = 'form-check' // BUG: always set form-check
              onChange  = {this.handleChange}

              {...rest}
              ref = {this.ref} />
        </ConditionalWrapper>
      </Form.Group>
    );
  }
}
