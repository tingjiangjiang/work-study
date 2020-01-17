window.onload = function() {
	// 输入框
	var Inps = document.getElementsByTagName('input');
	var login = document.getElementById('login');

	// 用户名验证
	Inps[0].onblur = function() {
		var val = Inps[0].value;
		var Reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$|^(\w+@\w+\.(com|cn|org|edu))$/;
		if (Reg.test(val)) {
			Inps[0].index = 1;
		}
	};

	// 密码验证
	Inps[1].onblur = function() {
		var val = Inps[1].value;
		if (val == '123456') {
			Inps[1].index = 1;
		}
	};

	$(login).on('click', function(event) {
		event.preventDefault();
		$.post('/api/login', { username: '17731148320', password: 'asdfE123' }, function(data) {
			console.log(data);
		});
	});
	// login.onclick = function () {
	//     var flag = true;
	//     for (var i = 0; i < Inps.length; i++) {
	//         if (Inps[i].index != 1) {
	//             flag = false;
	//         }

	//     }

	//     if (flag) {
	//         alert("登录成功");
	//         login.setAttribute("href", "./index.html");
	//     }
	//     else {
	//         alert("用户名或密码错误");
	//     }

	// }
};
