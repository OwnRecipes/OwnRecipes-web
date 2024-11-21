import { createRef } from 'react';
import { Form } from 'react-bootstrap';
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import SelectReact, { MultiValue, SingleValue } from 'react-select';
import CreatableSelectReact from 'react-select/creatable';
import AsyncReact from 'react-select/async';

import '../../css/select.css';

import BaseInputComponent, { IBaseInputComponentProps } from './BaseInputComponent';
import ConditionalWrapper from '../ConditionalWrapper';
import Tooltip from '../Tooltip';

const selectCommonMessages = defineMessages({
  no_options: {
    id: 'select.no_options',
    description: 'Info text when opening a select dropdown with no options.',
    defaultMessage: 'No options',
  },
});

export interface SelectDataType {
  value: string;
  label: string;
}

export interface ISelectProps extends IBaseInputComponentProps {
  value?: string;
  data?:  Array<SelectDataType>;

  onChange?: (name: string, newValue: string | undefined) => void;
}
export interface ISelectMultiProps extends IBaseInputComponentProps {
  value?: Array<string>;
  data?:  Array<SelectDataType>;
  isMulti: true;

  onChange?: (name: string, newValue: Array<string>) => void;
}
export const isMultiSelect = (props: unknown): props is ISelectMultiProps => (props as ISelectMultiProps).isMulti === true;

function findSelectedOptions(options: Array<SelectDataType>, value: Array<string> | string | undefined): Array<SelectDataType> | SelectDataType {
  if (Array.isArray(value)) {
    return options.filter(o => value.includes(o.value));
  } else {
    return options.find(o => o.value === value) ?? '' as unknown as SelectDataType;
  }
}

export class SelectBase extends BaseInputComponent<(ISelectProps | ISelectMultiProps) & WrappedComponentProps> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private ref = createRef<any>();

  focus(): boolean { // eslint-disable-line react/no-unused-class-component-methods
    if (this.ref != null && this.ref.current) {
      this.ref.current.focus();
      return true;
    }
    return false;
  }

  handleChange = (data: SingleValue<SelectDataType> | MultiValue<SelectDataType>) => {
    if (isMultiSelect(this.props)) {
      this.props.onChange?.(this.props.name, (data as MultiValue<SelectDataType>).map(d => d.value));
    } else {
      this.props.onChange?.(this.props.name, (data as SingleValue<SelectDataType>)?.value);
    }
  };

  render() {
    const { value, data, onChange, // eslint-disable-line @typescript-eslint/no-unused-vars
        name, style, tooltip, readOnly, disabled,
        label, className, helpText, errors, meta, ...rest } = this.props; // eslint-disable-line @typescript-eslint/no-unused-vars

    const dataOptions = data ?? [];
    const selectedOptions = findSelectedOptions(dataOptions, value);

    return (
      <Form.Group
          {...this.getGroupProps()}
          className = {this.getFormGroupClassNames()}
          style     = {style}>
        <ConditionalWrapper
            condition = {tooltip != null}
            render    = {childr => <Tooltip id={`${name}-tooltip`} tooltip={tooltip}>{childr}</Tooltip>}>
          {this.getLabel({ htmlFor: `${name}-input` })}
          {this.getHelpText()}
          {this.getErrorMessage()}
          <SelectReact
              inputId     = {`${name}-input`}
              name        = {name}
              value       = {selectedOptions}
              options     = {data}
              noOptionsMessage={() => this.props.intl.formatMessage(selectCommonMessages.no_options)}

              isDisabled  = {readOnly || disabled}

              onChange    = {this.handleChange}
              className = 'react-select-container'
              classNamePrefix = 'creatable-select'
              placeholder = ''

              {...rest}
              ref = {this.ref} />
        </ConditionalWrapper>
      </Form.Group>
    );
  }
}

export const Select = injectIntl(SelectBase, { forwardRef: true });

export interface IAsyncSelectProps extends Omit<ISelectProps, 'data'> {
  initialValueLabel?: string;
  loadOptions: (searchTerm: string) => Promise<Array<SelectDataType>>;
}

interface IAsyncSelectState {
  data: Array<SelectDataType> | undefined;
}

