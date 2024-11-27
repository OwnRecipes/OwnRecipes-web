/** Coded by Nik Butenko et al, see https://github.com/nkbt/react-debounce-input. */

import { createElement, PureComponent, RefObject } from 'react';
import { debounce } from 'lodash-es';

export interface IDebounceInputProps {
  /**
   * The element to render. May be a string, like 'input'.
   *
   * @defaultValue `'input'`
   */
  element?: React.FC | string;
  /**
   * The value type, like the ones an input support ('number', 'password' ...).
   *
   * @defaultValue `'text'`
   */
  type?: string;
  /** The actual value. */
  value: string | number;
  /**
   * How many letters need at least to be entered to actually fire a change event.
   *
   * @defaultValue `0`
   */
  minLength?: number;
  /**
   * After so many ms without a new input, the change will be fired.
   *
   * @defaultValue `100`
   */
  debounceTimeout?: number;
  /**
   * If the change event should be fired upon pressing enter.
   *
   * @defaultValue `true`
   */
  forceNotifyByEnter?: boolean;
  /**
   * If the change event should be fired upon blurring the field.
   *
   * @defaultValue `true`
   */
  forceNotifyOnBlur?: boolean;
  /** This ref will be passed to the input-DOM-Element. */
  inputRef?: RefObject<HTMLInputElement>;

  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;

  /** All unknown props will be passed to the rendered component. */
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface IDebounceInputState {
  value: string | number;
}

const DEBOUNCE_TIMEOUT_D = 100;

export default class DebounceInput extends PureComponent<IDebounceInputProps, IDebounceInputState> {
  private isDebouncing: boolean;
  private flush!: () => void;
  private notify!: (event: React.ChangeEvent<HTMLInputElement>) => void;
  private cancel: (() => void) | undefined;

  constructor(props: IDebounceInputProps) {
    super(props);

    this.isDebouncing = false;
    this.state = {
      value: typeof props.value === 'undefined' || props.value === null ? '' : props.value,
    };

    const { debounceTimeout = DEBOUNCE_TIMEOUT_D } = this.props;
    this.createNotifier(debounceTimeout);
  }

  componentDidUpdate(prevProps: IDebounceInputProps) {
    if (this.isDebouncing) {
      return;
    }
    const { value } = this.props;
    const { debounceTimeout = DEBOUNCE_TIMEOUT_D } = this.props;

    const { value: oldValue } = prevProps;
    const { debounceTimeout: oldTimeout = DEBOUNCE_TIMEOUT_D } = prevProps;
    const { value: stateValue } = this.state;

    if (typeof value !== 'undefined' && oldValue !== value && stateValue !== value) {
      // Update state.value if new value passed via props, yep re-render should happen
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ value });
    }
    if (debounceTimeout !== oldTimeout) {
      this.createNotifier(debounceTimeout);
    }
  }

  componentWillUnmount() {
    if (this.flush) {
      this.flush();
    }
  }

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();

    const { value: oldValue } = this.state;
    const { minLength = 0 } = this.props;

    this.setState({ value: event.target.value }, () => {
      const { value } = this.state;

      if (String(value).length >= minLength) {
        this.notify(event);
        return;
      }

      // If user hits backspace and goes below minLength consider it cleaning the value
      if (String(oldValue).length > String(value).length) {
        this.notify({ ...event, target: { ...event.target, value: '' } });
      }
    });
  };

  onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.forceNotify(event);
    }
    // Invoke original onKeyDown if present
    const { onKeyDown } = this.props;
    if (onKeyDown) {
      event.persist();
      onKeyDown(event);
    }
  };

  onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    this.forceNotify(event);
    // Invoke original onBlur if present
    const { onBlur } = this.props;
    if (onBlur) {
      event.persist();
      onBlur(event);
    }
  };

  createNotifier = (debounceTimeout: number) => {
    if (debounceTimeout < 0) {
      this.notify = () => null;
    } else if (debounceTimeout === 0) {
      this.notify = this.doNotify;
    } else {
      const debouncedChangeFunc = debounce(event => {
        this.isDebouncing = false;
        this.doNotify(event);
      }, debounceTimeout);

      this.notify = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.isDebouncing = true;
        debouncedChangeFunc(event);
      };

      this.flush = () => debouncedChangeFunc.flush();

      this.cancel = () => {
        this.isDebouncing = false;
        debouncedChangeFunc.cancel();
      };
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  doNotify = (...args: Array<any>) => {
    const { onChange } = this.props;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onChange(...args);
  };

  forceNotify = (event: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
    const { debounceTimeout = DEBOUNCE_TIMEOUT_D } = this.props;
    if (!this.isDebouncing && debounceTimeout > 0) {
      return;
    }

    if (this.cancel) {
      this.cancel();
    }

    const { value } = this.state;
    const { minLength = 0 } = this.props;

    if (String(value).length >= minLength) {
      this.doNotify(event);
    } else {
      this.doNotify({ ...event, target: { ...event.target, value } });
    }
  };

  render() {
    const {
      element = 'input',
      onChange: _onChange, // eslint-disable-line @typescript-eslint/no-unused-vars
      value: _value, // eslint-disable-line @typescript-eslint/no-unused-vars
      minLength: _minLength = 0, // eslint-disable-line @typescript-eslint/no-unused-vars
      debounceTimeout: _debounceTimeout = DEBOUNCE_TIMEOUT_D, // eslint-disable-line @typescript-eslint/no-unused-vars
      forceNotifyByEnter = true,
      forceNotifyOnBlur = true,
      onKeyDown,
      onBlur,
      inputRef,
      ...props
    } = this.props;
    const { value } = this.state;

    let maybeOnKeyDown;
    if (forceNotifyByEnter) {
      maybeOnKeyDown = { onKeyDown: this.onKeyDown };
    } else if (onKeyDown) {
      maybeOnKeyDown = { onKeyDown };
    } else {
      maybeOnKeyDown = {};
    }

    let maybeOnBlur;
    if (forceNotifyOnBlur) {
      maybeOnBlur = { onBlur: this.onBlur };
    } else if (onBlur) {
      maybeOnBlur = { onBlur };
    } else {
      maybeOnBlur = {};
    }

    const maybeRef = inputRef ? { ref: inputRef } : {};

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return createElement(element as any, {
      ...props,
      onChange: this.onChange,
      value: value,
      ...maybeOnKeyDown,
      ...maybeOnBlur,
      ...maybeRef,
    });
  }
}
