import { forwardRef, type ImgHTMLAttributes, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const FALLBACK_IMAGE_URL = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Crect width='100' height='100' fill='%23e5e7eb'/%3E%3Cpath fill='%239ca3af' d='M50 30 L20 60 L80 60 Z'/%3E%3C/svg%3E";

// Simplified props - removing Wix specific fitting/focal point props for now
export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  // Keeping these optional props to avoid breaking existing usage, 
  // though they won't trigger complex Wix backend logic anymore.
  fittingType?: string;
  originWidth?: number;
  originHeight?: number;
  focalPointX?: number;
  focalPointY?: number;
};

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ className, src, alt, onError, ...props }, ref) => {
    const [imgSrc, setImgSrc] = useState<string | undefined>(src);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
      setImgSrc(src);
      setIsError(false);
    }, [src]);

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      if (!isError) {
        setIsError(true);
        setImgSrc(FALLBACK_IMAGE_URL);
      }
      if (onError) {
        onError(e);
      }
    };

    return (
      <img
        ref={ref}
        src={imgSrc || FALLBACK_IMAGE_URL}
        alt={alt || ""}
        className={cn("object-cover", className)}
        onError={handleError}
        {...props}
      />
    );
  }
);
Image.displayName = "Image";

