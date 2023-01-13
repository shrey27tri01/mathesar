/* eslint-disable max-classes-per-file */

import { hasProperty, hasStringProperty } from '@mathesar-component-library';
import { getErrorMessage } from '@mathesar/utils/errors';

/**
 * This is our front end representation of API errors. It's almost the same as
 * the [API error response schema][1], except that here we're using `undefined`
 * where the response schema uses `null`.
 *
 * [1]: https://wiki.mathesar.org/en/engineering/standards/api
 */
interface ApiErrorData {
  message: string;
  code?: string | number;
  field?: string;
  detail?: unknown;
}

function getApiErrorCode(data: unknown): string | number | undefined {
  if (hasProperty(data, 'code')) {
    const { code } = data;
    if (typeof code === 'string' || typeof code === 'number') {
      return code;
    }
  }
  return undefined;
}

function getApiErrorData(data: unknown): ApiErrorData {
  return {
    message: getErrorMessage(data),
    code: getApiErrorCode(data),
    field: hasStringProperty(data, 'field') ? data.field : undefined,
    detail: hasProperty(data, 'detail') ? data.detail : undefined,
  };
}

export class ApiError extends Error {
  code?: string | number;

  field?: string;

  detail?: unknown;

  constructor(anything: unknown) {
    const data = getApiErrorData(anything);
    super(data.message);
    this.name = 'ApiError';
    this.code = data.code;
    this.field = data.field;
    this.detail = data.detail;
  }
}

export class ApiMultiError extends Error {
  readonly errors: ApiError[];

  constructor(anything: unknown) {
    const inputArray = Array.isArray(anything) ? anything : [anything];
    const errors = inputArray.map((d) => new ApiError(d));
    super(errors.map((e) => e.message).join(' '));
    this.name = 'ApiMultiError';
    this.errors = errors;
  }
}

/* eslint-enable max-classes-per-file */
