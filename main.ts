/**
 * Clock functions
 */
//% weight=100 color=#00cc96 icon="\uf017" block="Clock"
namespace clock {
    let toffset = 0
    let tcorrector = input.runningTime()
    let Hour = 0
    let Min = 0
    let Sec = 0
    let ampm = false
    let dtlimit = 0
    let cd = false
    /**
     * Returns the time as a string in the format "00:00"
     */
    //% block
    export function Time(): string {
        let str = ""
        Clock()
        if (Min < 10) {
            str = "0" + Min
        } else {
            str = "" + Min
        }
        if (Hour < 10) {
            str = "0" + Hour + ":" + str
        } else {
            str = "" + Hour + ":" + str
        }
        return str
    }
    /**
     * Only returns the hours of the time
     */
    //% block
    export function getHour(): number {
        Clock()
        return Hour
    }
    /**
     * Only returns the minutes of the time
     */
    //% block
    export function getMinute(): number {
        Clock()
        return Min
    }
    /**
     * Only returns the seconds of the time
     */
    //% block
    export function getSecond(): number {
        Clock()
        return Sec
    }
    /**
     * Returns the time in Seconds
     */
    //% block
    export function getTimeInSeconds(): number {
        Clock()
        return Math.floor(input.runningTime() / 1000) + toffset
    }
    /**
     * Sets the time to a specific value 
     * eg: 11, 54, 23 is 11:54:23
     * ignores invalid time
     */
    //% block
    export function SetTime(h: number, m: number, s: number = 0): void {
        Clock()
        let time = Math.floor(input.runningTime() / 1000) + toffset
        Hour = Math.floor(time / 3600)
        Min = Math.floor((time - Hour * 3600) / 60)
        Sec = time - Hour * 3600 - Min * 60
        if (!(h >= 0 && h < 24 && m >= 0 && m < 60 && s >= 0 && s < 60)) {
            return
        }
        toffset -= (Hour - h) * 3600
        toffset -= (Min - m) * 60
        toffset -= (Sec - s)
        Clock()
    }
    /**
     * Enables or disables the 12 hour clock
     */
    //% block
    export function EnableAmPm(value: boolean) {
        ampm = value
    }
    function Clock(): void {
        if (input.runningTime() - tcorrector >= 3600000) {
            tcorrector = input.runningTime()
            toffset += 24
        }
        let time = Math.floor(input.runningTime() / 1000) + toffset
        if (ampm) {
            if (time >= 12 * 60 * 60) {
                toffset -= 24 * 60 * 60
            }
        } else {
            if (time >= 24 * 60 * 60) {
                toffset -= 24 * 60 * 60
            }
        }
        time = Math.floor(input.runningTime() / 1000) + toffset
        Hour = Math.floor(time / 3600)
        Min = Math.floor((time - Hour * 3600) / 60)
        Sec = time - Hour * 3600 - Min * 60
    }
    /**
     * Adds x hours to the time
     * if argument left empty, it will add 1
     */
    //% block
    export function AddHour(hour: number = 1): void {
        toffset += hour * 3600
        Clock()
    }
    /**
     * Adds x Mins to the time
     * if argument left empty, it will add 1
     */
    //% block
    export function AddMinute(Min: number = 1): void {
        toffset += Min * 60
        Clock()
    }
	/**
     * Adds x Secs to the time
     * if argument left empty, it will add 1
     */
    //% block
    export function AddSecond(Sec: number = 1): void {
        toffset += Sec
        Clock()
    }
    /**
     * Starts the cd of x Secs
     */
    //% block
    //% advanced=true
    export function StartCountDown(Secs: number): void {
        dtlimit = input.runningTime() + Secs * 1000
        cd = true
    }
    /**
     * Stops the cd
     */
    //% block
    //% advanced=true
    export function StopCountDown(): void {
        cd = false
        let dtlimit: number
    }
    /**
     * Returns true if cd is initiated, otherwise false
     */
    //% block
    //% advanced=true
    export function CountDownState(): boolean {
        return cd
    }
    /**
     * Returns the remaining time as a string in the format "00:00"
     */
    //% block
    //% advanced=true
    export function DownTime(): string {
        let str = ""
        if (getRemainingSecond() < 10) {
            str = "0" + getRemainingSecond()
        } else {
            str = "" + getRemainingSecond()
        }
        if (getRemainingMinute() < 10) {
            str = "0" + getRemainingMinute() + ":" + str
        } else {
            str = "" + getRemainingMinute() + ":" + str
        }
        return str
    }
    /**
     * Only returns the Mins of the remaining time
     * e.g. 01:12 -> 1 Min
     */
    //% block
    //% advanced=true
    export function getRemainingMinute(): number {
        if (cd && getRemainingTime() > 0) {
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
        if (cd && getRemainingTime() > 0) {
            return Math.floor((dtlimit - input.runningTime()) / 1000) - getRemainingMinute() * 60
        } else return 0
    }
    /**
     * Returns the remaining time in Secs
     * e.g. 01:12 -> 72 Secs
     */
    //% block
    //% advanced=true
    export function getRemainingTime(): number {
        if (cd && Math.floor((dtlimit - input.runningTime()) / 1000) > 0) {
            return Math.floor((dtlimit - input.runningTime()) / 1000)
        } else return 0
    }
}
