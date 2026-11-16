export type Role = "teacher" | "school_admin" | "platform_admin";
export interface User { id: string; role: Role; tenantIds: string[] }
export interface TenantContext { tenantId: string; source: "verified_host" | "verified_membership" | "platform_operator" }

export function assertTenantAccess(user: User, context: TenantContext): void {
  if (!context.tenantId.trim()) throw new Error("Missing verified tenant context");
  if (user.role === "platform_admin" && context.source === "platform_operator") return;
  if (!user.tenantIds.includes(context.tenantId)) throw new Error("Forbidden: tenant membership required");
}

export function tenantFilter(context: TenantContext) {
  // Apply this predicate to every tenant-owned read and write.
  return { tenantId: context.tenantId };
}
