import { PropsWithChildren, ReactNode } from "react";

export default function GameLayout(props: PropsWithChildren): ReactNode {
  const { children } = props;
  return <div>{children}</div>;
}
