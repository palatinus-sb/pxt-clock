enum Time {
    Hour,
    Minute,
    Second
}
enum TimeFormat {
    hhmm,
    hhmmss
}
/**
 * Clock functions
 */
//% weight=100 color=#00cc96 icon="\uf017" block="Clock"
namespace clock {
    let toffset = 0
    //let tcorrector = Math.floor(input.runningTime() / 1000)
    let ampm = false
    let dtlimit = 0
    let cdstate = false
    /**
     * Returns the Hours, Minutes, or Seconds of the time
     * needs 1 enum Time parameter
     */
    //% block
    export function getTime(t: Time): number {
        /*if (Math.floor(input.runningTime() / 1000) - tcorrector >= 900) {
            tcorrector = Math.floor(input.runningTime() / 1000)
            toffset += 5
        }*/
        let time = Math.floor(input.runningTime() / 1000) + toffset
        if (time >= 24 * 60 * 60) {
            toffset -= 24 * 60 * 60
            time = Math.floor(input.runningTime() / 1000) + toffset
        }
        switch (t) {
            case Time.Hour:
                if (ampm) {
                    let H = Math.floor(time / 3600)
                    if (H > 12) {
                        return H - 12
                    } else if (H == 0) {
                        return 12
                    } else {
                        return H
                    }
                } else {
                    return Math.floor(time / 3600)
                }
                break
            case Time.Minute:
                return Math.floor((time - Math.floor(time / 3600) * 3600) / 60)
                break
            case Time.Second:
                return (Math.floor(time - Math.floor(time / 3600) * 3600
                    - Math.floor((time - Math.floor(time / 3600) * 3600) / 60) * 60))
                break
        }
    }
    /**
     * Returns the time as a string in the format "00:00"
     */
    //% block
    export function TimeString(f: TimeFormat): string {
        let str = ""
        let H = getTime(Time.Hour)
        let M = getTime(Time.Minute)
        if (f == TimeFormat.hhmmss) {
            let S = getTime(Time.Second)
            if (S < 10) {
                str = ":0" + S
            } else {
                str = ":" + S
            }
        }
        if (M < 10) {
            str = ":0" + M + str
        } else {
            str = ":" + M + str
        }
        if (ampm && H > 12) {
            H -= 12
        } else if (ampm && H == 0) {
            H = 12
        }
        if (H < 10) {
            str = "0" + H + str
        } else {
            str = "" + H + str
        }
        return str
    }
    /**
     * Sets the time to a specific value 
     * eg: 11, 54, 23 is 11:54:23
     * ignores invalid time
     */
    //% block
    export function SetTime(h: number, m: number, s: number = 0): boolean {
        if (!(h >= 0 && h < 24 && m >= 0 && m < 60 && s >= 0 && s < 60))
            return false
        //subtract 1 day from CPU clock, then add the actual time back
        toffset = - Math.floor(input.runningTime() / 1000) + (h * 3600 + m * 60 + s)
        return true
    }
    /**
     * Enables or disables the 12 hour clock
     */
    //% block
    export function EnableAmPm(value: boolean): void {
        ampm = value
    }
    /**
     * Returns true if the 12 hour clock is enabled,
     * otherwise false
     */
    //% block
    export function GetAmPm(): boolean {
        return ampm
    }
    /**
     * Starts the countdown of x Secs
     */
    //% block
    //% advanced=true
    export function StartCountDown(Secs: number): void {
        dtlimit = input.runningTime() + Secs * 1000
        cdstate = true
    }
    /**
     * Stops and resets the countdown
     */
    //% block
    //% advanced=true
    export function StopCountDown(): void {
        cdstate = false
        let dtlimit: number
    }
    /**
     * Returns true if cd is initiated, otherwise false
     */
    //% block
    //% advanced=true
    export function CountDownState(): boolean {
        return cdstate
    }
    /**
     * Returns the remaining time in Secs
     * e.g. 01:12 -> 72 Secs
     */
    //% block
    //% advanced=true
    export function getRemainingTime(): number {
        let rt = Math.floor((dtlimit - input.runningTime()) / 1000)
        if (cdstate && rt > 0) {
            return rt
        } else return 0
    }
    /**
     * Only returns the Mins of the remaining time
     * e.g. 01:12 -> 1 Min
     */
    //% block
    //% advanced=true
    export function getRemainingMinute(): number {
        if (cdstate && getRemainingTime() > 0) {
            return Math.floor(Math.floor((dtlimit - input.runningTime()) / 1000) / 60)
        } else return 0
    }
    /**
     * Only returns the Secs of the remaining time
     * e.g. 01:12 -> 12 Secs
     */
    //% block
    //% advanced=true
    export function getRemainingSecond(): number {
        if (cdstate && getRemainingTime() > 0) {
            return Math.floor((dtlimit - input.runningTime()) / 1000) - getRemainingMinute() * 60
        } else return 0
    }
}