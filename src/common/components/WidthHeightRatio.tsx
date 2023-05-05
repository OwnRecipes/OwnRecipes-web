import { forwardRef } from 'react';
import classNames from 'classnames';

import '../css/width_height_ratio.css';
import { CommonProps } from '../types/OverridableComponent';

export interface IWidthHeightRatioProps extends CommonProps {
  height: number;
  width:  number;
  children: React.ReactNode;
}

const WidthHeightRatio = forwardRef<HTMLDivElement, IWidthHeightRatioProps>(({
  height, width, children,
  className, style, ...rest }: IWidthHeightRatioProps, ref) => (
    <div
        style = {{
          paddingTop: `${height}%`,
          width:      `${width}%`,
          position:   'relative',
          ...style,
        }}
        className={classNames('width-height-ratio', className)}
        {...rest}
        ref = {ref}>
      {children}
    </div>
));

export default WidthHeightRatio;
