function create()
{
var hwidth = 9; //number of columns
var vheight = 15;  //number of rows
var that=this;
this.createboard=function() {
this.dx=1;

var i;

var j;
for (i=0; i<vheight; i++) {
	for (j=0; j<hwidth; j++) {
		document.write("<img src='blank.png'/>");
		}
	document.write("<br/>");
  }
}

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
  
   "red.png",
   "green.png",
   "blue.png"
  ];
// generates the image tag number from col and row
this.imagenumber=function(atcol, atrow) {
   var imagenum = atrow*hwidth + atcol;
   return imagenum;
  }
  this.current=[
  [0,0,0],
  [0,0,0],
  [0,0,0],
  [0,0,0]
  ];
var currentorigin;
var currenttype;
var currentorientation;
var currenttype;
//make a block of type type at column atcol and at row atrow
//used to start off blocks
 this.makeblock=function(type, atcol, atrow) {
   var tests;
   var no;
   
   currentorigin = [atcol, atrow];
   currenttypenum = type;
   currenttype = that.blockimages[2];
   currentorientation = 0;
   var i;
   var block = that.blockimages[type];
   var formula = that.blockformulas[type];
   var imagenum;
   var atc;
   var atr;
   for (i=0;i<=3;i++) {
   atc = atcol + formula[i][0];
   
   atr = atrow + formula[i][1]; 
   imagenum=that.imagenumber(atc, atr);
   //check for room to add block. If none, end game.
         tests = String(document.images[imagenum].src);

         no = tests.search("blank.png");
         console.log(no);
         if (no>=0) {
           document.images[imagenum].src = "blue.png"; 
     that.current[i][0]=imagenum;
     that.current[i][1] = atc;
     that.current[i][2] = atr;
     
         }
         else {
    alert("No room for new block. Game over.");
                break;
         }
    }
   
  }

  
 
 this.move=function()
{

    var i;
   var tests;
   var oksofar = true;
   var imgno;
   var atc;
   var atr;
    var newcurrent = new Array();
    var saved = new Array();
   var found;
  for (i=0; i<=3; i++) {
    imgno = that.current[i][0];
    atc = that.current[i][1];
    atr = that.current[i][2];
 
    if (atr>=(vheight-1)) { //at very bottom already
      //need to signal start of new block
   //block i "+i+" is at bottom;
   var type=Math.floor(Math.random()*6);
   var col=Math.floor(Math.random()*5);
      alert("at bottom");
     that.makeblock(type,col,0);
      oksofar = false;
      break;
      }
    newcurrent[i] = that.imagenumber(atc,atr+1);
    }
 if (oksofar) {
  for (i=0;i<=3; i++) {  //saved image nums & blank out current piece
    saved[i] = that.current[i][0];
    document.images[that.current[i][0]].src = "blank.png";
       } // ends for loop
  for (i=0; i<=3; i++) { //check if any blocking
                  tests = String(document.images[newcurrent[i]].src);
                  found = tests.search("blank.png");
                  if (found == -1) {  // meaning it was not found
                    oksofar = false;
                    break;
                    }  //ends if test
               } //ends for loop
  if (oksofar) {
     for (i=0;i<=3; i++) {
       document.images[newcurrent[i]].src = "blue.png";
       that.current[i][0] = newcurrent[i];
       that.current[i][2]++; // y increases; x stays the same
       
      } //ends for loop
     currentorigin[1]++;
   }  //ends true clause for inner oksofar
  else {
    for (i=0;i<=3; i++) {
      document.images[saved[i]].src = "blue.png";
      
     // signal need to start new falling piece
    }
    var ty=Math.floor(Math.random()*6);
   var co=Math.floor(Math.random()*5);
   
    that.makeblock(ty,co,0);  //ends for loop
   }  //ends else of second oksofar
  }
}
}















