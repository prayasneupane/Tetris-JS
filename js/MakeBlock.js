function MakeBlock()
{
	
	var formula=new Formula();
	this.num=[];	
	this.current=[
  [0,0,0],
  [0,0,0],
  [0,0,0],
  [0,0,0]
  ];//array for storing current 4 peices info imgno,colno,rowno
	this.currentorigin=[0,0];//starting position  
	this.currentorientation;//for rotation
	this.currenttype;//block color type 
	this.currenttypenum;//block type no of 7 pieces
	this.dx=0;
	this.nexttypenum;
	this.colortype;
	var that=this;
	this.filled=false;
	this.line=[];
	this.makeBlock=function(type)
	{
		var type=1;
		that.nexttypenum=type;
		var formulae=formula.blockformulas[1][0];
		that.colortype=Math.floor(Math.random()*5);
		var color = formula.blockimages[that.colortype];
		for (i=0;i<=3;i++)
	   {
	   		var atc =  formulae[i][1];
	   			
	   		var atr = formulae[i][0]; 
	   		imagenum=formula.imagenumberdiff(atc, atr)+135;
	   		that.num[i]=imagenum;
	   	

	   		document.images[imagenum].src = color;


	  	}
	}
	this.remove=function()
	{
		for(i=0;i<=3;i++)
		{
			
			
			document.images[that.num[i]].src = "images/blank.png";
		}
	}

	this.makeblock=function(type, atcol, atrow,color) 
	{
	   var no;
	   var tests;
	   that.dx=1;
	   that.currentorigin = [atcol, atrow];
	   that.currenttypenum = type;
	  	
	   that.currenttype = formula.blockimages[color];
	   that.currentorientation = 0;
	   var i;
	   var block = formula.blockimages[type];
	   var formulae = formula.blockformulas[type][0];
	   var imagenum;
	   var atc;
	   var atr;
	  
	   for (i=0;i<=3;i++)
	   {
	   		atc = atcol + formulae[i][1];
	   			
	   		atr = atrow + formulae[i][0]; 
	   		imagenum=formula.imagenumber(atc, atr);
	   		//check for room to add block. If none, end game.
	         tests = String(document.images[imagenum].src);

	         no = tests.search("blank.png");
	         
	         if (no>=0) 
	        {
	            document.images[imagenum].src = that.currenttype; 
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
	this.rotate=function()
	{
		var savedorientation=that.currentorientation;
		that.currentorientation=(that.currentorientation+1)%4;//change current orientatn
		//should check whether new can be made
		var i;
	   var formulae = formula.blockformulas[that.currenttypenum][that.currentorientation];
	   var atcol = that.currentorigin[0];
	   var atrow = that.currentorigin[1];
	   var atc;
	   var atr;
	   var tests;
	   var newcurrent = Array();
	   var saved = Array();
	   var oksofar = true;
	   for (i=0;i<=3;i++) 
	   {
         	atc = atcol + formulae[i][1];//new col no for peice as per rotation
     	 	if (atc>=(hwidth))//check for right side
     	  	{
          		oksofar = false;
          		break; 
            }
     		if (atc<0)//check for left side
     		{
          		oksofar = false;
          		break;    
            }
	 	    atr = atrow + formulae[i][0];//new row no.
     		if (atr>=(vheight-1)) //check at bottom
     		{
          		oksofar = false;
          		break; 
            }
	 		newcurrent[i]=formula.imagenumber(atc, atr);//else assign new positn

    	}
    	if (oksofar==true)
  		{
   			for (i=0;i<=3;i++)
   			{  
       			saved[i] =that.current[i][0];
       			document.images[that.current[i][0]].src = "images/blank.png"
       	    }
  		    // check for new positn
   			for (i=0;i<=3;i++) 
   			{
         		tests = String(document.images[newcurrent[i]].src);
         		found = tests.search("blank.png");
         		if (found == -1)
         		{  
            		oksofar = false;
            		break;     
                }
    		}
   			if (oksofar==true)
   			{
     			for (i=0;i<=3;i++) 
     			{
					imagenum=newcurrent[i];
         			document.images[imagenum].src = that.currenttype; 
	 				that.current[i][0]=imagenum;
	 				that.current[i][1] = atcol+formulae[i][1];
	 				that.current[i][2] = atrow+formulae[i][0];
      			}
    		}
   			else
   			{  // restore from saved
      			for (i=0;i<=3;i++)
      			{
      				document.images[saved[i]].src = that.currenttype;
      			}
      		that.currentorientation = savedorientation;
       		}
    	}
     	else
     	{
     		that.currentorientation = savedorientation;

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
	    	atr=that.current[i][2];
	    	if(atr>=vheight-1)
	    	{	
	    		oksofar=false;
	    		break;
	    	}
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
	    		if(imgno%(hwidth)==8)
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
	    			document.images[newcurrent[i]].src=that.currenttype;
	    			that.current[i][0] = newcurrent[i];//imgno
	    		
                    that.current[i][1] = that.current[i][1]+dir;//column no 
                  

	    		}
	    		that.currentorigin[0]+=dir;//change column no
	    	}
	    	else
	    	{
	    		for(i=0;i<=3;i++)
	    		{
	    			document.images[saved[i]].src=that.currenttype;//restore can't be moved sideways
	    		}
	    	

	    	}

	    }

	}
	this.callNextPiece=function()
	{
			var type=Math.floor(Math.random()*6);
	        	var col=Math.floor(Math.random()*5);
	        	that.makeblock(that.nexttypenum,col,0,that.colortype);
				that.remove();
				that.makeBlock(type);
	}
	
	this.movedown=function()
	{
		var i;
	    var tests;
	    var oksofar=true;
	    var imgno;
	    var atc;
	    var atr;
	    var newcurrent = new Array();//to store imagenum
	    var saved = new Array();
	    var found;
	    var mine=[];
	    var temp=[];
	    
		for (i=0; i<=3; i++) 
	    {
	      	imgno = that.current[i][0];
	      	atc = that.current[i][1];
	      	atr = that.current[i][2];
	 		
	      	if (atr>=(vheight-1)) 
	      	{ //at  bottom already
	      	//need to signal start of new block
	      		oksofar=false;
	    		for(var j=0;j<=3;j++)
	    		{
	    		 mine[j]=that.current[j][2]; 
				}
				var minereduced = mine.reduce(function(a,b)  //remove duplicate row no.
				{
    				if (a.indexOf(b) < 0 ) a.push(b);
    				return a;
  				},[]);
				
	    
	        	
	        	for(var k=0;k<minereduced.length;k++)
	        	{
	        		var attr=minereduced[k];
	        		
					that.checkRowFilled(attr);
				}
				
				
				if(that.line.length!=0)
				{	
					that.fadeout();
					var tid=setTimeout(function()
    				{
    				that.removeLine();

    		
    				
    				},500);
				}
				else
				{
					that.callNextPiece();	 
				
				}      
	        	
	        	break;
	        	
	      	}
	      	newcurrent[i] = formula.imagenumber(atc,atr+1);
	      	temp[i] = formula.imagenumber(atc,atr+1);
	      	
	    }

	    if (oksofar==true) 
	    {

	      /*	for (i=0;i<=3; i++) 
	      	{  //saved image nums & blank out current piece
	      		saved[i] = that.current[i][0];
	      		document.images[that.current[i][0]].src = "images/blank.png";
	      	} */
	      	var match=0;
	      	for (i=4; i>=0; i--) 
	      	{ //check if any blocking
	      		for(var j=0;j<=3;j++)
	      		{

	      		if(temp[i]==that.current[j][0])
	      		{
	      			var index=temp.indexOf(temp[i]);
	      			
	      				temp.splice(index,1);
	      				 match++;
	      			
	      			
	      			
	      			break;
	      		}
	      		}
	      		console.log(index);
	      		console.log(temp);
	      		
	        }
	          // debugger;
	           	for(i=0;i<temp.length;i++)
	           	{
	            tests = String(document.images[temp[i]].src);
	            found = tests.search("blank.png");
	            if (found == -1) 
	            {  
	                oksofar = false;
                   // break;
                }
                } 
	        temp=[];
	        
	        if (oksofar==true)
	      	{		for (i=0;i<=3; i++) 
	      	{  //saved image nums & blank out current piece
	      		saved[i] = that.current[i][0];
	      		document.images[that.current[i][0]].src = "images/blank.png";
	      	}
	      		for (i=0;i<=3; i++)
	      		{	
	       			document.images[newcurrent[i]].src = that.currenttype;
	       			that.current[i][0] = newcurrent[i];
	       			that.current[i][2]++; // y increases; x stays the same
	       
	      		} 
	        	that.currentorigin[1]++;//increase row used for rotation
	      	}
	      
	    	else
		    {
		        /*for (i=0;i<=3; i++) 
		        {
		        	document.images[saved[i]].src = that.currenttype;
		      
		        	//  start new falling piece
		        }*/
		        
				for(var j=0;j<=3;j++)
	    		{
	    		 mine[j]=that.current[j][2]; 
				}
				var minereduced = mine.reduce(function(a,b)  //remove duplicate row no.
				{
    				if (a.indexOf(b) < 0 ) a.push(b);
    				return a;
  				},[]);
				for(var k=0;k<minereduced.length;k++)
				{
					atr=minereduced[k];
					that.checkRowFilled(atr);
				}
				if(that.line.length!=0)
				{	
					that.fadeout();
					var tid=setTimeout(function()
    				{
    				that.removeLine();

    				},500);
    				that.stop=false;
				}
				else
				{	
					that.callNextPiece();
				}      
		        	
		    	
		    } 
		}   
    }

    this.checkRowFilled=function(atr)
    {
    	//var i=vheight-1;
    	//var i=atr;
    	var test;
    	var found;
    	var imagenum;
    
    	
    		var filledcount=0;//counting blank images
    		for(var j=0;j<hwidth;j++)
    		{
    			imagenum=formula.imagenumber(j,atr);
    			test=String(document.images[imagenum].src);
    			found=test.search("blank.png");
    			if(found==-1)//not found
    				filledcount++;
    			
    		}
    		if(filledcount==hwidth)
    		{	
    			that.line.push(atr);

    			
    		}
    		
    }
    this.fadeout=function()
    {	
    	
    	
    	var imgno;
    	for(var k=0;k<that.line.length;k++)
    	{
    	for(var i=0;i<hwidth;i++)
    	{
    		imgno=formula.imagenumber(i,that.line[k]);
    		document.images[imgno].src="images/animation.gif";

    	}
    	}
    }
    this.removeLine=function()
    {	
    	var col;
    	var rowUp;
    	var imgno;
    	var imgnoUp;
    	var temp=[];
    			var temp = that.line.reduce(function(a,b)  //remove duplicate row no.
				{
    				if (a.indexOf(b) < 0 ) a.push(b);
    				return a;
  				},[]);
				
    	//debugger;
    	for (var k=0;k<temp.length;k++)
    	{
    	for(var i=temp[k];i>0;i--)
    	{
    		for(var j=0;j<hwidth;j++)
    		{
    			var imgno=formula.imagenumber(j,i);
    			var imgnoUp=formula.imagenumber(j,i-1);//tyo bhanda mathi ko row ko imgno
    			//replace current row to remove by upper ones
    			document.images[imgno].src=document.images[imgnoUp].src;
    		}
    	}
    	}
    	that.line=[];
    } 
}