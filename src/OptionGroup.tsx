import { For, type Accessor, type Setter } from "solid-js";

// Exclude keys where the value type is boolean
type NonBooleanKeys<T> = {
  [K in keyof T]: T[K] extends boolean ? never : K;
}[keyof T];

// Usage with Intl.DateTimeFormatOptions
type NonBooleanDateTimeFormatOptionKeys =
  NonBooleanKeys<Intl.DateTimeFormatOptions>;

type Properties<K extends keyof NonBooleanDateTimeFormatOptionKeys> = {
  key: K;
  options: NonBooleanDateTimeFormatOptionKeys[K][];
  value: Accessor<NonBooleanDateTimeFormatOptionKeys[K]>;
  set: Setter<NonBooleanDateTimeFormatOptionKeys[K]>;
};
export default function OptionGroup<
  K extends keyof NonBooleanDateTimeFormatOptionKeys
>(properties: Properties<K>) {
  return (
    <fieldset
      onChange={(event) => {
        const input = event.target;
        if (!(input instanceof HTMLInputElement))
          throw new Error("Expected input to change");

        // const value: NonBooleanDateTimeFormatOptionKeys =
        //   input.value === "undefined" ? undefined : input.value;
        // properties.set(value);
      }}
    >
      <legend>{properties.key}</legend>
      <For each={properties.options}>
        {(option) => (
          <label>
            <input
              type="radio"
              name={properties.key}
              value={option}
              checked={option === properties.value()}
            />
            {option === undefined ? "None" : option}
          </label>
        )}
      </For>
    </fieldset>
  );
}
