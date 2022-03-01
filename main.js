peter_pan_song  = "";
harry_potter_song  = "";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0
song_name = "";
score_left_wrist = 0;
score_right_Wrist = 0;
song_Peter_pan = "";
song_Harry_potter_theme = "";

function setup(){
    canvas = createCanvas(600,531);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);

}

function preload(){
    harry_potter_song = loadSound("music.mp3");
    peter_pan_song = loadSound("music2.mp3");
}

function draw(){
    image(video, 0, 0, 600, 531);
    
    fill("#00ff00");
    stroke("#ff0000")

    song_Peter_pan = peter_pan_song.isPlaying();
    console.log(peter_pan_song);

    song_Harry_potter_theme = harry_potter_song.isPlaying();
    console.log(harry_potter_song);

    song_name = peter_pan_song.isPlaying()
    console.log(song_name);
     if(score_left_wrist < 0.2){
         circle(leftWrist_x, leftWrist_y, 20);
         harry_potter_song.stop();
         if(song_name == false){
             peter_pan_song.play();
         }
         else{
            console.log("Song Name: Peter Pan Song");
            document.getElementById("song_id").innerHTML = "Song Name: Peter Pan Song";
         }

         if(score_right_Wrist > 0.2){
            circle(rightWrist_x,rightWrist_y,20);
            peter_pan_song.stop();
            if(harry_potter_song == false){
                harry_potter_song.play();
            }
            else{
                console.log("Song Name: Harry Potter Theme Song");
                document.getElementById("song_id").innerHTML = "Song Name: Harry Potter Theme Song";
            }
        }   
     }
    
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        score_left_Wrist = results[0].pose.keypoints[9].score;
        console.log(score_left_Wrist);

        score_right_Wrist = results[0].pose.keypoints[10].score;
        console.log(score_right_Wrist)

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}
