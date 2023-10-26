import { Suspense, memo } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import ImageLoading from './ImageLoading'

const ImageMediaContent: React.FC<{ src: string, className: string, alt?: string }> = ({ src, className, alt }) => {
  return (
    <Suspense fallback={<ImageLoading />}>
      <LazyLoadImage
        placeholder={<ImageLoading />}
        src={src}
        className={className}
        alt={alt ?? ''} />
    </Suspense>
  )
}

export default memo(ImageMediaContent)