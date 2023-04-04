import { forwardRef, useCallback, useEffect, useState } from 'react';

import { CommonProps } from '../types/OverridableComponent';

export interface IImageProps extends CommonProps {
  src: string;
  placeholder?: string;
  alt?: string;

  onError?: () => void;
}

const Image = forwardRef<HTMLImageElement, IImageProps>(({
    src, placeholder, alt, onError, ...rest }: IImageProps, ref) => {
  const [hasError, setError] = useState<boolean>(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  const handleError = useCallback(() => {
    setError(true);
    onError?.();
  }, [onError]);

  return (
    <img
        src = {hasError ? placeholder : src}
        alt = {alt}
        onError = {handleError}

        {...rest}
        ref = {ref} />
  );
});

export default Image;
