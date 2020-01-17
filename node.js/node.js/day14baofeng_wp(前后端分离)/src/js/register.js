window.onload = function() {
	// 获取标签
	var zhuce_box = document.getElementById('zhuce_box');
	// 输入框
	var Inps = zhuce_box.getElementsByTagName('input');
	var oIs = zhuce_box.getElementsByTagName('i');
	// 验证码框
	var codeBox = document.getElementById('code_box');
	// 刷新按钮
	var Refresh = document.getElementById('Refresh');
	// 提交
	var submit = document.getElementById('submit');
	// 表单
	var form1 = document.getElementsByTagName('form')[0];
	// 隐藏密码
	var zhuce_pwd = document.getElementById('zhuce-pwd');

	// 验证码生成
	// code(codeBox);
	Refresh.onclick = function() {
		// 获取随机验证码
		// code(codeBox);
		$(codeBox).attr('src', 'http://localhost:3000/register/captcha?id=1');
	};

	// 手机号验证
	Inps[0].onblur = function() {
		var val = Inps[0].value;
		var Reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
		if (Reg.test(val)) {
			oIs[0].innerHTML = '验证成功';
			oIs[0].style.color = 'green';
		} else {
			oIs[0].innerHTML = '输入错误';
			oIs[0].style.color = 'red';
		}
	};

	// 密码验证
	Inps[1].onblur = function() {
		var val = Inps[1].value;
		var Reg = /^[a-zA-Z0-9]{5,10}$/;
		if (Reg.test(val)) {
			oIs[1].innerHTML = '验证成功';
			oIs[1].style.color = 'green';
		} else {
			oIs[1].innerHTML = '输入错误';
			oIs[1].style.color = 'red';
		}
	};

	var val2;
	// 点击把密码改为星号
	zhuce_pwd.onclick = function() {
		var flag = true;
		var val = Inps[1].value;
		var Reg = /^[a-zA-Z0-9]{5,10}$/;
		if (Reg.test(val)) {
			val2 = Inps[1].value;
			Inps[1].value = val.replace(Reg, '******');
			flag = false;
		} else {
			Inps[1].value = val.replace('******', val2);
			flag = true;
		}
	};

	// 验证码验证

	Inps[2].onblur = function() {
		var val = Inps[2].value;
		if (val == codeBox.innerHTML) {
			oIs[2].innerHTML = '验证成功';
			oIs[2].style.color = 'green';
		} else {
			oIs[2].innerHTML = '输入错误';
			oIs[2].style.color = 'red';
		}
	};
	// 短信验证
	Inps[3].onblur = function() {
		var val = Inps[3].value;
		var Reg = /^\d{5}$/;
		if (Reg.test(val)) {
			oIs[3].innerHTML = '验证成功';
			oIs[3].style.color = 'green';
		} else {
			oIs[3].innerHTML = '输入错误';
			oIs[3].style.color = 'red';
		}
	};

	// 提交
	submit.onclick = function() {
		var flag = true;

		for (var i = 0; i < Inps.length; i++) {
			var ii = oIs[i].style.color;
			if (ii != 'green') {
				flag = false;
			}
		}
		if (flag) {
			alert('注册成功');
			form1.submit();
		} else {
			alert('请输入正确信息后再提交');
		}
	};
};
