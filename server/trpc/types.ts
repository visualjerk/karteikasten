import type { router } from '.'
import type {
  inferProcedureOutput,
  inferProcedureInput,
  inferSubscriptionOutput,
} from '@trpc/server'

export type AppRouter = typeof router

/**
 * Enum containing all api query paths
 */
export type TQuery = keyof AppRouter['_def']['queries']

/**
 * Enum containing all api mutation paths
 */
export type TMutation = keyof AppRouter['_def']['mutations']

/**
 * Enum containing all api subscription paths
 */
export type TSubscription = keyof AppRouter['_def']['subscriptions']

/**
 * This is a helper method to infer the output of a query resolver
 * @example type HelloOutput = InferQueryOutput<'hello'>
 */
export type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<
  AppRouter['_def']['queries'][TRouteKey]
>

/**
 * This is a helper method to infer the input of a query resolver
 * @example type HelloInput = InferQueryInput<'hello'>
 */
export type InferQueryInput<TRouteKey extends TQuery> = inferProcedureInput<
  AppRouter['_def']['queries'][TRouteKey]
>

/**
 * This is a helper method to infer the output of a mutation resolver
 * @example type HelloOutput = InferMutationOutput<'hello'>
 */
export type InferMutationOutput<TRouteKey extends TMutation> =
  inferProcedureOutput<AppRouter['_def']['mutations'][TRouteKey]>

/**
 * This is a helper method to infer the input of a mutation resolver
 * @example type HelloInput = InferMutationInput<'hello'>
 */
export type InferMutationInput<TRouteKey extends TMutation> =
  inferProcedureInput<AppRouter['_def']['mutations'][TRouteKey]>

/**
 * This is a helper method to infer the output of a subscription resolver
 * @example type HelloOutput = InferSubscriptionOutput<'hello'>
 */
export type InferSubscriptionOutput<TRouteKey extends TSubscription> =
  inferProcedureOutput<AppRouter['_def']['subscriptions'][TRouteKey]>

/**
 * This is a helper method to infer the asynchronous output of a subscription resolver
 * @example type HelloAsyncOutput = InferAsyncSubscriptionOutput<'hello'>
 */
export type InferAsyncSubscriptionOutput<TRouteKey extends TSubscription> =
  inferSubscriptionOutput<AppRouter, TRouteKey>

/**
 * This is a helper method to infer the input of a subscription resolver
 * @example type HelloInput = InferSubscriptionInput<'hello'>
 */
export type InferSubscriptionInput<TRouteKey extends TSubscription> =
  inferProcedureInput<AppRouter['_def']['subscriptions'][TRouteKey]>

export type Box = InferQueryOutput<'boxes.get'>
export type Card = Box['cards'][0]

export type NewBox = InferMutationInput<'boxes.create'>
export type NewCard = NewBox['cards'][0]

export type UpdateBox = InferMutationInput<'boxes.update'>

export type EditBox = NewBox | UpdateBox
