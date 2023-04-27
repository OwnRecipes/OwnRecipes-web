import Datetime from 'react-datetime';
import moment from 'moment';
import { Form } from 'react-bootstrap';

import BaseInputComponent, { IBaseInputComponentProps } from './BaseInputComponent';
import Tooltip from '../Tooltip';
import ConditionalWrapper from '../ConditionalWrapper';

require('react-datetime/css/react-datetime.css');

interface IDateTimeProps extends IBaseInputComponentProps {
  timeFormat?: string;
  dateFormat?: string;

  onChange: (name: string, newIsoDate: string) => void;
}

interface IDateTimeState {
  value: moment.MomentInput,
}

export default class DateTime extends BaseInputComponent<IDateTimeProps, IDateTimeState> {
  handleChange = (date: moment.MomentInput) => {
    this.setState({
      value: date,
    });

    if (this.props.onChange) {
      this.props.onChange(this.props.name, moment(date).toISOString());
    }
  };

  render() {
    const { timeFormat, dateFormat, onChange, // eslint-disable-line @typescript-eslint/no-unused-vars
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
              value = {!timeFormat ? moment(this.state.value).format('ddd, ll') : moment(this.state.value).format('llll')}
              inputProps = {{
                name:       name,
                className: 'form-control',
                ...rest,
              }}
              dateFormat = {dateFormat || 'ddd, ll'}
              timeFormat = {timeFormat}
              onChange   = {this.handleChange} />
        </ConditionalWrapper>
      </Form.Group>
    );
  }
}
