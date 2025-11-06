import cx from 'classnames';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: classNames.ArgumentArray) {
  return twMerge(cx(inputs));
}
