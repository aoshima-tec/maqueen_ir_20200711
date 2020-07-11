function doMotor (action: string, speed: number) {
    switch (action) {
        case "advance":
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, speed)
            break
        case "left_turn":
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, speed)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
            break
        case "right_turn":
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, speed)
            break
        case "b_left_turn":
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, speed)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 0)
            break
        case "back":
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, speed)
            break
        case "b_right_turn":
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 0)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, speed)
            break

    }
}
maqueen.IR_callbackUser(function (message) {
    mode = message
    switch (mode) {
    case MODE.ADVANCE:
        basic.showIcon(IconNames.Happy, display)
        break
    case MODE.LEFT_TURN:
        basic.showArrow(ArrowNames.West, display)
        break
    case MODE.STOP:
        basic.showIcon(IconNames.Asleep, display)
        break
    case MODE.RIGHT_TURN:
        basic.showArrow(ArrowNames.East, display)
        break
    case MODE.B_LEFT_TURN:
        basic.showArrow(ArrowNames.East, display)
        break
    case MODE.BACK:
        basic.showIcon(IconNames.Sad, display)
        break
    case MODE.B_RIGHT_TURN:
        basic.showArrow(ArrowNames.West, display)
        break
    }
})
let display = 0
let mode:MODE = 0
enum MODE {
    ADVANCE      = 2,
    RIGHT_TURN   = 4,
    STOP         = 5,
    LEFT_TURN    = 6,
    B_LEFT_TURN  = 7,
    BACK         = 8,
    B_RIGHT_TURN = 9,
    DISTANCE     = 99,
 }
let speed = 50
basic.forever(function () {
    switch (mode) {
    case MODE.ADVANCE:
        doMotor("advance", speed)
        break
    case MODE.LEFT_TURN:
        doMotor("left_turn", speed)
        break
    case MODE.RIGHT_TURN:
        doMotor("right_turn", speed)
        break
    case MODE.STOP:
        maqueen.motorStop(maqueen.Motors.All)
        break
    case MODE.B_LEFT_TURN:
        doMotor("b_left_turn", speed)
        break
    case MODE.BACK:
        doMotor("back", speed)
        break
    case MODE.B_RIGHT_TURN:
        doMotor("b_right_turn", speed)
        break
    case MODE.DISTANCE:
        mode = MODE.STOP
        break
    }
})
control.inBackground(function () {
    while (true) {
        if (mode != MODE.BACK && mode != MODE.STOP) {
            if (maqueen.Ultrasonic(PingUnit.Centimeters) <= 10 && maqueen.Ultrasonic(PingUnit.Centimeters) != 0) {
                mode = MODE.DISTANCE
                basic.showIcon(IconNames.No, display)
            }
        }
        basic.pause(50)
    }
})
