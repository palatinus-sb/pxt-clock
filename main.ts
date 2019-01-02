/**
 * Clock functions
 */
//% weight=100 color=#00cc96 icon="\uf017" block="Clock"
namespace clock {
    let timeoffset = 0
    //let timecounter = 0
    let Hour = 0
    let Minute = 0
    let Second = 0
    let ampm = false

    let downtimelimit = 0
    let countdown = false

    /**
     * Returns the time as a string in the format "00:00"
     */
    //% block
    export function stringTime(): string {
        let stringtime = ""
        Clock()
        if (Minute < 10) {
            stringtime = "0" + Minute
        } else {
            stringtime = "" + Minute
        }
        if (Hour < 10) {
            stringtime = "0" + Hour + ":" + stringtime
        } else {
            stringtime = "" + Hour + ":" + stringtime
        }
        return stringtime
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
        return Minute
    }

    /**
     * Only returns the seconds of the time
     */
    //% block
    export function getSecond(): number {
        Clock()
        return Second
    }

    /**
     * Returns the time in seconds
     */
    //% block
    export function getTimeInSeconds(): number {
        Clock()
        return Math.floor(input.runningTime() / 1000) + timeoffset
    }

    /**
     * Sets the time to a specific value 
     * eg: 11, 54, 23 is 11:54:23
     * ignores invalid time
     */
    //% block
    export function SetTime(hour: number, minute: number, second: number = 0): void {
        Clock()
        let time = Math.floor(input.runningTime() / 1000) + timeoffset
        Hour = Math.floor(time / 3600)
        Minute = Math.floor((time - Hour * 3600) / 60)
        Second = time - Hour * 3600 - Minute * 60

        if (!(hour >= 0 && hour < 24 && minute >= 0 && minute < 60 && second >= 0 && second < 60)) {
            return
        }

        timeoffset -= (Hour - hour) * 3600
        timeoffset -= (Minute - minute) * 60
        timeoffset -= (Second - second)

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
        /*timecounter++
        if (timecounter >= 3600) {
            timecounter = 0
            timeoffset += 30
        }*/
        let time = Math.floor(input.runningTime() / 1000) + timeoffset
        if (ampm) {
            if (time >= 12 * 60 * 60) {
                timeoffset -= 24 * 60 * 60
            }
        } else {
            if (time >= 24 * 60 * 60) {
                timeoffset -= 24 * 60 * 60
            }
        }
        time = Math.floor(input.runningTime() / 1000) + timeoffset
        Hour = Math.floor(time / 3600)
        Minute = Math.floor((time - Hour * 3600) / 60)
        Second = time - Hour * 3600 - Minute * 60
    }

    /**
     * Adds x hours to the time
     * if argument left empty, it will add 1
     */
    //% block
    export function AddHour(hour: number = 1): void {
        timeoffset += hour * 3600
        Clock()
    }

    /**
     * Adds x minutes to the time
     * if argument left empty, it will add 1
     */
    //% block
    export function AddMinute(minute: number = 1): void {
        timeoffset += minute * 60
        Clock()
    }

	/**
     * Adds x seconds to the time
     * if argument left empty, it will add 1
     */
    //% block
    export function AddSecond(second: number = 1): void {
        timeoffset += second
        Clock()
    }

    /**
     * Starts the countdown of x seconds
     */
    //% block
    //% advanced=true
    export function StartCountdown(seconds: number): void {
        downtimelimit = input.runningTime() + seconds * 1000
        countdown = true
    }

    /**
     * Stops the countdown
     */
    //% block
    //% advanced=true
    export function StopCountdown(): void {
        countdown = false
    }

    /**
     * Returns true if countdown is initiated, otherwise false
     */
    //% block
    //% advanced=true
    export function CountDownState(): boolean {
        return countdown
    }

    /**
     * Only returns the minutes of the remaining time
     * e.g. 01:12 -> 1 minute
     */
    //% block
    //% advanced=true
    export function getRemainingMinute(): number {
        if (countdown && getRemainingTime() > 0) {
            return Math.floor(Math.floor((downtimelimit - input.runningTime()) / 1000) / 60)
        } else return 0
    }

    /**
     * Only returns the seconds of the remaining time
     * e.g. 01:12 -> 12 seconds
     */
    //% block
    //% advanced=true
    export function getRemainingSecond(): number {
        if (countdown && getRemainingTime() > 0) {
            return Math.floor((downtimelimit - input.runningTime()) / 1000) - getRemainingMinute() * 60
        } else return 0
    }

    /**
     * Returns the remaining time in seconds
     * e.g. 01:12 -> 72 seconds
     */
    //% block
    //% advanced=true
    export function getRemainingTime(): number {
        if (countdown && getRemainingTime() > 0) {
            return Math.floor((downtimelimit - input.runningTime()) / 1000)
        } else return 0
    }
}
