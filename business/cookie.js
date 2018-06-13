export const cookie = {
	get (name) {
	  let cookies = document.cookie.split('; ');
	  for (let cookie of cookies) {
	  	let [key, value] = cookie.split('=');
	  	if (key === name) {
	  		return value;
	  	}
	  }
	},
	set (name, value, exDays) {
		let cookie = name + '=' + value;
		if (exDays) {
			let d = new Date();
			d.setTime(+d + exDays * 1000 * 3600 * 24);
			cookie +=  ';expires=' + d.toGMTString();
		}
		document.cookie = cookie;
	},
	remove (name) {
		this.set(name, '', -1);
	},
	parse() {
		return document.cookie.split('; ').reduce((pre, next) => {
			let [key, value] = next.split('=');
			pre[key] = value;
			return pre;
		}, {});
	}
}
