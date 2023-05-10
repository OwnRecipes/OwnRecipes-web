import classNames from 'classnames';
import { forwardRef } from 'react';
import { OverlayTrigger, Tooltip as BootstrapTooltip } from 'react-bootstrap';
import { Placement } from 'react-bootstrap/esm/types';

import '../css/tooltip.css';
import { CommonProps } from '../types/OverridableComponent';

export interface ITooltipProps extends CommonProps {
  id:         string;
  tooltip:    React.ReactNode;
  /**
   * @defaultValue `bottom`
   */
  placement?: Placement;
  children:   React.ReactNode;
}

const Tooltip = forwardRef<HTMLDivElement, ITooltipProps>(({
  id, tooltip, placement = 'bottom', children,
  className, ...rest }: ITooltipProps, ref) => (
    <OverlayTrigger
        placement = {placement}
        delay = {{ show: 500, hide: 250 }}
        overlay = {(
          <BootstrapTooltip id={id} ref={ref} style={{ position: 'fixed' }}>
            {tooltip}
          </BootstrapTooltip>
      )}>
      <span className={classNames('tooltip-inline-block', className)} {...rest}>{children}</span>
    </OverlayTrigger>
));

export default Tooltip;
