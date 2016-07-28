window.onload=function(){
	var obgcolor = document.getElementById("bgcolor"),
			ofontSize = document.getElementById("fontSize"),
			ocolor = document.getElementById("color"),
			para = document.querySelector(".para"); 
			

	function populateStorage(){
		var bgcolor = obgcolor.value,
				fontSize = ofontSize.value,
				color = ocolor.value;
		localStorage.setItem("bgcolor",bgcolor);
		localStorage.setItem("fontSize",fontSize);
		localStorage.setItem("color",color);
		setStyle();

	}
	function setStyle(){
		para.style.backgroundColor = localStorage.getItem("bgcolor");
		para.style.fontSize = localStorage.getItem("fontSize");
		para.style.color = localStorage.getItem("color");
	}
	populateStorage();
	obgcolor.onchange = populateStorage;
	ofontSize.onchange = populateStorage;
	ocolor.onchange = populateStorage;

<<<<<<< HEAD

=======
	window.addEventListener("storage", function(){
	  location.reload();
	  alert(0)
	})
>>>>>>> cdf61635bcd2e15d8c4c58f4020e4b99d500221e
}