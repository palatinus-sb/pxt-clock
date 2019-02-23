enum Time {
    Hour,
    Minute
}
/**
 * Clock functions
 */
//% weight=100 color=#00cc96 icon="\uf017" block="Clock"
namespace clock {
    let toffset = 0 // in minutes, negative values
    //let tcorrector = Math.floor(input.runningTime() / 60000)
    let ampm = false
    let dtlimit = 0
    let cdstate = false
    /**
     * Get the hours or minutes
     * use the enum Time.Hour or Time.Minute
     */
    //% block
    function Clock(t: Time): number {
        /*if (Math.floor(input.runningTime() / 60000) - tcorrector >= 15) {
            tcorrector = Math.floor(input.runningTime() / 60000)
            toffset += 0.1
        }*/
        // CPU time - toffset == current time
        let time = Math.floor(input.runningTime() / 60000) + toffset
        if (time >= 24 * 60) {
            toffset -= 24 * 60
            time = Math.floor(input.runningTime() / 60000) + toffset
        }
        switch (t) {
            case Time.Hour:
                let H = Math.floor(time / 60)
                if (ampm) {
                    if (H > 12) {
                        return H - 12
                    } else if (H == 0) {
                        return 12
                    } else {
                        return H
                    }
                } else {
                    return H
                }
                break
            case Time.Minute:
                return time - Math.floor(time / 60) * 60
                break
        }
    }
    /**
     * Returns the time as a string in the format "00:00"
     */
    //% block
    export function TimeString(): string {
        let str = ""
        let H = Clock(Time.Hour)
        let M = Clock(Time.Minute)
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
        if (!(h >= 0 && h < 24 && m >= 0 && m < 60))
            return false
        // CPU time - toffset == current time
        toffset = - Math.floor(input.runningTime() / 60000) + (h * 60 + m)
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
     * Adds x hours to the time
     * if argument left empty, it will add 1
     */
    //% block
    export function AddHour(h: number = 1): void {
        toffset += h * 60
    }
    /**
     * Adds x Mins to the time
     * if argument left empty, it will add 1
     */
    //% block
    export function AddMinute(m: number = 1): void {
        toffset += m
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