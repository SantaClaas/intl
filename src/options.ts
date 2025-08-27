type DateTimeOptionKeys = keyof Intl.DateTimeFormatOptions;

type DateTimeOptionValues = {
  [K in DateTimeOptionKeys]: {
    options: Array<Intl.DateTimeFormatOptions[K]>;
    selected: Intl.DateTimeFormatOptions[K];
  };
};

export const VARIABLE_OPTION = {
  CALENDAR: "calendar",
  NUMBERING_SYSTEM: "numberingSystem",
  TIME_ZONE: "timeZone",
};

type VariableOptions = (typeof VARIABLE_OPTION)[keyof typeof VARIABLE_OPTION];
export const VARIABLE_OPTIONS = Object.values(
  VARIABLE_OPTION
) as VariableOptions[];
export const defauts = Intl.DateTimeFormat().resolvedOptions();

export default {
  calendar: {
    options: [undefined, ...Intl.supportedValuesOf("calendar")],
    selected: defauts.calendar,
  },
  dateStyle: {
    options: [undefined, "full", "long", "medium", "short"],
    selected: defauts.dateStyle,
  },
  day: {
    options: [undefined, "numeric", "2-digit"],
    selected: defauts.day as Intl.DateTimeFormatOptions["day"],
  },
  dayPeriod: {
    options: [undefined, "narrow", "short", "long"],
    selected: defauts.dayPeriod,
  },
  era: {
    options: [undefined, "narrow", "short", "long"],
    selected: defauts.era as Intl.DateTimeFormatOptions["era"],
  },
  formatMatcher: {
    options: [undefined, "best fit", "basic"],
    selected: defauts.formatMatcher,
  },
  hour: {
    options: [undefined, "numeric", "2-digit"],
    selected: defauts.hour as Intl.DateTimeFormatOptions["hour"],
  },
  hour12: {
    options: [undefined, true, false],
    selected: defauts.hour12,
  },
  hourCycle: {
    options: [undefined, "h11", "h12", "h23", "h24"],
    selected: defauts.hourCycle,
  },
  localeMatcher: {
    options: [undefined, "best fit", "lookup"],
    selected: undefined,
  },
  minute: {
    options: [undefined, "numeric", "2-digit"],
    selected: defauts.minute as Intl.DateTimeFormatOptions["minute"],
  },
  month: {
    options: [undefined, "numeric", "2-digit", "narrow", "short", "long"],
    selected: defauts.month as Intl.DateTimeFormatOptions["month"],
  },

  numberingSystem: {
    options: [undefined, ...Intl.supportedValuesOf("numberingSystem")],
    selected: defauts.numberingSystem,
  },
  second: {
    options: [undefined, "numeric", "2-digit"],
    selected: defauts.second as Intl.DateTimeFormatOptions["second"],
  },
  timeStyle: {
    options: [undefined, "full", "long", "medium", "short"],
    selected: defauts.timeStyle,
  },
  timeZone: {
    options: [undefined, ...Intl.supportedValuesOf("timeZone")],
    selected: defauts.timeZone,
  },
  timeZoneName: {
    options: [
      undefined,
      "short",
      "long",
      "shortOffset",
      "longOffset",
      "shortGeneric",
      "longGeneric",
    ],
    selected:
      defauts.timeZoneName as Intl.DateTimeFormatOptions["timeZoneName"],
  },
  weekday: {
    options: [undefined, "narrow", "short", "long"],
    selected: defauts.weekday as Intl.DateTimeFormatOptions["weekday"],
  },
  year: {
    options: [undefined, "numeric", "2-digit"],
    selected: defauts.year as Intl.DateTimeFormatOptions["year"],
  },
  fractionalSecondDigits: {
    options: [undefined, 1, 2, 3],
    selected: defauts.fractionalSecondDigits,
  },
} satisfies DateTimeOptionValues;
