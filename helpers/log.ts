import { getItem } from './Storage';

/**
 * Rich logging system.
 *
 * @export
 * @class Log
 */
export class Log {
  // Misc
  public static reset = '\x1b[0m';
  public static bright = '\x1b[1m';
  public static dim = '\x1b[2m';
  public static underscore = '\x1b[4m';
  public static blink = '\x1b[5m';
  public static reverse = '\x1b[7m';
  public static hidden = '\x1b[8m';

  // Foreground
  public static fgBlack = '\x1b[30m';
  public static fgRed = '\x1b[31m';
  public static fgGreen = '\x1b[32m';
  public static fgYellow = '\x1b[33m';
  public static fgBlue = '\x1b[34m';
  public static fgMagenta = '\x1b[35m';
  public static fgCyan = '\x1b[36m';
  public static fgWhite = '\x1b[37m';

  // Background
  public static bgBlack = '\x1b[40m';
  public static bgRed = '\x1b[41m';
  public static bgGreen = '\x1b[42m';
  public static bgYellow = '\x1b[43m';
  public static bgBlue = '\x1b[44m';
  public static bgMagenta = '\x1b[45m';
  public static bgCyan = '\x1b[46m';
  public static bgWhite = '\x1b[47m';

  /**
   * Check if logging is enabled.
   *
   * @static
   * @return {*}  {Promise<boolean>}
   * @memberof Log
   */
  public static async canLog(): Promise<boolean> {
    let enabled = await getItem('LogsEnabled');

    if (enabled === 'true' || enabled === null) return true;
    return false;
  }

  /**
   * Log error message.
   *
   * @static
   * @param {*} object
   * @return {*}  {Promise<void>}
   * @memberof Log
   */
  public static Error(object: any): void {
    this.canLog().then(
      enabled =>
        enabled &&
        console.log(
          this.bgRed + this.fgWhite + ' ERROR ' + this.reset + ' ' + object,
        ),
    );
  }

  /**
   * Log warning message.
   *
   * @static
   * @param {*} object
   * @memberof Log
   */
  public static Warn(object: any): void {
    this.canLog().then(
      enabled =>
        enabled &&
        console.log(
          this.bgYellow +
            this.fgWhite +
            ' WARNING ' +
            this.reset +
            ' ' +
            object,
        ),
    );
  }

  /**
   * Log info message.
   *
   * @static
   * @param {*} object
   * @memberof Log
   */
  public static Info(object: any): void {
    this.canLog().then(
      enabled =>
        enabled &&
        console.log(
          this.bgCyan + this.fgBlack + ' INFO ' + this.reset + ' ' + object,
        ),
    );
  }

  /**
   * Log message without styling.
   *
   * @static
   * @param {*} object
   * @memberof Log
   */
  public static Clean(object: any): void {
    this.canLog().then(enabled => enabled && console.log(object));
  }

  /**
   * #### Use only when log display settings must be ignored.
   *
   * @static
   * @memberof Log
   */
  public static Ignore = {
    /**
     * Log error message.
     * #### Use only when log display settings must be ignored.
     *
     * @param {*} object
     * @return {*}  {Promise<void>}
     * @memberof Log
     */
    Error: (object: any): void =>
      console.log(
        this.bgRed + this.fgWhite + ' ERROR ' + this.reset + ' ' + object,
      ),

    /**
     * Log info message.
     * #### Use only when log display settings must be ignored.
     *
     * @param {*} object
     * @memberof Log
     */
    Info: (object: any): void =>
      console.log(
        this.bgCyan + this.fgBlack + ' INFO ' + this.reset + ' ' + object,
      ),
  };
}
