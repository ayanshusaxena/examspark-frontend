/** Ephemeral demo attempt state; it intentionally resets after a page refresh. */
export const demoSession: { selectedExamId: number; latestSubmission: Record<number, number> } = {
  selectedExamId: 1,
  latestSubmission: {},
};
