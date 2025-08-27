import type { JSX } from "solid-js";

export default function Label(
  properties: JSX.LabelHTMLAttributes<HTMLLabelElement>
) {
  return (
    <label
      {...properties}
      class="block text-sm font-medium text-gray-900 dark:text-white"
      classList={{ [properties.class ?? ""]: !!properties.class }}
    >
      {properties.children}
    </label>
  );
}
