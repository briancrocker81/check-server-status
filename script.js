$(function() {

	TrafficLights = [];	

	var check_url = function(i, url) {
		$.ajax({
			type: "GET",
			url: url,
			complete: function(e, xhr, settings){
				if(e.status === 200){
					TrafficLights[i].status = 200;
					$( "#traffic-light-"+i+" .light.green" ).removeClass( "light-off" );
					$( "#traffic-light-"+i+" .light.red" ).removeClass( "status-error" ).addClass( "light-off" );
					$( "#traffic-light-"+i+" .status-code p" ).html( "200" );
				}else{
					TrafficLights[i].status = "!200";
					$( "#traffic-light-"+i+" .light.red" ).removeClass( "light-off" ).addClass( "status-error" );
					$( "#traffic-light-"+i+" .light.green" ).addClass( "light-off" );
					$( "#traffic-light-"+i+" .status-code p" ).html( "!200" );
				}
			}
		});
	};

	function createTrafficLight() {
		var inputUrl  = document.getElementById("input-Url");
		var i = TrafficLights.length;
		TrafficLights.push({url: inputUrl.value});
		$("ul").append("<li id='traffic-light-"+i+"' class='traffic-light-instance'> \
			<div class='detail-container'> \
				<div class='url'> \
					<h2>"+inputUrl.value+"</h2> \
				</div> \
				<div class='light-housing'> \
					<div class='light red'></div> \
					<div class='light green'></div> \
				</div> \
				<div class='status-code'> \
					<h2>Status</h2> \
					<p></p> \
				</div>\
			</div>\
		</li>");
		check_url(i,inputUrl.value);
	}
	
	$('form#traffic-light-form').submit(function () {
		createTrafficLight();
		this.reset();		
		return false;
	});

	function updateStatus() {
		for( var i = 0; i < TrafficLights.length; i++){
			var url = TrafficLights[i].url;
			check_url(i,url);
		}
	}
	
	setInterval(function(){
		updateStatus();
	}, 10000);

});

