import classNames from 'classnames';
import React, { useState, useRef, useEffect } from 'react';
import { TransitionCallbacks } from '@restart/ui/types';
import { getChildRef } from '@restart/ui/utils';
import createChainedFunction from './createChainedFunction';
import { motion, AnimatePresence } from 'framer-motion';

type Dimension = 'height' | 'width';

export interface CollapseProps
  extends Omit<TransitionCallbacks, 'onEnter' | 'onExit'>,
    Pick<React.HTMLAttributes<HTMLElement>, 'role'> {
  className?: string;
  in?: boolean;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  appear?: boolean;
  timeout?: number;
  dimension?: Dimension | (() => Dimension);
  children: React.ReactElement;
  onEnter?: (node: HTMLElement) => void;
  onExit?: (node: HTMLElement) => void;
}

const Collapse = React.forwardRef<HTMLElement, CollapseProps>(
  (
    {
      onEnter,
      onExit,
      className,
      children,
      dimension = 'height',
      in: inProp = false,
      timeout = 300,
      mountOnEnter = false,
      unmountOnExit = false,
      appear = false,
      ...props
    },
    ref,
  ) => {
    const [isCollapsed, setIsCollapsed] = useState(!inProp);
    const elementRef = useRef<HTMLElement>(null);
    const computedDimension = typeof dimension === 'function' ? dimension() : dimension;

    useEffect(() => {
      if (inProp) {
        setIsCollapsed(false);
        if (onEnter && elementRef.current) {
          onEnter(elementRef.current);
        }
      } else {
        if (onExit && elementRef.current) {
          onExit(elementRef.current);
        }
      }
    }, [inProp, onEnter, onExit]);

    const variants = {
      open: { height: 'auto', opacity: 1 },
      closed: { height: 0, opacity: 0 },
    };

    const mergedRef = createChainedFunction(getChildRef(children), (node) => {
      elementRef.current = node;
      if (ref) {
        if (typeof ref === "function") {
          ref(node);
        } else {
          (ref as React.MutableRefObject<HTMLElement>).current = node;
        }
      }
    });

    return (
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            ref={mergedRef}
            initial="closed"
            animate={inProp ? 'open' : 'closed'}
            variants={variants}
            transition={{ duration: timeout / 1000, ease: "easeInOut" }}
            style={{ overflow: 'hidden' }}
            className={classNames(
              className,
              children.props.className,
              computedDimension === 'width' && 'collapse-horizontal',
            )}
            {...props}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
);

Collapse.displayName = 'Collapse';

export default Collapse;