export class AsyncSelectBase extends BaseInputComponent<IAsyncSelectProps & WrappedComponentProps, IAsyncSelectState> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private ref = createRef<any>();

  constructor(props: IAsyncSelectProps & WrappedComponentProps) {
    super(props);

    this.state = {
      data: undefined,
    };
  }

  focus(): boolean { // eslint-disable-line react/no-unused-class-component-methods
    if (this.ref != null && this.ref.current) {
      this.ref.current.focus();
      return true;
    }
    return false;
  }

  handleChange = (data: SingleValue<SelectDataType>) => {
    this.props.onChange?.(this.props.name, data?.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleLoadOptions = (searchTerm: string, callback: any) => {
    if (!searchTerm) return callback([]);
    return this.props.loadOptions(searchTerm).then(res => {
      this.setState({ data: res });
      return res;
    });
  };

  render() {
    const { onChange, // eslint-disable-line @typescript-eslint/no-unused-vars
        name, value, initialValueLabel, style, tooltip, readOnly, disabled,
        label, className, helpText, errors, meta, loadOptions, ...rest } = this.props; // eslint-disable-line @typescript-eslint/no-unused-vars

    let selectedOption = this.state.data?.find(o => o.value === value);
    if (value && initialValueLabel && this.state.data == null) {
      selectedOption = { value: value, label: initialValueLabel };
    }

    return (
      <Form.Group
          {...this.getGroupProps()}
          className = {this.getFormGroupClassNames()}
          style     = {style}>
        <ConditionalWrapper
            condition = {tooltip != null}
            render    = {childr => <Tooltip id={`${name}-tooltip`} tooltip={tooltip}>{childr}</Tooltip>}>
          {this.getLabel({ htmlFor: `${name}-input` })}
          {this.getHelpText()}
          {this.getErrorMessage()}
          <AsyncReact
              inputId     = {`${name}-input`}
              name        = {name}
              value       = {selectedOption}
              loadOptions = {this.handleLoadOptions}

              isDisabled  = {readOnly || disabled}

              onChange    = {this.handleChange}
              className = 'react-select-container'
              classNamePrefix = 'creatable-select'
              placeholder = ''
              noOptionsMessage={() => this.props.intl.formatMessage(selectCommonMessages.no_options)}

              {...rest}
              ref = {this.ref} />
        </ConditionalWrapper>
      </Form.Group>
    );
  }
}

export const AsyncSelect = injectIntl(AsyncSelectBase, { forwardRef: true });

export interface ICreatableSelectValues extends IBaseInputComponentProps {
  value?:   Array<string> | string;
  data?:    Array<SelectDataType>;
  isMulti?: boolean;
}
interface ICreatableSelectProps extends ICreatableSelectValues {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (name: string, newValue: any | undefined) => void;
}

interface ICreatableSelectState {
  options: Array<SelectDataType>;
}

const isValidNewOption = (value: string): boolean => !!value;

export class CreatableSelect extends BaseInputComponent<ICreatableSelectProps, ICreatableSelectState> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private ref = createRef<any>();

  constructor(props: ICreatableSelectProps) {
    super(props);

    this.state = {
      options: [],
    };
  }

  static getDerivedStateFromProps(nextProps: ICreatableSelectProps, state: ICreatableSelectState) {
    if (nextProps.data == null || nextProps.data.length === 0 || state.options.length === 0) return state;
    const dataIdents = nextProps.data.map(d => d.value);
    const nextOptions = [...state.options];

    for (let index = nextOptions.length - 1; index >= 0; --index) {
      if (dataIdents.includes(nextOptions[index].value)) {
        nextOptions.splice(index, 1);
      }
    }

    if (state.options.length === nextOptions.length) return state;

    return {
      ...state,
      options: nextOptions,
    };
  }

  focus(): boolean { // eslint-disable-line react/no-unused-class-component-methods
    if (this.ref != null && this.ref.current) {
      this.ref.current.focus();
      return true;
    }
    return false;
  }

  handleChange = (data: MultiValue<SelectDataType> | SingleValue<SelectDataType>) => {
    if (this.props.onChange) {
      const val = data != null && Array.isArray(data) ? data.map(dat => dat.value) : (data as SingleValue<SelectDataType>)?.value;
      this.props.onChange(
        this.props.name,
        val
      );
    }
  };

  handleCreate = (inputValue: string) => {
    const newOption: SelectDataType = { value: inputValue, label: inputValue };
    this.setState(prev => (
        {
          options: [...prev.options, newOption],
        }
      ),
      () => {
        if (!this.props.isMulti) {
          this.handleChange(newOption);
        } else {
          const dataOptions = this.props.data ?? [];
          const options = dataOptions.concat(this.state.options);
          const selectedOptions = findSelectedOptions(options, [...(this.props.value as Array<string> | undefined ?? []), inputValue]);
          this.handleChange(selectedOptions);
        }
      });
  };

  render() {
    // console.log(`[Select] name=${this.props.name}, value=${JSON.stringify(this.props.value)}`);

    const { value, data, onChange, // eslint-disable-line @typescript-eslint/no-unused-vars
        name, style, tooltip, readOnly, disabled,
        label, className, helpText, errors, meta, ...rest } = this.props; // eslint-disable-line @typescript-eslint/no-unused-vars

    const dataOptions = data ?? [];
    const options = dataOptions.concat(this.state.options);
    const selectedOptions = findSelectedOptions(options, value);

    return (
      <Form.Group
          {...this.getGroupProps()}
          className = {this.getFormGroupClassNames()}
          style     = {style}>
        <ConditionalWrapper
            condition = {tooltip != null}
            render    = {childr => <Tooltip id={`${name}-tooltip`} tooltip={tooltip}>{childr}</Tooltip>}>
          {this.getLabel({ htmlFor: `${name}-input` })}
          {this.getHelpText()}
          {this.getErrorMessage()}
          <CreatableSelectReact
              inputId = {`${name}-input`}
              onChange = {this.handleChange}
              isValidNewOption = {isValidNewOption}
              onCreateOption = {this.handleCreate}
              isClearable
              value = {selectedOptions}
              isDisabled  = {readOnly || disabled}

              className = 'react-select-container'
              classNamePrefix = 'creatable-select'
              options = {options}
              placeholder = ''

              {...rest}
              ref = {this.ref} />
        </ConditionalWrapper>
      </Form.Group>
    );
  }
}
