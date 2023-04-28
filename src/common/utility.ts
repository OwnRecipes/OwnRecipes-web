import * as _ from 'lodash-es';
import { IntlShape } from 'react-intl';

import env, { EnvType } from '../env';

export function copyToClipboard(text: string): boolean {
  // Code by Greg Lowe, https://stackoverflow.com/a/33928558

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anyWindow: any = window;
  if (anyWindow.clipboardData && anyWindow.clipboardData.setData) {
    // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
    return anyWindow.clipboardData.setData('Text', text);
  } else  if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
    const textarea = document.createElement('textarea');
    textarea.textContent = text;
    textarea.style.position = 'fixed';  // Prevent scrolling to bottom of page in Microsoft Edge.
    document.body.appendChild(textarea);

    textarea.select();
    textarea.setSelectionRange(0, 99999);

    try {
      return document.execCommand('copy'); // Security exception may be thrown by some browsers.
    } catch (ex) {
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  }

  // eslint-disable-next-line no-console
  console.error('Copy to clipboard failed. The browser does not support any of the implemented methods.');
  return false;
}

export function isDemoMode(): boolean {
  return getEnvAsBoolean('REACT_APP_DEMO', false);
}

export function getRecipeImagePlaceholder(): string {
  return './images/fried-eggs.jpg';
}

export function getRecipeImage(photoThumbnail: string | undefined, loadingError = false) {
  return !loadingError ? (photoThumbnail ?? '') : getRecipeImagePlaceholder();
}

export function getResourcePath(path: string): string {
  const res = `.${path}`;
  return res;
}

export function getRoutePath(path: string): string {
  return path;
}

export function getEnv(key: keyof EnvType, ifNull?: string): string | undefined {
  return env[key] ?? ifNull;
}

export function getEnvAsBoolean(key: keyof EnvType, ifNull = false): boolean {
  const val = getEnv(key);
  if (val == null) return ifNull;
  const valLowerCase = val.toLocaleLowerCase();
  return ['true', 'y', 'yes', '1'].includes(valLowerCase);
}

export function requireEnv(key: keyof EnvType): string {
  const val = getEnv(key);
  if (val == null || val.length === 0) {
    throw new Error(`Invalid setup: The .env-variable "${key}" is missing. Please check your .env-files and rebuild.`);
  }
  return val;
}

export function isNumber(str: string): boolean {
  if (typeof str !== 'string') return false; // we only process strings!
  const strTimmed = str.trim();
  if (strTimmed.endsWith('.') || strTimmed.endsWith(',')) return false;
  // eslint-disable-next-line no-restricted-globals
  return !isNaN(str as unknown as number) && !isNaN(parseFloat(str));
}

export function toNumberDefault(val: string | undefined, defIfNull: number): number {
  if (val == null) return defIfNull;

  try {
    const parsedVal = parseInt(val);
    if (Number.isNaN(parsedVal)) {
      return defIfNull;
    }
    return parsedVal;
  } catch (_err) {
    return defIfNull;
  }
}

export function objToSearchString(params: Record<string, string | number | boolean | undefined>): string {
  const paramsStrings: Record<string, string> = {};
  Object.keys(params).forEach(key => {
    if (params[key] != null) {
      paramsStrings[key] = String(params[key]);
    }
  });
  const paramss = new URLSearchParams(paramsStrings);
  paramss.sort();
  return paramss.toString();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function updateFormData(prev: any, id: string, newValue: unknown): any {
  const updFormData = _.cloneDeep(prev);
  _.set(updFormData, id, newValue);
  return updFormData;
}

export function optionallyFormatMessage(intl: IntlShape, baseMessageId: string, msgId: string, values?: Record<string, React.ReactNode>): string {
  const fullMsgId = `${baseMessageId}${msgId}`;
  const msg = intl.messages[fullMsgId];

  if (msg == null) {
    return msgId;
  } else if (msg.length === 0) {
    return '';
  } else {
    // HACK: Ignore locales generator.
    return (intl as IntlShape).formatMessage({ id: fullMsgId }, values) as string;
  }
}

export function scrollToElement(element: Element, offset: number) {
  function getElementOffset(elementt: Element) {
    if (elementt?.getBoundingClientRect == null) {
      // All current browsers and even IE11 should implement this, but you never know.
      // eslint-disable-next-line no-console
      console.warn('Attempted to query getBoundingClientRect, but element does not provide this function.');
      return undefined;
    }

    return elementt.getBoundingClientRect().top + window.scrollY;
  }

  const elementOffset = getElementOffset(element);
  if (elementOffset == null) return;
  const offsetPosition = elementOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
}

export function slugify(title: string): string {
  return (title.replace(/ /g, '-').replace(/\./g, '') || '').toLocaleLowerCase();
}

export function sortByLabel(a: { label: string }, b: { label: string}): number {
  return a.label.localeCompare(b.label);
}
