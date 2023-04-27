import { createRef } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import ReactTextareaAutocomplete, { TriggerType } from '@webscopeio/react-textarea-autocomplete';

import '../../css/input.css';
import '../../css/textarea_autocomplete.css';

import BaseInputComponent, { IBaseInputComponentProps } from './BaseInputComponent';
import Tooltip from '../Tooltip';
import ConditionalWrapper from '../ConditionalWrapper';
import Icon from '../Icon';

export type AutocompleteListItem = {
  name: string;
  char: string;
}

export interface ITextareaAutocompleteProps<TListItem extends string | object = AutocompleteListItem> extends IBaseInputComponentProps {
  value?: string;
  rows?: number;
  placeholder?: string;

  trigger: TriggerType<TListItem>;

  onChange?: (name: string, newValue: string) => void;
}

const Loading = () => <div className='loading'>Loading...</div>;

export default class TextareaAutocomplete<TListItem extends string | object = AutocompleteListItem> extends BaseInputComponent<ITextareaAutocompleteProps<TListItem>> {
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

  render() {
    // console.log(`[TextareaAutocomplete] name=${this.props.name}, value=${this.props.value}`);

    const { value = '', rows = 4, onChange, // eslint-disable-line @typescript-eslint/no-unused-vars
        name, style, tooltip,
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
            <ReactTextareaAutocomplete<TListItem>
                name     = {name}
                value    = {value}
                rows     = {rows}

                loadingComponent = {Loading}
                className = 'form-control'
                movePopupAsYouType

                onChange  = {this.handleChange}

                {...rest}
                ref = {this.ref}
              />
          </InputGroup>
        </ConditionalWrapper>
      </Form.Group>
    );
  }
}
