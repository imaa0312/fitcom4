export type BranchFlags = {
  useTeamRoles: boolean; // pakai label "Ketua Tim"/"Anggota", simpan teamRole LEADER/MEMBER
  hasRobotName: boolean; // tampilkan & simpan field robotName
};

const DEFAULT_FLAGS: BranchFlags = {
  useTeamRoles: false,
  hasRobotName: false,
};

export const BRANCH_FLAGS: Record<string, BranchFlags> = {
  "sumo-bot-rc-1kg": { useTeamRoles: true, hasRobotName: true },
};

export function getBranchFlags(slug: string): BranchFlags {
  return BRANCH_FLAGS[slug] ?? DEFAULT_FLAGS;
}
