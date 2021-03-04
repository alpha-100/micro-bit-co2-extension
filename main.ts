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

while (true) {
    serial.writeBuffer(b);
    basic.pause(100);
    
    let response_buffer = serial.readBuffer(0);    
    if (response_buffer.length == 5) {
        let co2_ppm = response_buffer.getNumber(NumberFormat.UInt16BE, 3);
        basic.showString("CO2: ");
        basic.showNumber(co2_ppm);
        basic.pause(5e3);
    } else {
        basic.showString("ERR!");
        basic.pause(1e3);
    }
}
