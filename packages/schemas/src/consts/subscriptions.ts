/**
 * Logto-provided predefined subscription plan IDs.
 *
 * In theory, the subscription plan ID will be a random string,
 * but Logto provides some predefined subscription plans and their IDs are reserved plan IDs.
 */
export enum ReservedPlanId {
  Free = 'free',
  Pro = 'pro',
  Development = 'dev',
  /**
   * This plan ID is reserved for Admin tenant.
   * In our new pricing model, we plan to add a special plan for Admin tenant, previously, admin tenant is using the `pro` plan, which is not suitable.
   */
  Admin = 'admin',
}
