import { css } from '@/lib/utils';

/**
 * The chat widget ships from a third-party package that renders a
 * "Powered by" tagline into its shadow DOM. Attribute matching is
 * case-insensitive because the class name is derived at runtime from the
 * component id and its casing is not part of the package's public API.
 */
export const hideTaglineStyles = {
  key: 'hide-tagline',
  type: 'style' as const,
  value: css`
    [class*='tagline' i],
    a[href*='inkeep.com'] {
      display: none !important;
    }
  `,
};
