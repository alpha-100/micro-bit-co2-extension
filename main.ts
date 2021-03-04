function bufferFromArray(arr: number[]) {
    return Buffer.fromArray(arr);
}
serial.redirect(
SerialPin.P0,
SerialPin.P1,
BaudRate.BaudRate19200
)
let READ_PPM = [255, 254, 2, 2, 3]
let b = bufferFromArray(READ_PPM);

/* for testing
while (true) {
    serial.writeBuffer(b);
    basic.pause(100);
}
*/

serial.writeBuffer(b);
let response_buffer = serial.readBuffer(5);
let co2_ppm = response_buffer.getNumber(NumberFormat.UInt16BE, 3);
basic.showString("CO2: ", co2_ppm);
