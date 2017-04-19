var robot = require("robotjs.node");

// Type "Hello World".
robot.typeStringDelayed("Bello World", 180);

// Press enter.
robot.keyTap("enter");

// random tests
robot.keyTap('`');
robot.keyTap("enter");
robot.keyTap('`', 'shift');
