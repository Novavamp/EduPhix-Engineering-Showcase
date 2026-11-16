export type Status = "requested" | "verifying" | "provisioning" | "active" | "failed";
const allowed: Record<Status, Status[]> = {
  requested: ["verifying", "failed"],
  verifying: ["provisioning", "failed"],
  provisioning: ["active", "failed"],
  active: [],
  failed: ["verifying"],
};

export interface ProvisioningRecord {
  id: string;
  schoolName: string;
  status: Status;
  updatedAt: Date;
}

export function transition(record: ProvisioningRecord, next: Status): ProvisioningRecord {
  if (!allowed[record.status].includes(next)) {
    throw new Error(`Invalid provisioning transition: ${record.status} -> ${next}`);
  }
  return { ...record, status: next, updatedAt: new Date() };
}
