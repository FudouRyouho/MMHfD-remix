import * as React from "react";
import { useContext } from "react";
import classNames from "classnames";
import AccordionContext, {
  isAccordionItemSelected,
  AccordionEventKey,
} from "./AccordionContext";
import AccordionItemContext from "./AccordionItemContext";
import { BsPrefixProps, BsPrefixRefForwardingComponent } from "./helpers";
//import { useBootstrapPrefix } from './ThemeProvider';

type EventHandler = React.EventHandler<React.SyntheticEvent>;

export interface AccordionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    BsPrefixProps {}

export function useAccordionButton(
  eventKey: string,
  onClick?: EventHandler
): EventHandler {
  const { activeEventKey, onSelect, alwaysOpen } = useContext(AccordionContext);

  return (e) => {
    /*
      Compare the event key in context with the given event key.
      If they are the same, then collapse the component.
    */
    let eventKeyPassed: AccordionEventKey =
      eventKey === activeEventKey ? null : eventKey;
    if (alwaysOpen) {
      if (Array.isArray(activeEventKey)) {
        if (activeEventKey.includes(eventKey)) {
          eventKeyPassed = activeEventKey.filter((k) => k !== eventKey);
        } else {
          eventKeyPassed = [...activeEventKey, eventKey];
        }
      } else {
        // activeEventKey is undefined.
        eventKeyPassed = [eventKey];
      }
    }

    onSelect?.(eventKeyPassed, e);
    onClick?.(e);
  };
}

const AccordionButton: BsPrefixRefForwardingComponent<
  "div",
  AccordionButtonProps
> = React.forwardRef<HTMLButtonElement, AccordionButtonProps>(
  (
    {
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = "button",
      bsPrefix,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    //bsPrefix = useBootstrapPrefix(bsPrefix, 'accordion-button');
    const { eventKey } = useContext(AccordionItemContext);
    const accordionOnClick = useAccordionButton(eventKey, onClick);
    const { activeEventKey } = useContext(AccordionContext);

    return (
      <Component
        ref={ref}
        onClick={accordionOnClick}
        {...props}
        className={classNames(
          "accordion-button",

          Array.isArray(activeEventKey)
            ? activeEventKey.includes(eventKey)
              ? "bg-black/5 dark:bg-white/10 border-black/15 dark:border-white/10 text-indigo-300"
              : ""
            : eventKey === activeEventKey
            ? "bg-black/5 dark:bg-white/10 border-black/15 dark:border-white/10 text-indigo-300"
            : "bg-black/10 dark:bg-white/5",
          !isAccordionItemSelected(activeEventKey, eventKey) && "collapsed"
        )}
      />
    );
  }
) as typeof AccordionButton;

AccordionButton.displayName = "AccordionButton";

export default AccordionButton;
