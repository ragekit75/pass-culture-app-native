/// <reference path="./custom.d.ts" />
// tslint:disable
/**
 * Service API Document
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 0.1
 *
 *
 * NOTE: This file is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the file manually.
 */

import * as url from 'url'
import * as portableFetch from 'portable-fetch'
import { Configuration } from './configuration'

const BASE_PATH = '/'.replace(/\/+$/, '')

/**
 *
 * @export
 */
export const COLLECTION_FORMATS = {
  csv: ',',
  ssv: ' ',
  tsv: '\t',
  pipes: '|',
}

/**
 *
 * @export
 * @interface FetchAPI
 */
export interface FetchAPI {
  (url: string, init?: any): Promise<Response>
}

/**
 *
 * @export
 * @interface FetchArgs
 */
export interface FetchArgs {
  url: string
  options: any
}

/**
 *
 * @export
 * @class BaseAPI
 */
export class BaseAPI {
  protected configuration: Configuration

  constructor(
    configuration?: Configuration,
    protected basePath: string = BASE_PATH,
    protected fetch: FetchAPI = portableFetch
  ) {
    if (configuration) {
      this.configuration = configuration
      this.basePath = configuration.basePath || this.basePath
    }
  }
}

/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export class RequiredError extends Error {
  name: 'RequiredError'
  constructor(public field: string, msg?: string) {
    super(msg)
  }
}

/**
 *
 * @export
 * @interface PasswordResetRequestRequest
 */
export interface PasswordResetRequestRequest {
  /**
   *
   * @type {string}
   * @memberof PasswordResetRequestRequest
   */
  email: string
}
/**
 *
 * @export
 * @interface RefreshResponse
 */
export interface RefreshResponse {
  /**
   *
   * @type {string}
   * @memberof RefreshResponse
   */
  access_token: string
}
/**
 *
 * @export
 * @interface ResetPasswordRequest
 */
export interface ResetPasswordRequest {
  /**
   *
   * @type {string}
   * @memberof ResetPasswordRequest
   */
  new_password: string
  /**
   *
   * @type {string}
   * @memberof ResetPasswordRequest
   */
  reset_password_token: string
}
/**
 *
 * @export
 * @interface SigninRequest
 */
export interface SigninRequest {
  /**
   *
   * @type {string}
   * @memberof SigninRequest
   */
  identifier: string
  /**
   *
   * @type {string}
   * @memberof SigninRequest
   */
  password: string
}
/**
 *
 * @export
 * @interface SigninResponse
 */
export interface SigninResponse {
  /**
   *
   * @type {string}
   * @memberof SigninResponse
   */
  access_token: string
  /**
   *
   * @type {string}
   * @memberof SigninResponse
   */
  refresh_token: string
}
/**
 * DefaultApi - fetch parameter creator
 * @export
 */
