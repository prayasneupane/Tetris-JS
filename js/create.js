function Create()
{
 
	var that=this;
	
 
 	this.createBoard=function()
 	{
 		var div=document.getElementById("boardWrapper");
		var t = document.createElement("table");
		t.setAttribute("id","table1");
		var counter=0;
		var b = document.createElement("tbody");
		for(var i=0;i<vheight;i++)
		{
				
			var r = document.createElement("TR");
		

			for(var j=0;j<hwidth;j++)// add cell
			{
				var c = document.createElement("TD");
				var img = document.createElement("IMG");
				img.setAttribute("src","images/blank.png");
				img.setAttribute("id","img"+counter); 
				c.appendChild(img);
				
				r.appendChild(c);
				counter++;
			}
			b.appendChild(r);
		}
		t.appendChild(b);

		
		div.appendChild(t);
	}
	this.createShowNextBoard=function()
 	{
 		var div=document.getElementById("showBoardWrapper");
		var t = document.createElement("TABLE");
		t.setAttribute("id","table2")
		var counter=vheight*hwidth;
		var b = document.createElement("tbody");
		for(var i=0;i<4;i++)
		{
				
			var r = document.createElement("TR");
		

			for(var j=0;j<4;j++)// add cell
			{
				var c = document.createElement("TD");
				var img = document.createElement("IMG");
				img.setAttribute("src","images/gray.png");
				img.setAttribute("id","img"+counter); 
				c.appendChild(img);
				
				r.appendChild(c);
				counter++;
			}
			b.appendChild(r);
		}
		t.appendChild(b);

		
		div.appendChild(t);
	}
	
}


	
		
		
		
		













