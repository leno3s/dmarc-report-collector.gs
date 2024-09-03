/**
 * Set main triggers.
 */
export function setTrigger() {
  ScriptApp.newTrigger("main")
    .timeBased()
    .everyDays(1)
    .atHour(0)
    .nearMinute(0)
    .create();
}

/**
 * Remove all triggers.
 */
export function removeTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  for (const t of triggers) {
    ScriptApp.deleteTrigger(t);
  }
}
