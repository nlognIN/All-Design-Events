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

	    var random_pad = Math.floor(Math.random() * (9999 - 1000) + 9000)
	 	return str +'-'+ random_pad.toString();
	}
}
