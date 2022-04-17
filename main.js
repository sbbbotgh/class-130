song = "";
lefthandX = 0;
righthandX = 0;
lefthandY = 0;
righthandY = 0;
scoreLeftwrist = 0;
scoreRightwrist = 0;


function preload(){
    song = loadSound("music.mp3");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightwrist > 0.2){
    circle(righthandX, righthandY, 20);

    if(righthandY > 0 && righthandY <= 100){
        document.getElementById("speed").innerHTML = "SPEED = 0.5x";
        song.rate(0.5);
    }
    else if(righthandY > 100 && righthandY <= 200){
        document.getElementById("speed").innerHTML = "SPEED = 1x";
        song.rate(1);
    }
    else if(righthandY > 200 && righthandY <= 300){
        document.getElementById("speed").innerHTML = "SPEED = 1.5x";
        song.rate(1.5);
    }
    else if (righthandY > 300 && righthandY<= 400){
        document.getElementById("speed").innerHTML = "SPEED = 2x";
        song.rate(2);
    }
    else if(righthandY > 400 && righthandY <= 500){
        document.getElementById("speed").innerHTML = "speed = 2.5x";
        song.rate(2.5);
    }
}

    if(scoreLeftwrist > 0.2){
        circle(lefthandX, lefthandY, 20);
        NumleftWristY = Number(lefthandY);
        roundleftWristY = floor(NumleftWristY);
        volumeleftY = roundleftWristY/500;
        document.getElementById("volume").innerHTML = "volume = " + volumeleftY;
        song.setVolume(volumeleftY);
    }
}

function modelLoaded(){
    console.log("Model is loaded");
}

function gotPoses(results){
    if(results.length > 0){

        console.log(results);

        scoreLeftwrist = results[0].pose.keypoints[9].score;
        scoreRightwrist = results[0].pose.keypoints[10].score;
        console.log("score Left Wrist = " + scoreLeftwrist + "score Right Wrist = " + scoreRightwrist);

        lefthandX = results[0].pose.leftWrist.x;
        lefthandY = results[0].pose.leftWrist.y;
        console.log("left wrist x = "+lefthandX + ", left wrist y = " + lefthandY);

        righthandX = results[0].pose.rightWrist.x;
        righthandY = results[0].pose.rightWrist.y;
        console.log("right wrist x = "+righthandX + ", right wrist y = " + righthandY);
    }
}