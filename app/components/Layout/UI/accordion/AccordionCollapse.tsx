import classNames from "classnames";
import * as React from "react";
import { useContext } from "react";
import Collapse, { CollapseProps } from "./Collapse";
import AccordionContext, { isAccordionItemSelected } from "./AccordionContext";
import { BsPrefixRefForwardingComponent, BsPrefixProps } from "./helpers";

export interface AccordionCollapseProps extends BsPrefixProps, CollapseProps {
  eventKey: string;
}

const AccordionCollapse: BsPrefixRefForwardingComponent<
  "div",
  AccordionCollapseProps
> = React.forwardRef<HTMLElement, AccordionCollapseProps>(
  (
    {
      as: Component = "div",
      bsPrefix,
      className,
      children,
      eventKey,
      ...props
    },
    ref
  ) => {
    const { activeEventKey } = useContext(AccordionContext);

    return (
      <Collapse
        ref={ref}
        in={isAccordionItemSelected(activeEventKey, eventKey)}
        {...props}
        className={classNames(
          className,
          "accordion-collapse"
        )}
      >
        <Component>{React.Children.only(children)}</Component>
      </Collapse>
    );
  }
) as any;

AccordionCollapse.displayName = "AccordionCollapse";

export default AccordionCollapse;