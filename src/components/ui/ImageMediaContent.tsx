import { memo } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import SpinnerLoading from './SpinnerLoading'

const ImageMediaContent: React.FC<{ src: string, className: string, alt?: string }> = ({ src, className, alt }) => {
  return (
    <LazyLoadImage
      placeholder={<SpinnerLoading />}
      src={src}
      className={className}
      alt={alt ?? ''} />
)
}

export default memo(ImageMediaContent)