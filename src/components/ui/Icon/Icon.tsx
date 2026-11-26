import type { SVGProps } from 'react';
import { icons, type IconName } from './icons.generated';

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: number | string;
  /** Dostupni naziv; bez njega je ikonica dekorativna (aria-hidden). */
  title?: string;
}

/** Inline SVG ikonica — boja se nasleđuje preko `color` (currentColor). */
export function Icon({ name, size = 24, title, width, height, ...rest }: IconProps) {
  const icon = icons[name];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${icon.width} ${icon.height}`}
      width={width ?? size}
      height={height ?? size}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
      {...rest}
      dangerouslySetInnerHTML={{ __html: icon.body }}
    />
  );
}
