import type { JSX } from "solid-js";

export default function Input(
  properties: JSX.InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      {...properties}
      class="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-gray-800 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
      classList={{ [properties.class ?? ""]: !!properties.class }}
    />
  );
}
