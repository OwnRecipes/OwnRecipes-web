import { useCallback, useEffect, useState } from 'react';

export interface IImageProps {
  src: string;
  placeholder?: string;
  alt?: string;

  onError?: () => void;

  style?: React.CSSProperties;
  className?: string;
}

const Image: React.FC<IImageProps> = ({
    src, placeholder, alt, onError, style, className }: IImageProps) => {
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

        style = {style}
        className = {className} />
  );
};

export default Image;
