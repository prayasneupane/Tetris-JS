function Formula()
{
this.blockformulas = [
   [[0,0],[1,0],[2,0],[1,1]],  // T shape
   [[0,0],[1,0],[2,0],[3,0]],  //l shape
   [[0,1],[0,2],[1,0],[1,1]],// S shape
   [[0,0],[1,0],[2,0],[2,1]], //L shape  
   [[0,0],[0,1],[1,0],[1,1]], //O shape
   [[0,1],[1,1],[2,0],[2,1]],  //J shape
   [[0,0],[0,1],[1,1],[1,2]] //Z shape
   ];
  this.blockimages = [
  
   "images/red.png",
   "images/green.png",
   "images/blue.png"
  ];
// generates the image tag number from col and row
  this.imagenumber=function(atcol, atrow) {
   var imagenum = atrow*hwidth + atcol;
   return imagenum;
  }
}