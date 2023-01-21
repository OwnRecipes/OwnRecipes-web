import Datetime from 'react-datetime';
import moment from 'moment';
import { Form } from 'react-bootstrap';

import BaseInputComponent, { IBaseInputComponentProps } from './BaseInputComponent';
import Tooltip from '../Tooltip';
import ConditionalWrapper from '../ConditionalWrapper';

require('react-datetime/css/react-datetime.css');

interface IDateTimeProps extends IBaseInputComponentProps {
  name:  string;
  label: string;
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
          <Datetime
              value = {!this.props.timeFormat ? moment(this.state.value).format('ddd, ll') : moment(this.state.value).format('llll')}
              inputProps = {{
                name:    this.props.name,
                className: 'form-control',
                onBlur:  this.props.onBlur,
                onFocus: this.props.onFocus,
                onKeyDown: this.props.onKeyDown,
              }}
              dateFormat ={this.props.dateFormat || 'ddd, ll'}
              timeFormat ={this.props.timeFormat}
              onChange   = {this.handleChange} />
        </ConditionalWrapper>
      </Form.Group>
    );
  }
}
