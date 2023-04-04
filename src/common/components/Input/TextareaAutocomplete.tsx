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

    return (
      <Form.Group
          {...this.getGroupProps()}
          controlId = {this.props.name}
          className = {this.getFormGroupClassNames()}
          style     = {this.props.style}>
        <ConditionalWrapper
            condition = {this.props.tooltip != null}
            render    = {childr => <Tooltip id={`${this.props.name}-tooltip`} tooltip={this.props.tooltip}>{childr}</Tooltip>}>
          {this.getLabel()}
          {this.getHelpText()}
          {this.getErrorMessage()}
          <InputGroup>
            <ReactTextareaAutocomplete<TListItem>
                {...this.props}
                name     = {this.props.name}
                value    = {this.props.value ?? ''}
                rows     = {this.props.rows ?? 4}

                required  = {this.props.required}
                readOnly  = {this.props.readOnly}
                autoComplete = {this.props.autoComplete}
                autoFocus = {this.props.autoFocus}

                loadingComponent = {Loading}
                className = 'form-control'
                movePopupAsYouType
                trigger   = {this.props.trigger}

                onChange  = {this.handleChange}
                onBlur    = {this.props.onBlur}
                onFocus   = {this.props.onFocus}
                onKeyDown = {this.props.onKeyDown}
              />
          </InputGroup>
        </ConditionalWrapper>
      </Form.Group>
    );
  }
}
