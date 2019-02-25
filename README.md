# Precise Clock
This *micro:bit MakeCode extension* brings you some useful functions regarding the clock.
It's **infinitely more precise** then using the ```basic.pause(1000); time++``` method. The code is optimised to low memory and CPU usage, thus it only calculates the time if you want to get it. *No need for any background processes!* Because the time is based ond the **running time**, after booting up your microbit, you need to set the time. (*otherwise it will show the time since boot*)


## functions

**getTime(t: Time): number**
-  use this function to get the Hours, Minutes, or Seconds of the time
-  takes 1 *Time enum* parameter, returns an *integer value*
  -  to get the hours of the time, use: **getTime(Time.Hour)**
  -  to get the minutes of the time, use: **getTime(Time.Minute)**
  -  to get the seconds of the time, use: **getTime(Time.Second)**

**setTime(h: number, m: number, s: number): boolean**
-  use this function to set the Time to a specific value
-  takes 2 or 3 *integer* parameters in the order of: **hour -> minute -> second**
-  you don't need to set Seconds, it will be automatically set to 0
-  returns **true** if setting the time was succesful, **false** otherwise

**timeString(f: TimeFormat): string**
-  use this function to get a formatted time string
-  timeString(TimeFormat.hhmm) will return *"12:34"*
-  timeString(TimeFormat.hhmmss) will return *"12:34:56"*

**enableAmPm(value: boolean): void**
-  use this function to **enable** or **disable** the *12-hour-mode*
-  takes 1 *boolean* argument

**getAmPm(): boolean**
-  use this function to determine if the Clock is in *12-hour-mode*

**startCountDown(Secs: number): void**
-  use this function to start the *CountDown* with **X seconds**
-  takes 1 *integer* parameter

**stopCountDown(): void**
-  use this function to stop and reset the *CountDown*

**countDownState(): boolean**
-  Returns **true** if *CountDown* is initiated, otherwise **false**

**getRemainingTime(): number**
-  use this function to get the remaining time
-  *e.g. 01:12 -> 72 Secs*

**getRemainingMinute(): number**
-  use this function to get the Minutes of the remaining time
-  *e.g. 01:12 -> 1 Minutes*

**getRemainingSecond(): number**
-  use this function to get the Seconds of the remaining time
-  *e.g. 01:12 -> 12 Seconds*



## License

## Supported targets

* for PXT/microbit
