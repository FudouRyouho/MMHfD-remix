import classNames from 'classnames';
import * as React from 'react';
import { useMemo } from 'react';
//import { useBootstrapPrefix } from './ThemeProvider';
import AccordionItemContext, {
  AccordionItemContextValue,
} from './AccordionItemContext';
import { BsPrefixRefForwardingComponent, BsPrefixProps } from './helpers';

export interface AccordionItemProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  eventKey: string;
}

const AccordionItem: BsPrefixRefForwardingComponent<'div', AccordionItemProps> =
  React.forwardRef<HTMLElement, AccordionItemProps>(
    (
      {
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as: Component = 'div',
        bsPrefix,
        className,
        eventKey,
        ...props
      },
      ref,
    ) => {
      //bsPrefix = useBootstrapPrefix(bsPrefix, 'accordion-item');
      const contextValue = useMemo<AccordionItemContextValue>(
        () => ({
          eventKey,
        }),
        [eventKey],
      );

      return (
        <AccordionItemContext.Provider value={contextValue}>
          <Component
            ref={ref}
            {...props}
            className={classNames(className,'accordion-item', 'group')}
          />
        </AccordionItemContext.Provider>
      );
    },
  ) as typeof AccordionItem;

AccordionItem.displayName = 'AccordionItem';

export default AccordionItem;
