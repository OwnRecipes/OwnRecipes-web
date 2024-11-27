import Datetime from 'react-datetime';
import moment, { Moment } from 'moment';
import { Form } from 'react-bootstrap';

import '../../css/datetime.css';

import BaseInputComponent, { IBaseInputComponentProps } from './BaseInputComponent';
import Tooltip from '../Tooltip';
import ConditionalWrapper from '../ConditionalWrapper';

require('react-datetime/css/react-datetime.css');

export interface IDateTimeProps extends IBaseInputComponentProps {
  value?: string | Date | Moment | null;
  timeFormat?: string | boolean;
  dateFormat?: string | boolean;

  onChange?: (name: string, value: moment.MomentInput) => void;
}

interface IDateTimeState {
  value: moment.MomentInput,
}

export default class DateTime extends BaseInputComponent<IDateTimeProps, IDateTimeState> {
  handleChange = (date: moment.MomentInput) => {
    this.props.onChange?.(this.props.name, date);
  };

  render() {
    const { onChange, // eslint-disable-line @typescript-eslint/no-unused-vars
        value, timeFormat, dateFormat,
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
          <Datetime
              value  = {value ?? ''}
              inputProps = {{
                name:       name,
                className: 'form-control',
                ...rest,
              }}
              dateFormat = {dateFormat || 'ddd, ll'}
              timeFormat = {timeFormat}
              closeOnSelect
              className = 'form-datetime'
              onChange   = {this.handleChange} />
        </ConditionalWrapper>
      </Form.Group>
    );
  }
}
