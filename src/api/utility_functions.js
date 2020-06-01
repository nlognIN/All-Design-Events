var crypto = require('crypto');
module.exports = {

	generate_slug:function(str){

		str = str.replace(/^\s+|\s+$/g, ''); // trim the white spaces at the begning
	  	str = str.toLowerCase();

	  // remove accents, swap ñ for n, etc
	  	var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
	  	var to   = "aaaaaeeeeeiiiiooooouuuunc------";
	  	
	  	for (var i=0, l=from.length ; i<l ; i++) {
	    	str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	  	}

	  	str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
	    	.replace(/\s+/g, '-') // collapse whitespace and replace by -
	    	.replace(/-+/g, '-'); // collapse dashes

	    var hash = crypto.createHash('md5').update(str).digest('hex')
	 	return str +'-'+ hash.slice(0,6);
	},



	current_date:function(){
		var today = new Date();

		var dd = today.getDate();
		var mm = today.getMonth()+1; 
		var yyyy = today.getFullYear();
		
		if(dd<10) 
    		dd='0'+dd;
	

		if(mm<10) 
    		mm='0'+mm;
	 
		today = dd+'/'+mm+'/'+yyyy;

		return today;
	}
}
