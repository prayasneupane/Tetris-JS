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
	this.nextcolorArr=[];//used to pass it to current block to be made
	this.colortypeArr=[];//color of current peice 
	this.imageToRmv=[];
	var that=this;
	
	this.line=[];//line no of filled rows
	this.newcurrent=[];//new position for current
	
	this.makeNextBlock=function(type)
	{

		if(flag==1)
		{
			type=1;
		}
		that.nexttypenum=type;
		var formulae=formula.blockformulas[type][0];
		
		var color = formula.blockimages[type];
		for (i=0;i<=3;i++)
	   {
	   		var atCurrCol =  formulae[i][1];
	   			
	   		var atCurrRow = formulae[i][0]; 
	   		imagenum=formula.imagenumberdiff(atCurrCol, atCurrRow)+vheight*hwidth;
	   		that.num[i]=imagenum;
	   		if(flag==0)
	   		{
	   			
	   			document.getElementById("img"+imagenum).setAttribute("src",color);
	   		}
	   		else
	   		{
	   			
					
					that.nextcolorArr[i]=Math.floor(Math.random()*7);
					document.getElementById("img"+imagenum).setAttribute("src",formula.blockimages[that.nextcolorArr[i]]);
				
	   		}
	   		

	  	}
	}
	this.removeNextBlock=function()
	{
		for(i=0;i<=3;i++)
		{
			
			
			
			document.getElementById("img"+that.num[i]).setAttribute("src","images/gray.png");
		}
	}

	this.makeCurrentBlock=function(type, atcol, atrow,colorArr) 
	{
	   var no;
	   var tests;
	
	  if(flag==1)
	  {
	  	type=1;
	  }
	   that.currentorigin = [atcol, atrow];
	   that.currenttypenum = type;
	  	
	   that.currenttype = formula.blockimages[type];
	   that.currentorientation = 0;
	   var i;
	  
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
	         
	         if (no>-1) 
	        {
	            if(flag==0)
	            {
	            	document.getElementById("img"+imagenum).src = that.currenttype; 
	            	
	        	}
	        	else
	        	{	
	        		that.colortypeArr[i]=formula.blockimages[colorArr[i]];
	    			document.getElementById("img"+imagenum).src = that.colortypeArr[i];
	        		
	        	}
	    	    that.current[i][0]=imagenum;
	    	  	that.current[i][1] = atCurrCol;
	     		that.current[i][2] = atCurrRow;
	     
	        }
	         else
	        {	

	        	clearInterval(intervalId);
	        	var audio = new Audio('audio/audio1.mp3');
				audio.play();
    
	        	var div1=document.getElementById("gameOver");
	        	
	        	div1.style.visibility="visible";
	        	
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
    this.colorChange=function()
    {
    	
    	var temp=[];
    	for(i=0;i<=3;i++)
    	{
    		temp[i]=that.colortypeArr[i];
    	}
    	that.colortypeArr[0]=temp[3];
    	for(i=0;i<3;i++)
    	{
    		that.colortypeArr[i+1]=temp[i];
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
         	 
         	if(flag==0)
	       		{
	       			document.getElementById("img"+that.newcurrent[i]).src = that.currenttype;
	       		}
	       		else
	       		{
	       			document.getElementById("img"+that.newcurrent[i]).src = that.colortypeArr[i];
	       		}
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
	    	
	    		if(flag==0)
	       		{
	       			document.getElementById("img"+that.newcurrent[i]).src = that.currenttype;
	       		}
	       		else
	       		{
	       			document.getElementById("img"+that.newcurrent[i]).src = that.colortypeArr[i];
	       		}
	    	that.current[i][0] = that.newcurrent[i];//imgno
	    		
            that.current[i][1] = that.current[i][1]+dir;//shift column no. 
                  

	    }
	 }   			
	    			
	this.callNextPiece=function()
	{
		var type=Math.floor(Math.random()*7);
	    var col=Math.floor(Math.random()*6);
	    
	  
	    	that.makeCurrentBlock(that.nexttypenum,col,0,that.nextcolorArr);
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
	       		if(flag==0)
	       		{
	       		
	       			document.getElementById("img"+that.newcurrent[i]).src = that.currenttype;
	       			
	       		}
	       		else
	       		{
	       			
	       			document.getElementById("img"+that.newcurrent[i]).src = that.colortypeArr[i];
	       			
	       		}
	       		that.current[i][0] = that.newcurrent[i];
	     		that.current[i][2]++; 
	       
	      	} 
	        that.currentorigin[1]++;//increase row used as reference for rotation
	}
	this.movetoTarget=function()
	{	
	
		for(i=0;i<=3;i++)
		{	
			var imgno=that.current[i][0];
			var row=that.current[i][2];
			var temp=imgno;
			var found=0;

			for(j=row;j<vheight-1;j++)
			{
				temp+=hwidth;

				var tests = String(document.getElementById("img"+(temp)).src);
	        	var found = tests.search("blank.png");
	        
	        	if(found>-1)
	        	{
	        		document.getElementById("img"+that.current[i][0]).src="images/blank.png";
	       			that.current[i][0]+=hwidth;
	       			that.current[i][2]++; 
	       			
	       			document.getElementById("img"+that.current[i][0]).src=that.colortypeArr[i]; 
	        
	    		}
	    		row++;
	        }
	       
		}
		
	}
	this.callColorMatchCheck=function()
	{	
		var mine=[];
		for(var j=0;j<=3;j++)
	    {
	    	var atr=that.current[j][2]; 
	    	var atc=that.current[j][1];
	    	var imgno=that.current[j][0];
	    	
			that.checkColorMatchHori(atr,atc,imgno);
			that.checkColorMatchVert(atr,atc,imgno);
			that.checkColorMatchDiag(atr,atc,imgno);
		}
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
	    	if(flag==0)
	    	{	
			that.callRowFilledCheck();
			}
			else
			{
				that.callColorMatchCheck();
			}	
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
		      
		    if(flag==0)
	    	{	
			that.callRowFilledCheck();
			}
			if(flag==1)
			{
				
				that.movetoTarget();
				that.callColorMatchCheck();
			}	
     		
				
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
    	function fadeOutEffect(element)
    	{
    		var fadeTarget =element;
    		var fadeEffect = setInterval(function ()
    		{
        		if (!fadeTarget.style.opacity) 
        		{
            		fadeTarget.style.opacity = 1;
        		}
        		if (fadeTarget.style.opacity < 0.1) 
        		{
            		clearInterval(fadeEffect);
            		
        		}
        		else 
        		{
            		fadeTarget.style.opacity -= 0.1;
        		}
    		}, 10);
    	}
    	for(var k=0;k<that.line.length;k++)
    	{
    	for(var i=0;i<hwidth;i++)
    	{
    		imgno=formula.imagenumber(i,that.line[k]);
    		
		

    		var element=document.getElementById("img"+imgno);
    		fadeOutEffect(element);

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
    	var audio = new Audio('audio/audio1.mp3');
			audio.play();
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
    			document.getElementById("img"+imgno).style.opacity=1;
    		}
    	}
    	}
    	that.line=[];
    } 
    
     this.checkColorMatchHori=function(atr,atc,imageno)
    {
    	var test;
    	var found;
    	var imagenum;
    	var index=0;
    	
    	var str1=String(document.getElementById("img"+imageno).src);

	    found=str1.search("blank.png");
	    if(found == -1)
	   {
    	for(var i=atc+1;i<hwidth;i++)
    	{
    		imagenum=formula.imagenumber(i,atr);
    		var str2=String(document.getElementById("img"+imagenum).src);
    		
    		if(str2.localeCompare(str1)==0)
    		{
    			that.imageToRmv[index]=imagenum;
    			index++;
    		}
    		else
    		{
    			break;
    		}
    	}
    	
    	for(var i=atc-1;i>=0;i--)
    	{
    		imagenum=formula.imagenumber(i,atr);
    		var str2=String(document.getElementById("img"+imagenum).src);
    		if(str2.localeCompare(str1)==0)
    		{
    			that.imageToRmv[index]=imagenum;
    			index++;
    		}
    		else
    		{
    			break;
    		}
    	}
    		
    		if(index>=2)
    		{
    			that.imageToRmv[index ]=imageno;
    			
    			that.removeLineHori();
    		}
    	}
    }
    this.checkColorMatchVert=function(atr,atc,imageno)
    {
    	var test;
    	var found;
    	var imagenum;
    	var index=0;
    	
    	var str1=String(document.getElementById("img"+imageno).src);
  		found=str1.search("blank.png");
	    if(found == -1)
	   	{  	
    	for(var i=atr+1;i<vheight;i++)
    	{
    		imagenum=formula.imagenumber(atc,i);
    		var str2=String(document.getElementById("img"+imagenum).src);
    		
    		if(str2.localeCompare(str1)==0)
    		{
    			that.imageToRmv[index]=imagenum;
    			index++;
    			
    		}
    		else
    		{
    			break;
    		}
    	}
   
    	for(var i=atr-1;i>=0;i--)
    	{
    		imagenum=formula.imagenumber(atc,i);
    		var str2=String(document.getElementById("img"+imagenum).src);
    		if(str2.localeCompare(str1)==0)
    		{
    			that.imageToRmv[index]=imagenum;
    			index++;
    			
    		}
    		else
    		{
    			break;
    		}
    	}
    		
    		if(index>=2)
    		{
    			that.imageToRmv[index]=imageno;
    			 
    			
  				
				
    			that.removeLineVert();
    		}
    	}
    }
   this.checkColorMatchDiag=function(atr,atc,imageno)
   {
   		
    		that.checkColorMatchRightDiag(atr,atc,imageno);
    		that.checkColorMatchLeftDiag(atr,atc,imageno);
   }
   this.checkColorMatchRightDiag=function(atr,atc,imageno)
   {
	   	var test;
	    var found;
	    var imagenum;
	    var index=0;
	    var i;
	    var j;
	    var str1=String(document.getElementById("img"+imageno).src);
	    found=str1.search("blank.png");
	    if(found == -1)
	    {
		   	for( i=atr-1 ,  j=atc+1;i>0 && j<hwidth;i-- , j++)
		   		{
		   			imagenum=formula.imagenumber(j,i);
		    		var str2=String(document.getElementById("img"+imagenum).src);
		    		if(str2.localeCompare(str1)==0)
		    		{
		    			that.imageToRmv[index]=imagenum;
		    			index++;
		    			
		    		}
		    		else
		    		{
		    			break;
		    		}
	   			}
	   		for( i=atr+1 ,  j=atc-1;i<vheight && j>=0;i++ , j--)
	   		{
	   			imagenum=formula.imagenumber(j,i);
	    		var str2=String(document.getElementById("img"+imagenum).src);
	    		if(str2.localeCompare(str1)==0)
	    		{
	    			that.imageToRmv[index]=imagenum;
	    			index++;
	    			
	    		}
	    		else
	    		{
	    			break;
	    		}
	   		}
	   		if(index>=2)
	    		{
	    			that.imageToRmv[index]=imageno;
	    			 
	    			
	  				
					
	    			that.removeLineHori();
	    		}
	    }
   		
   }
   this.checkColorMatchLeftDiag=function(atr,atc,imageno)
   {
   		var test;
    	var found;
    	var imagenum;
    	var index=0;
    	 var i;
	    var j;
	    var str1=String(document.getElementById("img"+imageno).src);
	    found=str1.search("blank.png");
	    if(found == -1)//that image is not blank
	    {
	   		for( i=atr-1 ,  j=atc-1;i>0 && j>=0;i-- , j--)
	   		{
	   			imagenum=formula.imagenumber(j,i);
	    		var str2=String(document.getElementById("img"+imagenum).src);
	    		if(str2.localeCompare(str1)==0)
	    		{
	    			that.imageToRmv[index]=imagenum;
	    			index++;
	    			
	    		}
	    		else
	    		{
	    			break;
	    		}
	   		}
	   		for( i=atr+1 ,  j=atc+1;i<vheight && j<hwidth;i++ , j++)
	   		{
				imagenum=formula.imagenumber(j,i);
	    		var str2=String(document.getElementById("img"+imagenum).src);
	    		if(str2.localeCompare(str1)==0)
	    		{
	    			that.imageToRmv[index]=imagenum;
	    			index++;
	    			
	    		}
	    		else
	    		{
	    			break;
	    		}   			
	   		}

			if(index>=2)
	    		{
	    			that.imageToRmv[index]=imageno;
	    			 
	    			
	  			
					
	    			that.removeLineHori();
	    		}
    	}	
   }
    this.removeLineHori=function()
    {	
    	var col;
    	var rowUp;
    	var imgno;
    	var imgnoUp;
    	that.score+=1;
    	document.getElementById("display-score").innerHTML=that.score;
    		var audio = new Audio('audio/audio1.mp3');
			audio.play();
    	
    		for(var i=0;i<that.imageToRmv.length;i++)
    		{
    			var imgno=that.imageToRmv[i];
    			while(imgno>=hwidth)
    		{
    			
    			 imgnoUp=imgno-hwidth;
    			
    			
    			document.getElementById("img"+imgno).src=document.getElementById("img"+imgnoUp).src;
    			
    			imgno-=hwidth;
    		}
    		}
    	that.imageToRmv=[];
    } 
    this.removeLineVert=function()
    {	
    	var col;
    	var rowUp;
    	var imgno;
    	var imgnoUp;
    	that.score+=1;
    	document.getElementById("display-score").innerHTML=that.score;
    	
    	var attr=Math.max.apply(null, that.imageToRmv);
    	var imgno=attr;
    		var audio = new Audio('audio/audio1.mp3');
			audio.play();
    
    			for(var j=attr;j>=0;j--)
    		{
    			
    			var imgnoUp=imgno-that.imageToRmv.length*hwidth;

    			if(imgno<0)
    			{
    				break;
    			}
    			if(imgnoUp<0)
    			{
    				document.getElementById("img"+imgno).src="images/blank.png";
    			}
    			else
    			{
    				document.getElementById("img"+imgno).src=document.getElementById("img"+imgnoUp).src;
    			}
    			imgno-=hwidth;
    		}
    	
    	that.imageToRmv=[];
    } 
}

		
	    
		
    			
    		
