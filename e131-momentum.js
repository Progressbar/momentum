let e131 = require('e131');

// controling rgb matrix
let client = new e131.Client('192.168.223.53');  // or use a universe
let packet = client.createPacket(24);  // we want 8 RGB (x3) slots
let slotsData = packet.getSlotsData();
packet.setSourceName('test E1.31 client');
packet.setUniverse(0x02);  // make universe number consistent with the client
packet.setOption(packet.Options.PREVIEW, true);  // don't really change any fixture
packet.setPriority(packet.DEFAULT_PRIORITY);  // not strictly needed, done automatically

// slotsData is a Buffer view, you can use it directly
let color = 0;
function cycleColor() {
  for (let idx=0; idx<slotsData.length; idx++) {
    slotsData[idx] = color % 0xff;
    color = color + 45;
  }
  client.send(packet, function () {
    setTimeout(cycleColor, 125);
  });
}
cycleColor();
