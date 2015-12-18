function MakeBlock()
{
	
	var formula=new Formula();
	this.current=[
  [0,0,0],
  [0,0,0],
  [0,0,0],
  [0,0,0]
  ];//array for storing current peice info
	this.currentorigin=[0,0];//starting position 
	this.currentorientation;//later for rotation
	this.currenttype;//block type
	this.dx=0;
	var that=this;
	this.makeblock=function(type, atcol, atrow) 
	{
	   var no;
	   var tests;
	   that.dx=1;
	   that.currentorigin = [atcol, atrow];
	   that.currenttypenum = type;
	   that.currenttype = formula.blockimages[2];
	   that.currentorientation = 0;
	   var i;
	   var block = formula.blockimages[type];
	   var formulae = formula.blockformulas[type];
	   var imagenum;
	   var atc;
	   var atr;
	   
	   for (i=0;i<=3;i++)
	   {
	   		atc = atcol + formulae[i][0];
	   			
	   		atr = atrow + formulae[i][1]; 
	   		imagenum=formula.imagenumber(atc, atr);
	   		//check for room to add block. If none, end game.
	         tests = String(document.images[imagenum].src);

	         no = tests.search("blank.png");
	         
	         if (no>=0) 
	        {
	            document.images[imagenum].src = "images/blue.png"; 
	    	    that.current[i][0]=imagenum;
	    	  	that.current[i][1] = atc;
	     		that.current[i][2] = atr;
	     
	        }
	         else
	        {	
	        	alert('Game over');
	        	 break;
	        }
	    }
	   
	}
	this.movesideways=function(dir)
	{
		var i;
		var test;
		var imgno;
		var atc;
		var atr;
		var newcurrent=new Array();
		var saved=new Array;
		var found;
		var oksofar=true;
	
		
		for(i=0;i<=3;i++)
	    {
	    	imgno=that.current[i][0];//get imageno of all 4 boxes of a piece
	    	
	    	if(dir==-1)
	    	{//can be moved left?
	    		if(imgno%hwidth==0)
	    		{
	    			oksofar=false;//can't be moved left
	    			
	        
	    			
	    			
	    			break;
	    		}
	    	}
	    	if(dir==1)//right
	    	{
	    		if(imgno!=0&&imgno%(hwidth)==8)
	    		{
	    			oksofar=false;
	    			break; 
	    		}
	    	}
	    	
	    	
	    	newcurrent[i]=imgno+dir;//new imgno for all 4 blocks acording as shift
	    

	    }
	    if(oksofar==true) //no collision sideways
	    {
	    	//save currrent peice imgno 
	    	for(i=0;i<=3;i++)
	    	{
	    		saved[i]=that.current[i][0];
	    		document.images[that.current[i][0]].src="images/blank.png";
	    	}
	    	//test collision 
	    	for(i=0;i<=3;i++)
	    	{
	    		//check new position is filled or not
	    		test=String(document.images[newcurrent[i]].src);
	    		found=test.search("blank.png");
	    		if (found==-1)//no-room to add block colision detected
	    		{
	    			oksofar=false;
	    			break;
	    		}
	    	}
	    	if(oksofar)//no collision
	    	{
	    		for(i=0;i<=3;i++)
	    		{
	    			document.images[newcurrent[i]].src="images/blue.png";
	    			that.current[i][0] = newcurrent[i];//imgno
	    		
                    that.current[i][1] = that.current[i][1]+dir;//column no 
                  

	    		}
	    		that.currentorigin[0]+=dir;//change column no
	    	}
	    	else
	    	{
	    		for(i=0;i<=3;i++)
	    		{
	    			document.images[saved[i]].src="images/blue.png";//restore can't be moved sideways
	    		}
	    	

	    	}

	    }

	}
	
	this.movedown=function()
	{
		var i;
	    var tests;
	    var oksofar = true;
	    var imgno;
	    var atc;
	    var atr;
	    var newcurrent = new Array();//to store imagenum
	    var saved = new Array();
	    var found;
	   
	    for (i=0; i<=3; i++) 
	    {
	      imgno = that.current[i][0];
	      atc = that.current[i][1];
	      atr = that.current[i][2];
	 
	      if (atr>=(vheight-1)) 
	      { //at  bottom already
	      //need to signal start of new block
	    
	        var type=Math.floor(Math.random()*6);
	        var col=Math.floor(Math.random()*5);
	        
	        that.makeblock(type,col,0);
	        oksofar = false;
	        break;
	      }
	      newcurrent[i] = formula.imagenumber(atc,atr+1);
	    }
	    if (oksofar) 
	    {
	      for (i=0;i<=3; i++) 
	      {  //saved image nums & blank out current piece
	      saved[i] = that.current[i][0];
	      document.images[that.current[i][0]].src = "images/blank.png";
	      } // ends for loop
	      for (i=0; i<=3; i++) 
	      { //check if any blocking
	                  tests = String(document.images[newcurrent[i]].src);
	                  found = tests.search("blank.png");
	                  if (found == -1) 
	                  {  // meaning it was not found
	                    oksofar = false;
	                    break;
	                  }  
	      } 
	      if (oksofar)
	      {
	      for (i=0;i<=3; i++)
	      {
	       document.images[newcurrent[i]].src = "images/blue.png";
	       that.current[i][0] = newcurrent[i];
	       that.current[i][2]++; // y increases; x stays the same
	       
	      } 
	        that.currentorigin[1]++;//increase row
	      }  
	      else
	      {
	        for (i=0;i<=3; i++) 
	        {
	        document.images[saved[i]].src = "images/blue.png";
	      
	        // signal need to start new falling piece
	        }
	        var ty=Math.floor(Math.random()*6);
	        var co=Math.floor(Math.random()*5);
	   
	        that.makeblock(ty,co,0); 
	       } 
	    }
    }

}