import {
  createEffect,
  createResource,
  createSignal,
  For,
  Match,
  Show,
  Switch,
  untrack,
} from "solid-js";

function App() {
  const [date, setDate] = createSignal<Date>(new Date());

  const [locale, setLocale] = createSignal<string>(navigator.languages[0]);
  const [weekday, setWeekday] = createSignal<
    Intl.DateTimeFormatOptions["weekday"] | undefined
  >();
  const [era, setEra] = createSignal<Intl.DateTimeFormatOptions["era"]>();
  const [year, setYear] = createSignal<Intl.DateTimeFormatOptions["year"]>();
  const [month, setMonth] = createSignal<Intl.DateTimeFormatOptions["month"]>();
  const [day, setDay] = createSignal<Intl.DateTimeFormatOptions["day"]>();
  const [dayPeriod, setDayPeriod] =
    createSignal<Intl.DateTimeFormatOptions["dayPeriod"]>();
  const [hour, setHour] = createSignal<Intl.DateTimeFormatOptions["hour"]>();
  const [minute, setMinute] =
    createSignal<Intl.DateTimeFormatOptions["minute"]>();
  const [second, setSecond] =
    createSignal<Intl.DateTimeFormatOptions["second"]>();
  const [fractionalSecondDigits, setFractionalSecondDigits] =
    //@ts-expect-error
    createSignal<Intl.DateTimeFormatOptions["fractionalSecondDigits"]>();

  const [timeZoneName, setTimeZoneName] =
    createSignal<Intl.DateTimeFormatOptions["timeZoneName"]>();

  const [dateStyle, setDateStyle] =
    createSignal<Intl.DateTimeFormatOptions["dateStyle"]>();
  const [timeStyle, setTimeStyle] =
    createSignal<Intl.DateTimeFormatOptions["timeStyle"]>();

  const options = (): Intl.DateTimeFormatOptions => ({
    weekday: weekday(),
    era: era(),
    year: year(),
    month: month(),
    day: day(),
    dayPeriod: dayPeriod(),
    hour: hour(),
    minute: minute(),
    second: second(),
    //@ts-expect-error
    fractionalSecondDigits: fractionalSecondDigits(),
    timeZoneName: timeZoneName(),
    dateStyle: dateStyle(),
    timeStyle: timeStyle(),
  });

  const formatter = () => Intl.DateTimeFormat(locale(), options());
  const formatted = () => {
    const value = date();
    if (!value) return;
    return formatter().format(value);
  };

  function update() {
    setDate(new Date());
    console;
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);

  return (
    <>
      <main class="mx-auto max-w-max">
        <label for="locale">Locale</label>

        <input
          id="locale"
          type="text"
          value={untrack(locale)}
          onInput={(event) => setLocale(event.target.value)}
        />

        <label for="weekday">Weekday</label>
        <select
          id="weekday"
          onChange={(event) => {
            if (event.target.value === "none") {
              setWeekday(undefined);
              return;
            }

            setWeekday(
              event.target.value as Intl.DateTimeFormatOptions["weekday"]
            );
          }}
        >
          <option value="none">None</option>
          <option value="narrow">Narrow</option>
          <option value="short">Short</option>
          <option value="long">Long</option>
        </select>

        <label for="era">Era</label>
        <select
          id="era"
          onChange={(event) => {
            if (event.target.value === "none") {
              setEra(undefined);
              return;
            }
            setEra(event.target.value as Intl.DateTimeFormatOptions["era"]);
          }}
        >
          <option value="none">None</option>
          <option value="narrow">Narrow</option>
          <option value="short">Short</option>
          <option value="long">Long</option>
        </select>

        <label for="year">Year</label>
        <select
          id="year"
          onChange={(event) => {
            if (event.target.value === "none") {
              setYear(undefined);
              return;
            }
            setYear(event.target.value as Intl.DateTimeFormatOptions["year"]);
          }}
        >
          <option value="none">None</option>
          <option value="numeric">Numeric</option>
          <option value="2-digit">2-digit</option>
        </select>

        <label for="month">Month</label>
        <select
          id="month"
          onChange={(event) => {
            if (event.target.value === "none") {
              setMonth(undefined);
              return;
            }
            setMonth(event.target.value as Intl.DateTimeFormatOptions["month"]);
          }}
        >
          <option value="none">None</option>
          <option value="numeric">Numeric</option>
          <option value="2-digit">2-digit</option>
          <option value="narrow">Narrow</option>
          <option value="short">Short</option>
          <option value="long">Long</option>
        </select>

        <label for="day">Day</label>
        <select
          id="day"
          onChange={(event) => {
            if (event.target.value === "none") {
              setDay(undefined);
              return;
            }
            setDay(event.target.value as Intl.DateTimeFormatOptions["day"]);
          }}
        >
          <option value="none">None</option>
          <option value="numeric">Numeric</option>
          <option value="2-digit">2-digit</option>
        </select>

        <label for="dayPeriod">Day Period</label>
        <select
          id="dayPeriod"
          onChange={(event) => {
            if (event.target.value === "none") {
              setDayPeriod(undefined);
              return;
            }
            setDayPeriod(
              event.target.value as Intl.DateTimeFormatOptions["dayPeriod"]
            );
          }}
        >
          <option value="none">None</option>
          <option value="narrow">Narrow</option>
          <option value="short">Short</option>
          <option value="long">Long</option>
        </select>

        <label for="hour">Hour</label>
        <select
          id="hour"
          onChange={(event) => {
            if (event.target.value === "none") {
              setHour(undefined);
              return;
            }
            setHour(event.target.value as Intl.DateTimeFormatOptions["hour"]);
          }}
        >
          <option value="none">None</option>
          <option value="numeric">Numeric</option>
          <option value="2-digit">2-digit</option>
        </select>

        <label for="minute">Minute</label>
        <select
          id="minute"
          onChange={(event) => {
            if (event.target.value === "none") {
              setMinute(undefined);
              return;
            }
            setMinute(
              event.target.value as Intl.DateTimeFormatOptions["minute"]
            );
          }}
        >
          <option value="none">None</option>
          <option value="numeric">Numeric</option>
          <option value="2-digit">2-digit</option>
        </select>

        <label for="second">Second</label>
        <select
          id="second"
          onChange={(event) => {
            if (event.target.value === "none") {
              setSecond(undefined);
              return;
            }
            setSecond(
              event.target.value as Intl.DateTimeFormatOptions["second"]
            );
          }}
        >
          <option value="none">None</option>
          <option value="numeric">Numeric</option>
          <option value="2-digit">2-digit</option>
        </select>

        <label for="fractionalSecondDigits">Fractional Second Digits</label>
        <select
          id="fractionalSecondDigits"
          onChange={(event) => {
            if (event.target.value === "none") {
              setFractionalSecondDigits(undefined);
              return;
            }
            setFractionalSecondDigits(Number(event.target.value));
          }}
        >
          <option value="none">None</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>

        <label for="timeZoneName">Time Zone Name</label>
        <select
          id="timeZoneName"
          onChange={(event) => {
            if (event.target.value === "none") {
              setTimeZoneName(undefined);
              return;
            }
            setTimeZoneName(
              event.target.value as Intl.DateTimeFormatOptions["timeZoneName"]
            );
          }}
        >
          <option value="none">None</option>
          <option value="short">Short</option>
          <option value="long">Long</option>
          <option value="shortOffset">Short Offset</option>
          <option value="longOffset">Long Offset</option>
          <option value="shortGeneric">Short Generic</option>
          <option value="longGeneric">Long Generic</option>
        </select>

        <fieldset>
          <legend>Style Shortcuts</legend>
          <label for="dateStyle">Date Style</label>
          <select
            id="dateStyle"
            onChange={(event) => {
              if (event.target.value === "none") {
                setDateStyle(undefined);
                return;
              }
              setDateStyle(
                event.target.value as Intl.DateTimeFormatOptions["dateStyle"]
              );
            }}
          >
            <option value="none">None</option>
            <option value="full">Full</option>
            <option value="long">Long</option>
            <option value="medium">Medium</option>
            <option value="short">Short</option>
          </select>

          <label for="timeStyle">Time Style</label>
          <select
            id="timeStyle"
            onChange={(event) => {
              if (event.target.value === "none") {
                setTimeStyle(undefined);
                return;
              }
              setTimeStyle(
                event.target.value as Intl.DateTimeFormatOptions["timeStyle"]
              );
            }}
          >
            <option value="none">None</option>
            <option value="full">Full</option>
            <option value="long">Long</option>
            <option value="medium">Medium</option>
            <option value="short">Short</option>
          </select>
        </fieldset>

        <Show when={formatted()}>
          <p>{formatted()}</p>
        </Show>
        <label for="date">Date</label>
        <input
          type="date"
          id="date"
          ref={(input) => (input.valueAsDate = date())}
          onChange={(event) => setDate(new Date(event.target.value))}
        />
      </main>
    </>
  );
}

export default App;
