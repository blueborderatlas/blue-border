import type { ComponentPropsWithoutRef } from "react";

export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => <h2 {...props} />,
  h3: (props: ComponentPropsWithoutRef<"h3">) => <h3 {...props} />,
  p: (props: ComponentPropsWithoutRef<"p">) => <p {...props} />,
  ul: (props: ComponentPropsWithoutRef<"ul">) => <ul {...props} />,
  li: (props: ComponentPropsWithoutRef<"li">) => <li {...props} />,
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a {...props} target={props.href?.startsWith("http") ? "_blank" : undefined} />
  ),
};
