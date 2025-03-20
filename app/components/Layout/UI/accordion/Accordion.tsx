import classNames from 'classnames';
import * as React from 'react';
import { useMemo } from 'react';
import { useUncontrolled } from 'uncontrollable';
//import { useBootstrapPrefix } from './ThemeProvider';
import AccordionBody from './AccordionBody';
import AccordionButton from './AccordionButton';
import AccordionCollapse from './AccordionCollapse';
import AccordionContext, {
  AccordionSelectCallback,
  AccordionEventKey,
} from './AccordionContext';
import AccordionHeader from './AccordionHeader';
import AccordionItem from './AccordionItem';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface AccordionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'>,
    BsPrefixProps {
  activeKey?: AccordionEventKey;
  defaultActiveKey?: AccordionEventKey;
  onSelect?: AccordionSelectCallback;
  flush?: boolean;
  alwaysOpen?: boolean;
}

const Accordion: BsPrefixRefForwardingComponent<'div', AccordionProps> =
  React.forwardRef<HTMLElement, AccordionProps>((props, ref) => {
    const {
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      activeKey,
      bsPrefix,
      className,
      onSelect,
      flush,
      alwaysOpen,
      ...controlledProps
    } = useUncontrolled(props, {
      activeKey: 'onSelect',
    });

    //const prefix = useBootstrapPrefix(bsPrefix, 'accordion');
    const contextValue = useMemo(
      () => ({
        activeEventKey: activeKey,
        onSelect,
        alwaysOpen,
      }),
      [activeKey, onSelect, alwaysOpen],
    );

    return (
      <AccordionContext.Provider value={contextValue}>
        <Component
          ref={ref}
          {...controlledProps}
          className={classNames(className,'accordion')}
        />
      </AccordionContext.Provider>
    );
  }) as typeof Accordion;

Accordion.displayName = 'Accordion';

export default Object.assign(Accordion, {
  Button: AccordionButton,
  Collapse: AccordionCollapse,
  Item: AccordionItem,
  Header: AccordionHeader,
  Body: AccordionBody,
});
