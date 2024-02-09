// Coded by Gilad Peleg (https://github.com/pgilad/react-page-visibility)

const hasDocument: boolean = typeof document !== 'undefined';
const vendorEvents = [
  {
    hidden: 'hidden',
    event: 'visibilitychange',
    state: 'visibilityState',
  },
  {
    hidden: 'webkitHidden',
    event: 'webkitvisibilitychange',
    state: 'webkitVisibilityState',
  },
  {
    hidden: 'mozHidden',
    event: 'mozvisibilitychange',
    state: 'mozVisibilityState',
  },
  {
    hidden: 'msHidden',
    event: 'msvisibilitychange',
    state: 'msVisibilityState',
  },
  {
    hidden: 'oHidden',
    event: 'ovisibilitychange',
    state: 'oVisibilityState',
  },
];

export const isSupported: boolean = hasDocument && Boolean(document.addEventListener);

export const visibility = (() => {
  if (!isSupported) {
    return null;
  }
  return vendorEvents.find(e => e.hidden in document) ?? null;
})();

export const getPageVisibleHandlerArgs = () => {
  if (!visibility) {
    return [true, 'visible'];
  }
  const { hidden, state } = visibility;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return [!(document as any)[hidden] as boolean, (document as any)[state] as string];
};
