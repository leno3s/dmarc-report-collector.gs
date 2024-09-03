/**
 * This project is managed at GitHub.
 *   https://github.com/leno3s/dmarc-report-collector.gs
 * 
 * If you find any bugs, please report them here.
 *   https://github.com/leno3s/dmarc-report-collector.gs/issues
 */

/**
 * Setup to use:
 * 
 * 1. Configure timezone from project settings page if you want.
 * 
 * 2. Configure 001_config.gs
 *   - Address that receiving DMARC reports.
 *   - Output spreadsheet id.
 *   - Output sheet name.
 * 
 * 3. Execute `setTrigger()` in 002_trigger.gs
 *   Note: This step is must be done in the DMARC Report recipient's account. 
 */