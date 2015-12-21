function create()
{
 
	var that=this;
	this.createboard=function() 
	{

	var i;

	var j;
	for (i=0; i<vheight; i++)
	{
		for (j=0; j<hwidth; j++)
		{
			document.write("<img src='images/blank.png'/>");
		}
			document.write("<br/>");
  	}

    }
	this.makeShowTable=function()
	{//create table
		for (i=0; i<4; i++) 
		{
			for (j=0; j<4; j++) 
			{
				document.write("<img src='images/blank.png'/>");
			}
				document.write("<br/>");
  		}
	}
 
 
}















