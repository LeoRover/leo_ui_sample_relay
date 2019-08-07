var manager;
var ros;
var batterySub;
var robot_hostname;
var batterySub;

function initROS() {

    ros = new ROSLIB.Ros({
        //url: "ws://" + robot_hostname + ":9090"
        url: "ws://192.168.4.163:9090"
    });

    relay1Pub = new ROSLIB.Topic({
        ros: ros,
        name: '/relay1',
        messageType: 'std_msgs/Bool',
        queue_size: 5
    });

    relay2Pub = new ROSLIB.Topic({
        ros: ros,
        name: '/relay2',
        messageType: 'std_msgs/Bool',
        queue_size: 5
    });

    relay3Pub = new ROSLIB.Topic({
        ros: ros,
        name: '/relay3',
        messageType: 'std_msgs/Bool',
        queue_size: 5
    });

    relay4Pub = new ROSLIB.Topic({
        ros: ros,
        name: '/relay4',
        messageType: 'std_msgs/Bool',
        queue_size: 5
    });

    relay1Pub.advertise();
    relay2Pub.advertise();
    relay3Pub.advertise();
    relay4Pub.advertise();

    systemRebootPub = new ROSLIB.Topic({
        ros: ros,
        name: '/system/reboot',
        messageType: 'std_msgs/Empty'
    });
    systemRebootPub.advertise();

    systemShutdownPub = new ROSLIB.Topic({
        ros: ros,
        name: '/system/shutdown',
        messageType: 'std_msgs/Empty'
    });
    systemShutdownPub.advertise();

    batterySub = new ROSLIB.Topic({
        ros : ros,
        name : '/battery',
        messageType : 'std_msgs/Float32',
        queue_length: 1
    });
    batterySub.subscribe(batteryCallback);

}

function batteryCallback(message) {
    document.getElementById('batteryID').innerHTML = 'Voltage: ' + message.data.toPrecision(4) + 'V';
}

function systemReboot(){
    systemRebootPub.publish()
}

function turnOff(){
    systemShutdownPub.publish()
}



function rel1Trig(){
    var relayMsg;
    var checkBox = document.getElementById("relay-1");

    if (checkBox.checked == true){
       relayMsg = new ROSLIB.Message({
            data: true
        });
    }
    else {
        relayMsg = new ROSLIB.Message({
            data: false
        });
    }
    relay2Pub.publish(relayMsg);
    
}

function rel1Trig(){
    var relayMsg;
    var checkBox = document.getElementById("relay-1");

    if (checkBox.checked == true){
       relayMsg = new ROSLIB.Message({
            data: true
        });
    }
    else {
        relayMsg = new ROSLIB.Message({
            data: false
        });
    }
    relay1Pub.publish(relayMsg);
    
}

function rel2Trig(){
    var relayMsg;
    var checkBox = document.getElementById("relay-2");

    if (checkBox.checked == true){
       relayMsg = new ROSLIB.Message({
            data: true
        });
    }
    else {
        relayMsg = new ROSLIB.Message({
            data: false
        });
    }
    relay2Pub.publish(relayMsg);
    
}

function rel3Trig(){
    var relayMsg;
    var checkBox = document.getElementById("relay-3");

    if (checkBox.checked == true){
       relayMsg = new ROSLIB.Message({
            data: true
        });
    }
    else {
        relayMsg = new ROSLIB.Message({
            data: false
        });
    }
    relay3Pub.publish(relayMsg);
    
}

function rel4Trig(){
    var relayMsg;
    var checkBox = document.getElementById("relay-4");

    if (checkBox.checked == true){
       relayMsg = new ROSLIB.Message({
            data: true
        });
    }
    else {
        relayMsg = new ROSLIB.Message({
            data: false
        });
    }
    relay4Pub.publish(relayMsg);
    
}

function shutdown() {
    relay1Pub.unadvertise();
    relay2Pub.unadvertise();
    relay3Pub.unadvertise();
    relay4Pub.unadvertise();
    systemRebootPub.unadvertise();
    systemShutdownPub.unadvertise();
    batterySub.unsubscribe();
    ros.close();
}

window.onload = function () {

    robot_hostname = location.hostname;

    initROS();

    window.addEventListener("beforeunload", () => shutdown());
}


