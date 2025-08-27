import type { JSX, ParentProps } from "solid-js";

export default function Select(
  properties: ParentProps<JSX.SelectHTMLAttributes<HTMLSelectElement>>
) {
  return (
    <select
      {...properties}
      class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus-visible:outline-indigo-500"
      classList={{ [properties.class ?? ""]: !!properties.class }}
    >
      {properties.children}
    </select>
  );
}