export const DefaultApiFetchParamCreator = function (configuration?: Configuration) {
  return {
    /**
     *
     * @summary refresh <POST>
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    nativeV1RefreshAccessTokenPost(options: any = {}): FetchArgs {
      const localVarPath = `/native/v1/refresh_access_token`
      const localVarUrlObj = url.parse(localVarPath, true)
      const localVarRequestOptions = Object.assign({ method: 'POST' }, options)
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any

      localVarUrlObj.query = Object.assign(
        {},
        localVarUrlObj.query,
        localVarQueryParameter,
        options.query
      )
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers)

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      }
    },
    /**
     *
     * @summary password_reset_request <POST>
     * @param {PasswordResetRequestRequest} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    nativeV1RequestPasswordResetPost(
      body?: PasswordResetRequestRequest,
      options: any = {}
    ): FetchArgs {
      const localVarPath = `/native/v1/request_password_reset`
      const localVarUrlObj = url.parse(localVarPath, true)
      const localVarRequestOptions = Object.assign({ method: 'POST' }, options)
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any

      localVarHeaderParameter['Content-Type'] = 'application/json'

      localVarUrlObj.query = Object.assign(
        {},
        localVarUrlObj.query,
        localVarQueryParameter,
        options.query
      )
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers)
      const needsSerialization =
        <any>'PasswordResetRequestRequest' !== 'string' ||
        localVarRequestOptions.headers['Content-Type'] === 'application/json'
      localVarRequestOptions.body = needsSerialization ? JSON.stringify(body || {}) : body || ''

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      }
    },
    /**
     *
     * @summary reset_password <POST>
     * @param {ResetPasswordRequest} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    nativeV1ResetPasswordPost(body?: ResetPasswordRequest, options: any = {}): FetchArgs {
      const localVarPath = `/native/v1/reset_password`
      const localVarUrlObj = url.parse(localVarPath, true)
      const localVarRequestOptions = Object.assign({ method: 'POST' }, options)
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any

      localVarHeaderParameter['Content-Type'] = 'application/json'

      localVarUrlObj.query = Object.assign(
        {},
        localVarUrlObj.query,
        localVarQueryParameter,
        options.query
      )
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers)
      const needsSerialization =
        <any>'ResetPasswordRequest' !== 'string' ||
        localVarRequestOptions.headers['Content-Type'] === 'application/json'
      localVarRequestOptions.body = needsSerialization ? JSON.stringify(body || {}) : body || ''

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      }
    },
    /**
     *
     * @summary signin <POST>
     * @param {SigninRequest} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    nativeV1SigninPost(body?: SigninRequest, options: any = {}): FetchArgs {
      const localVarPath = `/native/v1/signin`
      const localVarUrlObj = url.parse(localVarPath, true)
      const localVarRequestOptions = Object.assign({ method: 'POST' }, options)
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any

      localVarHeaderParameter['Content-Type'] = 'application/json'

      localVarUrlObj.query = Object.assign(
        {},
        localVarUrlObj.query,
        localVarQueryParameter,
        options.query
      )
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers)
      const needsSerialization =
        <any>'SigninRequest' !== 'string' ||
        localVarRequestOptions.headers['Content-Type'] === 'application/json'
      localVarRequestOptions.body = needsSerialization ? JSON.stringify(body || {}) : body || ''

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      }
    },
  }
}

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function (configuration?: Configuration) {
  return {
    /**
     *
     * @summary refresh <POST>
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    nativeV1RefreshAccessTokenPost(
      options?: any
    ): (fetch?: FetchAPI, basePath?: string) => Promise<RefreshResponse> {
      const localVarFetchArgs = DefaultApiFetchParamCreator(
        configuration
      ).nativeV1RefreshAccessTokenPost(options)
      return (fetch: FetchAPI = portableFetch, basePath: string = BASE_PATH) => {
        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
          (response) => {
            if (response.status >= 200 && response.status < 300) {
              return response.json()
            } else {
              throw response
            }
          }
        )
      }
    },
    /**
     *
     * @summary password_reset_request <POST>
     * @param {PasswordResetRequestRequest} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    nativeV1RequestPasswordResetPost(
      body?: PasswordResetRequestRequest,
      options?: any
    ): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = DefaultApiFetchParamCreator(
        configuration
      ).nativeV1RequestPasswordResetPost(body, options)
      return (fetch: FetchAPI = portableFetch, basePath: string = BASE_PATH) => {
        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
          (response) => {
            if (response.status >= 200 && response.status < 300) {
              return response
            } else {
              throw response
            }
          }
        )
      }
    },
    /**
     *
     * @summary reset_password <POST>
     * @param {ResetPasswordRequest} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    nativeV1ResetPasswordPost(
      body?: ResetPasswordRequest,
      options?: any
    ): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = DefaultApiFetchParamCreator(
        configuration
      ).nativeV1ResetPasswordPost(body, options)
      return (fetch: FetchAPI = portableFetch, basePath: string = BASE_PATH) => {
        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
          (response) => {
            if (response.status >= 200 && response.status < 300) {
              return response
            } else {
              throw response
            }
          }
        )
      }
    },
    /**
     *
     * @summary signin <POST>
     * @param {SigninRequest} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    nativeV1SigninPost(
      body?: SigninRequest,
      options?: any
    ): (fetch?: FetchAPI, basePath?: string) => Promise<SigninResponse> {
      const localVarFetchArgs = DefaultApiFetchParamCreator(configuration).nativeV1SigninPost(
        body,
        options
      )
      return (fetch: FetchAPI = portableFetch, basePath: string = BASE_PATH) => {
        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then(
          (response) => {
            if (response.status >= 200 && response.status < 300) {
              return response.json()
            } else {
              throw response
            }
          }
        )
      }
    },
  }
}

/**
 * DefaultApi - factory interface
 * @export
 */
export const DefaultApiFactory = function (
  configuration?: Configuration,
  fetch?: FetchAPI,
  basePath?: string
) {
  return {
    /**
     *
     * @summary refresh <POST>
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    nativeV1RefreshAccessTokenPost(options?: any) {
      return DefaultApiFp(configuration).nativeV1RefreshAccessTokenPost(options)(fetch, basePath)
    },
    /**
     *
     * @summary password_reset_request <POST>
     * @param {PasswordResetRequestRequest} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    nativeV1RequestPasswordResetPost(body?: PasswordResetRequestRequest, options?: any) {
      return DefaultApiFp(configuration).nativeV1RequestPasswordResetPost(body, options)(
        fetch,
        basePath
      )
    },
    /**
     *
     * @summary reset_password <POST>
     * @param {ResetPasswordRequest} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    nativeV1ResetPasswordPost(body?: ResetPasswordRequest, options?: any) {
      return DefaultApiFp(configuration).nativeV1ResetPasswordPost(body, options)(fetch, basePath)
    },
    /**
     *
     * @summary signin <POST>
     * @param {SigninRequest} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    nativeV1SigninPost(body?: SigninRequest, options?: any) {
      return DefaultApiFp(configuration).nativeV1SigninPost(body, options)(fetch, basePath)
    },
  }
}

/**
 * DefaultApi - interface
 * @export
 * @interface DefaultApi
 */
export interface DefaultApiInterface {
  /**
   *
   * @summary refresh <POST>
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApiInterface
   */
  nativeV1RefreshAccessTokenPost(options?: any): Promise<RefreshResponse>

  /**
   *
   * @summary password_reset_request <POST>
   * @param {PasswordResetRequestRequest} [body]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApiInterface
   */
  nativeV1RequestPasswordResetPost(body?: PasswordResetRequestRequest, options?: any): Promise<{}>

  /**
   *
   * @summary reset_password <POST>
   * @param {ResetPasswordRequest} [body]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApiInterface
   */
  nativeV1ResetPasswordPost(body?: ResetPasswordRequest, options?: any): Promise<{}>

  /**
   *
   * @summary signin <POST>
   * @param {SigninRequest} [body]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApiInterface
   */
  nativeV1SigninPost(body?: SigninRequest, options?: any): Promise<SigninResponse>
}

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI implements DefaultApiInterface {
  /**
   *
   * @summary refresh <POST>
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  public nativeV1RefreshAccessTokenPost(options?: any) {
    return DefaultApiFp(this.configuration).nativeV1RefreshAccessTokenPost(options)(
      this.fetch,
      this.basePath
    )
  }

  /**
   *
   * @summary password_reset_request <POST>
   * @param {PasswordResetRequestRequest} [body]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  public nativeV1RequestPasswordResetPost(body?: PasswordResetRequestRequest, options?: any) {
    return DefaultApiFp(this.configuration).nativeV1RequestPasswordResetPost(body, options)(
      this.fetch,
      this.basePath
    )
  }

  /**
   *
   * @summary reset_password <POST>
   * @param {ResetPasswordRequest} [body]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  public nativeV1ResetPasswordPost(body?: ResetPasswordRequest, options?: any) {
    return DefaultApiFp(this.configuration).nativeV1ResetPasswordPost(body, options)(
      this.fetch,
      this.basePath
    )
  }

  /**
   *
   * @summary signin <POST>
   * @param {SigninRequest} [body]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  public nativeV1SigninPost(body?: SigninRequest, options?: any) {
    return DefaultApiFp(this.configuration).nativeV1SigninPost(body, options)(
      this.fetch,
      this.basePath
    )
  }
}
