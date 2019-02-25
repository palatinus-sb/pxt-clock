# Precise Clock


## functions

**getTime(t: Time): number**
-  use this function to get the Hours, Minutes, or Seconds of the time
-  takes 1 parameter, returns an integer value:
  -  to get the hours of the time, use: **getTime(Time.Hour)**
  -  to get the minutes of the time, use: **getTime(Time.Minute)**
  -  to get the seconds of the time, use: **getTime(Time.Second)**

**setTime(h: number, m: number, s: number): boolean**
-  use this function to set the Time to a specific value
-  you don't need to set Seconds, it will be automatically set to 0
-  returns **true** if setting the time was succesful, **false** if the time is invalid

## License



## Supported targets

* for PXT/microbit
