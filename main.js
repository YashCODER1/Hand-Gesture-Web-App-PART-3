Webcam.set({
    width:350,
    height:300,
    image_format:'jpg',
    jpg_quality:90
});

camera=document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot(){
Webcam.snap(function(data_uri)
{
    document.getElementById("result").innerHTML='<img id="captured_img" src="'+data_uri+'">';
});
}
console.log("ml5 version",ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Nf0v3T_gy/model.json",modelloaded);
function modelloaded(){
    console.log("modelloaded");
}


function speak()
{
    var synth=window.speechSynthesis;
    speak_data1="The first Prediction is "+prediction_1;
    speak_data2=" and The Second Prediction is "+prediction_2;
    
    var utterthis=new SpeechSynthesisUtterance(speak_data1+speak_data2);
    utterthis.rate=1;
    synth.speak(utterthis);
}

function check()
{
    img=document.getElementById("captured_img");
    classifier.classify(img,gotresult);
}

function gotresult(error,results)
{
    if(error){
    console.error(error); 
}
else{
    console.log(results);
    document.getElementById("result_gesture_name").innerHTML=results[0].label;
    document.getElementById("result_gesture_name2").innerHTML=results[1].label;

    prediction_1=results[0].label;
    prediction_2=results[1].label;

    speak();
    if(results[0].label=="Nice"){
        document.getElementById("update_gesture").innerHTML="&#9995;"
    }
    if(results[0].label=="Cheese"){
        document.getElementById("update_gesture").innerHTML="&#9996;"
    }
    if(results[0].label=="Bye Bye"){
        document.getElementById("update_gesture").innerHTML="&#128076;"
    }

    if(results[1].label=="Thumbs Up"){
        document.getElementById("update_gesure2").innerHTML="&#128077;"
    }
    if(results[1].label=="Yo"){
        document.getElementById("update_gesture2").innerHTML="&#129304"
    }
}
}