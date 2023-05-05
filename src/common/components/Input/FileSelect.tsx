import { createRef } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

import ConditionalWrapper from '../ConditionalWrapper';
import Icon from '../Icon';
import Tooltip from '../Tooltip';
import BaseInputComponent, { IBaseInputComponentProps } from './BaseInputComponent';

export interface IFileSelectProps extends IBaseInputComponentProps {
  accept?: string;
  value?:  string;

  onChange?: (name: string, newValue: File | undefined) => void;
}

class FileSelect extends BaseInputComponent<IFileSelectProps> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private ref = createRef<any>();

  clearValue() { // eslint-disable-line react/no-unused-class-component-methods
    if (this.ref != null && this.ref.current) {
      this.ref.current.value = '';
    }
  }

  focus(): boolean { // eslint-disable-line react/no-unused-class-component-methods
    if (this.ref != null && this.ref.current) {
      this.ref.current.focus();
      return true;
    }
    return false;
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange?.(event.target.name, event?.target.files?.[0]);
  };

  handleClear = () => {
    if (this.props.onChange) {
      this.props.onChange(this.props.name, '' as unknown as File);
      this.clearValue();
    }
  };

  render() {
    // console.log(`[FileSelect] name=${this.props.name}`);

    const { accept, value, onChange, // eslint-disable-line @typescript-eslint/no-unused-vars
        name, style, tooltip, readOnly, disabled,
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
          {this.getLabel()}
          {this.getHelpText()}
          {this.getErrorMessage()}
          <InputGroup>
            <Form.Control
                type   = 'file'
                name   = {name}
                accept = {accept}
                readOnly = {readOnly}
                disabled = {disabled}
                onChange = {this.handleChange}
                {...rest}
                ref = {this.ref} />
            {!readOnly && !disabled && onChange
                && (value || (this.ref.current != null && this.ref.current.value)) && (
                  <InputGroup.Text className='input-adornment-end button'>
                    <Button onClick={this.handleClear}><Icon icon='x' variant='light' size='2x' /></Button>
                  </InputGroup.Text>
            )}
          </InputGroup>
        </ConditionalWrapper>
      </Form.Group>
    );
  }
}

export default FileSelect;
