import { forwardRef, type ImgHTMLAttributes, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const FALLBACK_IMAGE_URL =
  "https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png";

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

