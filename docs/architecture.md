# Architecture Notes

This is an independent case study of common patterns for a multi-tenant school administration platform. It intentionally excludes production infrastructure, customer configurations, and proprietary implementation details.

## Tenant isolation

A tenant represents one school. Each authenticated request should carry a server-verified tenant context, resolved from a verified hostname or the user's verified membership. A client-supplied tenant ID is not proof of access.

## Request lifecycle

1. Resolve the incoming host to an active tenant.
2. Authenticate the user.
3. Confirm membership in the active tenant.
4. Check the role and permission required for the operation.
5. Pass tenant context into the service layer.
6. Scope every read and write to that tenant.
7. Record privileged changes without exposing learner data in logs.

## Authorization

Role checks do not replace tenant membership checks. A school administrator in one tenant must not gain access to another school's records simply because both accounts share the same role.

## Academic reporting

Grade calculations should be explicit, validated, and associated with the grading policy used for the reporting period. The example in `examples/grade-calculation.ts` accepts configurable assessment weights. Production grading rules should be configurable and approved by authorized school administrators.

## Provisioning lifecycle

Represent onboarding as explicit states such as requested, verifying, provisioning, active, and failed. Make retries observable and idempotent so a repeated step does not create duplicate tenant resources.

## Security checklist

- Enforce tenant scope in service and data-access layers.
- Use parameterized database queries.
- Authorize every server-side operation.
- Avoid exposing learner records in URLs, logs, or analytics.
- Use short-lived, scoped report-download links.
- Keep uploaded documents in private storage and authorize downloads.
- Audit privileged changes to school configuration and academic records.
