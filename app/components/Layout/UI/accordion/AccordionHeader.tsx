import classNames from 'classnames';
import * as React from 'react';
//import { useBootstrapPrefix } from './ThemeProvider';
import AccordionButton from './AccordionButton';
import { BsPrefixRefForwardingComponent, BsPrefixProps } from './helpers';

export interface AccordionHeaderProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {}

const AccordionHeader: BsPrefixRefForwardingComponent<
  'h2',
  AccordionHeaderProps
> = React.forwardRef<HTMLElement, AccordionHeaderProps>(
  (
    {
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'h2',
      'aria-controls': ariaControls,
      bsPrefix,
      className,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    //bsPrefix = useBootstrapPrefix(bsPrefix, 'accordion-header');

    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(className,'accordion-header')}
      >
        <AccordionButton onClick={onClick} aria-controls={ariaControls}>
          {children}
        </AccordionButton>
      </Component>
    );
  },
) as typeof AccordionHeader;

AccordionHeader.displayName = 'AccordionHeader';

export default AccordionHeader;
