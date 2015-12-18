function Start()
{
	
	 var make=new MakeBlock();
  make.makeblock(0,2,0);
   document.onkeydown = checkKey;
  		function checkKey(e)
  		{

    	e = e || window.event;

    	if (e.keyCode == '38') {
        // up arrow
        make.rotate();
    	}
    	else if (e.keyCode == '40') {
        // down arrow
        make.movedown();
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
 setInterval(movedown,500);
	
}