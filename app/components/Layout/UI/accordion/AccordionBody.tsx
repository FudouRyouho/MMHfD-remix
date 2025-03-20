import classNames from "classnames";
import * as React from "react";
import { useContext } from "react";
import { TransitionCallbacks } from "@restart/ui/types";
//import { useBootstrapPrefix } from './ThemeProvider';
import AccordionCollapse from "./AccordionCollapse";
import AccordionItemContext from "./AccordionItemContext";
import { BsPrefixRefForwardingComponent, BsPrefixProps } from "./helpers";

export interface AccordionBodyProps
  extends BsPrefixProps,
    TransitionCallbacks,
    React.HTMLAttributes<HTMLElement> {}

const AccordionBody: BsPrefixRefForwardingComponent<"div", AccordionBodyProps> =
  React.forwardRef<HTMLElement, AccordionBodyProps>(
    (
      {
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as: Component = "div",
        bsPrefix,
        className,
        onEnter,
        onEntering,
        onEntered,
        onExit,
        onExiting,
        onExited,
        ...props
      },
      ref
    ) => {
      //bsPrefix = useBootstrapPrefix(bsPrefix, 'accordion-body');
      const { eventKey } = useContext(AccordionItemContext);

      return (
        <AccordionCollapse
          eventKey={eventKey}
          onEnter={onEnter}
          onEntering={onEntering}
          onEntered={onEntered}
          onExit={onExit}
          onExiting={onExiting}
          onExited={onExited}
        >
          <Component
            ref={ref}
            {...props}
            className={classNames(
              className,
              "accordion-body"
            )}
          />
        </AccordionCollapse>
      );
    }
  ) as typeof AccordionBody;

AccordionBody.displayName = "AccordionBody";

export default AccordionBody;
