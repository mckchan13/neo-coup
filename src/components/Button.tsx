"use client";

import React, { PropsWithChildren, ReactElement } from "react";

export type ButtonProps = {
  className?: string;
};

export type Props = PropsWithChildren<ButtonProps>;

export default function Button(props: Props): ReactElement {
  const { children, ...rest } = props;

  const handleClick = () => {

  }
  
  return (
    <button onClick={() => console.log("I was clicked")} {...rest}>
      {children}
    </button>
  );
}
