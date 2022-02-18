$(function(){
	
	var note = $('#note'),
		ts = new Date(2012, 0, 1),
		newYear = true;
	
	if((new Date()) > ts){
		// The new year is here! Count towards something else.
		// Notice the *1000 at the end - time must be in milliseconds
		ts = (new Date()).getTime() + 3*24*60*60*1000;
		newYear = false;
	}
		
	$('#countdown').countdown({
		timestamp	: ts,
		callback	: function(days, hours, minutes, seconds){
			
			var message = "";
			
			message += days + " day" + ( days==1 ? '':'s' ) + ", ";
			message += hours + " hour" + ( hours==1 ? '':'s' ) + ", ";
			message += minutes + " minute" + ( minutes==1 ? '':'s' ) + " and ";
			message += seconds + " second" + ( seconds==1 ? '':'s' ) + " <br />";
			
			if(newYear){
				message += "left until the new year!";
			}
			else {
				message += "left to 10 days from now!";
			}
			
			note.html(message);
		}
	});
	
	
	//Mobile
		$('#m_countdown').countdown({
		timestamp	: ts,
		callback	: function(days, hours, minutes, seconds){
			
			var message = "";
			
		  message +="<div class=\"box\"><b>"+days+"</b><span>Day" + ( days==1 ? '':'s' ) + "</span></div>";
                
              
         message +="<div class=\"box\"><b>"+hours+"</b><span>Hour" + ( hours==1 ? '':'s' ) + "</span></div>";
                
                
              
         message +="<div class=\"box\"> <b>"+minutes+"</b><span>Min"  + ( minutes==1 ? '':'s' ) + "</span></div>";
               
                
              
         message +="<div class=\"box\"><b>"+seconds+"</b> <span>Sec" + ( seconds==1 ? '':'s' ) + "</span></div>";
                
               
			
			 
			
		$('#m_countdown').html(message);
		}
	});
	 
       
              
	
});
