function Start()
{
	
	 var make=new MakeBlock();
  make.makeblock(3,2,0);

  function move()
  {
  make.move();
  
 }
 setInterval(move,200);
	
}