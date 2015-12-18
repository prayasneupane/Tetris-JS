function Start()
{
	
	 var make=new MakeBlock();
  make.makeblock(3,2,0);
   document.onkeydown = checkKey;
  		function checkKey(e)
  		{

    	e = e || window.event;

    	if (e.keyCode == '38') {
        // up arrow
    	}
    	else if (e.keyCode == '40') {
        // down arrow
    	}
    	else if (e.keyCode == '37') {
       // left arrow
       
       	make.movesideways(-1);
       	
    	}
    	else if (e.keyCode == '39') {
       // right arrow
       make.movesideways(1);
    		}

		}
		

  function movedown()
  	{	
  		
  		make.movedown();
  
 	}
 setInterval(movedown,2000);
	
}