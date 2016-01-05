function Formula()
{
this.blockformulas = [
   [
   [[0,0],[0,1],[0,2],[1,1]],//(row,col) with respect to origin(0,0)
   [[0,1],[1,0],[1,1],[2,1]],
   [[0,1],[1,0],[1,1],[1,2]],//four orientations for T shape
   [[1,0],[2,0],[3,0],[2,1]]
   ],  // T shape ok
   [
   [[0,1],[1,1],[2,1],[3,1]],
   [[1,0],[1,1],[1,2],[1,3]],
   [[0,2],[1,2],[2,2],[3,2]],
   [[2,0],[2,1],[2,2],[2,3]]
   ],  //l shape ok
   [
   [[0,1],[0,2],[1,0],[1,1]],
   [[0,1],[1,1],[1,2],[2,2]],
   [[1,1],[1,2],[2,0],[2,1]],
   [[0,0],[1,0],[1,1],[2,1]]
   ],// S shape ok
   [
   [[0,1],[1,1],[2,1],[3,1]],
   [[1,0],[1,1],[1,2],[1,3]],
   [[0,2],[1,2],[2,2],[3,2]],
   [[2,0],[2,1],[2,2],[2,3]]
   ], //L shape  ok
   [
   [[0,0],[0,1],[1,0],[1,1]],
   [[0,0],[0,1],[1,0],[1,1]],
   [[0,0],[0,1],[1,0],[1,1]],
   [[0,0],[0,1],[1,0],[1,1]],
   ], //O shape ok
   [
   [[0,1],[1,1],[2,0],[2,1]],
   [[1,0],[2,0],[2,1],[2,2]],
   [[0,1],[1,1],[2,1],[0,2]],
   [[1,0],[1,1],[1,2],[2,2]],
   ],  //J shape ok
   [
   [[0,0],[0,1],[1,1],[1,2]],
   [[0,2],[1,1],[1,2],[2,1]],
   [[1,0],[1,1],[2,1],[2,2]],
   [[0,1],[1,0],[1,1],[2,0]]
   ] //Z shape ok
   ];
  this.blockimages = [
  
   "images/red.png",
   "images/green.png",
   "images/blue.png",
   "images/clay.png",
   "images/brinjal.png",
   "images/yellow.png",
   "images/skyblue.png",
  ];
//  generates the image id number from col and row
  this.imagenumber=function(atcol, atrow) {
   var imagenum = atrow*(hwidth) + atcol;
   return imagenum;
  }
  this.imagenumberdiff=function(atcol, atrow)//different for next peice
   {
   var imagenum = atrow*(4) + atcol;
   return imagenum;
  }
  

}