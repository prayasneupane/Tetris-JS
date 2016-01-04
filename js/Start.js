var intervalId;
 var make=new MakeBlock();
 var duration=1000;
  
 
function Start()
{
  var inittype=Math.floor(Math.random()*7);
  var initcol=Math.floor(Math.random()*6);
      
	var initcolor=[1,2,3,4];//self initialization at first
  make.makeCurrentBlock(inittype,initcol,0,initcolor);
  make.score=0;
    make.makeNextBlock(inittype);
  
   document.onkeydown = checkKey;
  	function checkKey(e)
  	{

    	e = e || window.event;

    	if (e.keyCode == '38')
      {
        // up arrow
        
        
          make.rotate();
       
    	}
      if(e.keyCode =='32')
      {//space bar
        make.colorChange();
      }
    	else if (e.keyCode == '40') 
      {
        // down arrow
        make.movedown();
    	}
    	else if (e.keyCode == '37')
      {
       // left arrow
       
       	make.movesideways(-1);
       	
    	}
    	else if (e.keyCode == '39') 
      {
       // right arrow
       make.movesideways(1);
    	}
      else if(e.keyCode == '27')
      {
        Pause();
      }

		}
    var flaginterval =0;
		var temp;
  function movedown()
  	{
       
  	  if(make.score%2==0 && make.score !=0 && flaginterval ==0)
      {
        flaginterval = 1;
        
        temp= make.score;
        clearInterval(intervalId);
        duration -=50;        
        intervalId = setInterval(movedown,duration);
      }

      if(make.score>temp && make.score%2==0){
        flaginterval = 0;
      }
  		make.movedown();
     
 	}
intervalId=setInterval(movedown,duration);
	
}
function Pause()
{
  window.clearInterval(intervalId);
  var div1=document.getElementById("pause");
  div1.style.visibility="visible";
}
            

function Resume()
{
  var div1=document.getElementById("pause");
  div1.style.visibility="hidden";
  intervalId=setInterval(make.movedown,1000);
}
function Restart()
{
  clearInterval(intervalId);
  var div=document.getElementById("boardWrapper");
  var div1=document.getElementById("showBoardWrapper");
  var t=document.getElementById("table1");
  var t1=document.getElementById("table2");
  div.removeChild(t);
  div1.removeChild(t1);
   var div1=document.getElementById("pause");
  div1.style.visibility="hidden";

 
  board.createBoard();
  board.createShowNextBoard();
  
  document.getElementById("display-score").innerHTML=0;
  Start();
}
function NewGame()
{
  var div2=document.getElementById("gameOver");
  div2.style.visibility="hidden";
  Restart();
  
  
}
function retMain()
{

  var div=document.getElementById("boardWrapper");
  var div1=document.getElementById("showBoardWrapper");
 
   var t=document.getElementById("table1");
  var t1=document.getElementById("table2");
  div.removeChild(t);
  div1.removeChild(t1);
  var div1=document.getElementById("pause");
  div1.style.visibility="hidden";

   var menu=document.getElementById("interface");
   menu.style.visibility="visible";
     board.createBoard();
  board.createShowNextBoard();
var make=new MakeBlock();
 document.getElementById("display-score").innerHTML=0;
       
}