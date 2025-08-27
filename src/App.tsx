import { createMemo, createSignal, For, Show, untrack } from "solid-js";
import Input from "./Input";
import availableOptions, { VARIABLE_OPTIONS, defauts } from "./options";
import { createStore } from "solid-js/store";

export default function App() {
  const [date, setDate] = createSignal<Date>(new Date());

  const defaultLocale = navigator.languages[0];
  const [locale, setLocale] = createSignal<string>(defaultLocale);

  const [options, setOptions] = createStore(availableOptions);
  const [areDefaultsIncluded, setAreDefaultsIncluded] = createSignal(false);

  const formatOptions = createMemo(() =>
    Object.fromEntries(
      Object.entries(options).map(([key, option]) => [key, option.selected])
    )
  );

  const formatter = () => Intl.DateTimeFormat(locale(), formatOptions());

  const formatted = () => {
    const value = date();
    if (!value) return;
    return formatter().format(value);
  };

  function update() {
    setDate(new Date());
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);

  function handleChange(event: Event) {
    const input = event.target;

    if (!(input instanceof HTMLInputElement)) return;

    if (input.name === "locale" || input.name === "defaults") return;

    const key = input.name as keyof typeof options;
    let value: string | boolean | undefined | 1 | 2 | 3 = input.value;
    if (value === "undefined") value = undefined;
    else if (value === "true") value = true;
    else if (value === "false") value = false;
    else if (key === "fractionalSecondDigits")
      value = parseInt(value) as 1 | 2 | 3;

    switch (key) {
      case "dateStyle":
      case "timeStyle":
        setOptions(
          [
            "year",
            "month",
            "day",
            "hour",
            "minute",
            "second",
            "dayPeriod",
            "fractionalSecondDigits",
          ],
          "selected",
          undefined
        );
        break;
      case "fractionalSecondDigits":
      case "dayPeriod":
      case "day":
      case "month":
      case "year":
      case "hour":
      case "minute":
      case "second":
        setOptions(["dateStyle", "timeStyle"], "selected", undefined);
        break;
    }

    const oldValue = options[key].selected;

    console.debug("Validating");
    try {
      setOptions(key, "selected", value);
    } catch (error) {
      console.debug("Invalid value", error);
      setOptions(key, "selected", oldValue);
    }
  }

  const json = () =>
    JSON.stringify(
      formatOptions(),
      areDefaultsIncluded()
        ? undefined
        : (key, value) => {
            const defaultValue = Object.hasOwn(defauts, key)
              ? defauts[key as keyof typeof defauts]
              : undefined;

            if (defaultValue === value) return undefined;

            return value;
          },
      2
    );

  const codeSnippet = () => {
    const jsome = json();
    const withoutQuotes = jsome.replace(/"(\w+)":/g, "$1:");

    if (!areDefaultsIncluded()) {
      const isDefaultJson = jsome === "{}";
      const isDefaultLocale = locale() === defaultLocale;

      if (isDefaultJson && isDefaultLocale) return `Intl.DateTimeFormat();`;
      if (isDefaultJson && !isDefaultLocale)
        return `Intl.DateTimeFormat("${locale()}");`;

      if (!isDefaultJson && isDefaultLocale)
        return `Intl.DateTimeFormat(undefined, ${withoutQuotes});`;
    }

    // Remove key quotes

    return `Intl.DateTimeFormat("${locale()}", ${withoutQuotes});`;
  };

  function handleLocaleInput(
    event: InputEvent & { currentTarget: HTMLInputElement }
  ) {
    let locale: Intl.Locale;
    try {
      locale = new Intl.Locale(event.currentTarget.value);
    } catch (error) {
      console.debug("Invalid locale", error);
      return;
    }

    if (!locale.maximize().region) {
      console.debug("Invalid locale", locale);
      return;
    }

    setLocale(event.currentTarget.value);
  }

  return (
    <>
      <header class="fixed top-0 left-1/2 -translate-x-1/2 w-max text-center mx-auto bg-gray-50 dark:bg-gray-800 px-8 py-4 shadow rounded-b-2xl font-mono">
        <h1>Intl.DateTimeFormat playground</h1>
        <p class="bg-gray-950 text-gray-50 dark:bg-gray-50 dark:text-gray-950 px-1">
          <span class="sr-only">Current formatted time</span>
          {formatted()}
        </p>
        <p>
          <span class="sr-only">In ISO format:</span>
          {date().toISOString()}
        </p>
        <p>
          <span class="sr-only">In ISO format:</span>
          {date().toLocaleString()}
        </p>
      </header>
      <main
        class="mt-36 font-mono grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 md:p-6 overflow-x-clip max-w-5xl mx-auto"
        onChange={handleChange}
      >
        <label>
          <label for="locale" class="font-bold text-xl">
            locale
          </label>
          <Input
            type="text"
            id="locale"
            name="locale"
            value={untrack(locale)}
            onInput={handleLocaleInput}
            class="mt-2 font-normal max-w-48"
          />
        </label>
        <For each={Object.entries(options)}>
          {([key, option]) => {
            return (
              <Show
                when={!VARIABLE_OPTIONS.includes(key)}
                fallback={
                  <>
                    <label for={key} class="font-bold text-xl">
                      {key}
                      <Input
                        type="text"
                        list={`${key}-options`}
                        id={key}
                        name={key}
                        value={option.selected?.toString()}
                        class="mt-2 font-normal max-w-48"
                      />
                    </label>
                    <datalist id={`${key}-options`}>
                      <For each={option.options}>
                        {(value) => (
                          <option value={String(value)}>{value}</option>
                        )}
                      </For>
                    </datalist>
                  </>
                }
              >
                <fieldset>
                  <legend class="font-bold text-xl">{key}</legend>
                  <For each={option.options}>
                    {(value) => {
                      const asString = String(value);
                      return (
                        <label class="block text-gray-800 dark:text-gray-200">
                          <input
                            type="radio"
                            name={key}
                            value={asString}
                            checked={asString === String(option.selected)}
                          />
                          <span class="ms-2">
                            {value === undefined
                              ? "undefined"
                              : value.toString()}
                          </span>
                        </label>
                      );
                    }}
                  </For>
                </fieldset>
              </Show>
            );
          }}
        </For>
        <article class="col-span-full justify-items-center">
          <label class="block">
            <input
              type="checkbox"
              name="defaults"
              onChange={(event) =>
                setAreDefaultsIncluded(event.currentTarget.checked)
              }
            />
            <span class="ms-2">Include defaults</span>
          </label>
          <textarea
            class="block w-max p-5 bg-gray-200 dark:bg-gray-800 rounded-xl [field-sizing:content]"
            readOnly
          >
            {codeSnippet()}
          </textarea>
        </article>
      </main>
    </>
  );
}
