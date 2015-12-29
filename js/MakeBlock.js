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
	
	this.nexttypenum;//block type of next peice
	this.colortype;
	this.score=0;
	var that=this;
	
	this.line=[];//line no of filled rows
	this.newcurrent=[];//new position for current
	
	this.makeNextBlock=function(type)
	{
		
		that.nexttypenum=type;
		var formulae=formula.blockformulas[type][0];
		that.colortype=Math.floor(Math.random()*6);
		var color = formula.blockimages[that.colortype];
		for (i=0;i<=3;i++)
	   {
	   		var atCurrCol =  formulae[i][1];
	   			
	   		var atCurrRow = formulae[i][0]; 
	   		imagenum=formula.imagenumberdiff(atCurrCol, atCurrRow)+vheight*hwidth;
	   		that.num[i]=imagenum;
	   	

	   		
	   		document.getElementById("img"+imagenum).setAttribute("src",color);

	  	}
	}
	this.removeNextBlock=function()
	{
		for(i=0;i<=3;i++)
		{
			
			
			
			document.getElementById("img"+that.num[i]).setAttribute("src","images/blank.png");
		}
	}

	this.makeCurrentBlock=function(type, atcol, atrow,color) 
	{
	   var no;
	   var tests;
	   
	  
	   that.currentorigin = [atcol, atrow];
	   that.currenttypenum = type;
	  	
	   that.currenttype = formula.blockimages[color];
	   that.currentorientation = 0;
	   var i;
	   var block = formula.blockimages[type];
	   var formulae = formula.blockformulas[type][0];
	   var imagenum;
	   var atCurrCol;
	   var atCurrRow;
	  
	   for (i=0;i<=3;i++)
	   {
	   		atCurrCol = atcol + formulae[i][1];
	   			
	   		atCurrRow = atrow + formulae[i][0]; 
	   		imagenum=formula.imagenumber(atCurrCol, atCurrRow);
	   		//check for room to add block. If none, end game.
	        
	         tests = String(document.getElementById("img"+imagenum).src);

	         no = tests.search("blank.png");
	         
	         if (no>=0) 
	        {
	           
	            document.getElementById("img"+imagenum).src = that.currenttype; 
	    	    that.current[i][0]=imagenum;
	    	  	that.current[i][1] = atCurrCol;
	     		that.current[i][2] = atCurrRow;
	     
	        }
	         else
	        {	
	        	clearInterval(intervalId);
	        	var div1=document.getElementById("gameOver");
	        	
	        	div1.style.visibility="visible";
	        	debugger;
	        	break;
	        }
	    }
	   
	}
	this.rotate=function()
	{
		
		that.currentorientation=(that.currentorientation+1)%4;//change current orientatn
		
	   if(that.checkCollisionRotate()!=true)
	   {
	  
	 		that.calcNewPosRotate();
 				   	
    	
  			if(that.checkCollision()==true)
  			{
  				that.callRowFilledCheck();
				
				if(that.line.length!=0)
				{	
					that.delayRemoveLine();
				}
				     
  			}
   			
   			if (that.checkCollision()!=true)
   			{	
   				that.blankCurrPice();
     			that.moveToNextPosRotate();
    		}
   		}	
    	
     	
    }
    this.calcNewPosRotate=function()
    {	
    	var formulae = formula.blockformulas[that.currenttypenum][that.currentorientation];
	    var atcol = that.currentorigin[0];
	    var atrow = that.currentorigin[1];
	    for(i=0;i<=3;i++)
	    {
		    var atCurrCol = atcol + formulae[i][1];
		    var atCurrRow = atrow + formulae[i][0];
	    	that.newcurrent[i]=formula.imagenumber(atCurrCol, atCurrRow);
	    }

    }
    this.checkCollisionRotate=function()
    {
    	var formulae = formula.blockformulas[that.currenttypenum][that.currentorientation];
	    var atcol = that.currentorigin[0];
	    var atrow = that.currentorigin[1];
    	for (i=0;i<=3;i++) 
	    {
         	atc = atcol + formulae[i][1];//new col no for peice as per rotation
     	 	if (atc>=(hwidth))//check for right side
     	  	{
          		return true;
          		break; 
            }
     		if (atc<0)//check for left side
     		{
          		return true;
          		break;    
            }
	 	    atr = atrow + formulae[i][0];//new row no.
     		if (atr>=(vheight-1)) //check at bottom
     		{
          		return true;
          		break; 
            }
    }	}
    this.moveToNextPosRotate=function()
    {
    	var formulae = formula.blockformulas[that.currenttypenum][that.currentorientation];
    	var atcol = that.currentorigin[0];
	    var atrow = that.currentorigin[1];
    	for (i=0;i<=3;i++) 
     	{
			imagenum=that.newcurrent[i];
         	 
         	document.getElementById("img"+imagenum).src = that.currenttype; 
	 		that.current[i][0]=imagenum;
	 		that.current[i][1] = atcol+formulae[i][1];
	 		that.current[i][2] = atrow+formulae[i][0];
      	}
    }
	this.movesideways=function(dir)
	{
		var i;
		
		if(that.checkAtBottom()!=true)
		{
			
			
		if(that.checkCollisionSideways(dir)!=true)
		{
			that.calcNewPosSide(dir);
	    	
	    	if(that.checkCollision()!=true)//no collision
	    	{	
	    		
	    		that.blankCurrPice();
	    		that.moveToNextPosSide(dir);
	    		that.currentorigin[0]+=dir;//change column no
	    	}
	    	
	    }
		}
	    

	}
	this.checkCollisionSideways=function(dir)
	{
		for(i=0;i<=3;i++)
	    {
	    	var imgno=that.current[i][0];//get imageno of all 4 boxes of a piece
	    	
	    	
	    	if(dir==-1)
	    	{
	    		if(imgno%hwidth==0)
	    		{
	    			return true;//can't be moved left
	    			break;
	    		}
	    	}
	    	if(dir==1)//right
	    	{
	    		if(imgno%(hwidth)==hwidth-1)
	    		{
	    			return true;
	    			break; 
	    		}
	    	}
	    }	
	}
	 this.calcNewPosSide=function(dir)
	 {
	 	for(i=0;i<=3;i++)
	    {
	    	var imgno=that.current[i][0];//get imageno of all 4 boxes of a piece
	    	
	    	that.newcurrent[i]=imgno+dir;//new imgno for all 4 blocks acording as shift
	    

	    }
	 }   			
	        
	 this.moveToNextPosSide=function(dir)
	 {
	 	for(i=0;i<=3;i++)
	    {
	    	
	    	document.getElementById("img"+that.newcurrent[i]).src=that.currenttype;
	    	that.current[i][0] = that.newcurrent[i];//imgno
	    		
            that.current[i][1] = that.current[i][1]+dir;//shift column no. 
                  

	    }
	 }   			
	    			
	this.callNextPiece=function()
	{
		var type=Math.floor(Math.random()*6);
	    var col=Math.floor(Math.random()*5);
	    that.makeCurrentBlock(that.nexttypenum,col,0,that.colortype);
		that.removeNextBlock();
		that.makeNextBlock(type);
	}
	this.checkAtBottom=function()

	{
		for (i=0; i<=3; i++) 
	    {
	      	imgno = that.current[i][0];
	      	atc = that.current[i][1];
	      	atr = that.current[i][2];
	 		
	      	if (atr>=(vheight-1)) 
	      	{ 
	      		return true;
	      		break;
	      	}
	    }
	}
	this.calcNewPosDown=function()
	{
		for (i=0; i<=3; i++) 
	    {
	      	imgno = that.current[i][0];
	      	atc = that.current[i][1];
	      	atr = that.current[i][2];
	 		
	      		that.newcurrent[i] = formula.imagenumber(atc,atr+1);//increase row no. col const
	      		
	    }	
	}
	this.callRowFilledCheck=function()
	{	
		var mine=[];
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
	}
	this.blankCurrPice=function()
	{
		for (i=0;i<=3; i++) 
	      	{  
	      		document.getElementById("img"+that.current[i][0]).src = "images/blank.png";
	      	}
	}    		
	this.moveToNextPosDown=function()
	{
			
	      	for (i=0;i<=3; i++)
	      	{	
	       		
	       		document.getElementById("img"+that.newcurrent[i]).src = that.currenttype;
	       		that.current[i][0] = that.newcurrent[i];
	     		that.current[i][2]++; 
	       
	      	} 
	        that.currentorigin[1]++;//increase row used as reference for rotation
	}
	this.checkCollision=function()
	{	
		var temp=[];//used to store new imgno which are not in current arr
		for(i=0;i<=3;i++)
		{
			temp[i]=that.newcurrent[i];
		}
		
		for (i=4; i>=0; i--) 
	    { 
	      	for(var j=0;j<=3;j++)
	      	{
	      			
	      		if(temp[i]==that.current[j][0])
	      		{
	      			var index=temp.indexOf(temp[i]);
	      			
	      			temp.splice(index,1);
	      			break;
	      		}
	      	}
	      		
	    }
	      		
	       	
	    for(i=0;i<temp.length;i++)//check collision for new pos can be filled?
	    {
	        
	        tests = String(document.getElementById("img"+temp[i]).src);
	        found = tests.search("blank.png");
	        if (found == -1) //colorful image found
	        {  
	            return true;
	            break;
                   
            }
        } 
	}
	      				
	      			
	      			
	      			
	       
	this.delayRemoveLine=function()
	{
		that.fadeout();
		var tid=setTimeout(function()
    	{
    		that.removeLine();

    	},500);
    				
	}
	this.movedown=function()
	{
	    if(that.checkAtBottom()==true)
	    {
	    		
			that.callRowFilledCheck();
				
     		if(that.line.length!=0)
			{	
				that.delayRemoveLine();
			}
			else
			{
				that.callNextPiece();	 
				
			}      
	        	
	    }
	      
	   	else
	    {
	    	
	    	that.calcNewPosDown();
	    		
	      
	      	if(that.checkCollision()==true)
	      
		    {
		      
		        that.callRowFilledCheck();
				
				if(that.line.length!=0)//row filled
				{	
					that.delayRemoveLine();
				}
				else
				{	
					that.callNextPiece();
				}      
		    }
		        	
		    	
		    else
	      	{		
	      		that.blankCurrPice();
	      		that.moveToNextPosDown();
	      	}
	    	 
		}   
    }
	      	
    this.checkRowFilled=function(atr)
    {
    	var test;
    	var found;
    	var imagenum;
    
    	
    		var filledcount=0;//counting blank images
    		for(var j=0;j<hwidth;j++)
    		{
    			imagenum=formula.imagenumber(j,atr);
    			
    			test=String(document.getElementById("img"+imagenum).src);
    			found=test.search("blank.png");
    			if(found==-1)//not found
    				filledcount++;
    			
    		}
    		if(filledcount==hwidth)//no blanks in row
    		{	
    			that.line.push(atr);
    			return true;
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
    		
    		document.getElementById("img"+imgno).src="images/animation.gif";

    	}
    	}
    }
    this.removeLine=function()
    {	
    	
    	var imgno;
    	var imgnoUp;
    	var temp=[];
    			var temp = that.line.reduce(function(a,b)  //remove duplicate row no.
				{
    				if (a.indexOf(b) < 0 ) a.push(b);
    				return a;
  				},[]);
				
    	if(temp.length==1)
    	{
    		that.score+=1;
    	}if(temp.length==2)
    	{
    		that.score+=4;
    	}if(temp.length>=3)
    	{
    		that.score+=8;
    	}
    	document.getElementById("display-score").innerHTML=that.score;
    	for (var k=0;k<temp.length;k++)
    	{
    	for(var i=temp[k];i>0;i--)
    	{
    		for(var j=0;j<hwidth;j++)
    		{
    			var imgno=formula.imagenumber(j,i);
    			var imgnoUp=formula.imagenumber(j,i-1);
    			//replace current row to remove by upper ones
    			
    			document.getElementById("img"+imgno).src=document.getElementById("img"+imgnoUp).src;
    		}
    	}
    	}
    	that.line=[];
    } 
}

		
	    
		
    			
    		
