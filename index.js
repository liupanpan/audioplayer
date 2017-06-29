var x = document.getElementById("myAudio");
		x.controls = false;
	var action = "";
	var deg = 0;
	var sheet = document.createElement('style');
	function playAudio(id){
		if(myAudio.src != ""){
			console.log();
			x.play();
			action = "played";
			var degToTimeRatio = 360/x.duration;
			animator = function(){
				setTimeout(function(){
					if(deg>360){
						deg = 0;
					}
					sheet.innerHTML = "#play {-ms-transform: rotate("+deg+"deg); -webkit-transform: rotate("+deg+"deg); transform: rotate("+deg+"deg)}";
					document.body.appendChild(sheet);
					deg = deg+6;
					if(action == "played" ){
						animator();
						document.getElementById("thumbail").style.borderWidth = Math.random()*10+'px';
					}
				},1000);
			};
			animator();
		}
		
	};

	document.getElementById('myAudio').addEventListener("ended", function(){
     	myAudio.currentTime = 0;
     	action = "stopped";
     	x.load();
		});

	function pauseAudio(){
		x.pause();
		action = "paused";
	};

	function stopAudio(){
		deg = 0;
		x.load();
		action = "stopped";
	};

	function controlAudio(){
		if(x.controls == true){
			x.controls = false;
		}
		else{
			x.controls = true;
		}
	};

	function addUrl(){
		var url = prompt();
		if(url != null){
			myAudio.src = url;
		}
	};

	function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
	  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

	  return {
	    x: centerX + (radius * Math.cos(angleInRadians)),
	    y: centerY + (radius * Math.sin(angleInRadians))
	  };
	};

	function describeArc(x, y, radius, startAngle, endAngle){

	    var start = polarToCartesian(x, y, radius, endAngle);
	    var end = polarToCartesian(x, y, radius, startAngle);

	    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

	    var d = [
	        "M", start.x, start.y, 
	        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
	    ].join(" ");

    return d;       
	};