(function() {
	var zwf = tools.getByClass(document, 'zwf');
	var inputs = tools.getByTag(document, 'input');
	var prompt = tools.getByClass(document, 'prompt')[0];
	var strong = tools.getByClass(document, 'strong-icon')[0];
	var reflash = tools.getByClass(document, 'reflash')[0];
	var gm = tools.getByClass(document, 'getmessage')[0];
	var pr = tools.getByClass(gm, 'part-right')[0];
	var agree = tools.getByClass(document, 'agree')[0];
	var item = tools.getByTag(agree, 'i')[0];

	for (var i = 0; i < zwf.length; i++) {
		inputs[i].index = i;
		zwf[i].onclick = function() {
			tools.prev(this).focus();
		};
		inputs[i].onfocus = function() {
			tools.next(this).style.display = 'none';
			if (this.name == 'username') {
				prompt.innerHTML = '请输入正确的手机号';
			}
			if (this.name == 'password') {
				prompt.innerHTML = '请输入6-32位英文、数字和符号的组合密码';
			}
			if (this.name == 'yzm') {
				prompt.innerHTML = '请输入右边图片的验证码';
			}
			if (this.name == 'dxyzm') {
				prompt.innerHTML = '请输入正确的短信验证码';
			}
		};

		inputs[i].onblur = function() {
			if (!this.value) {
				tools.next(this).style.display = 'block';
			} else {
				// console.log(this);
				var val = this.value;
				switch (this.name) {
					case 'username':
						reg = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/;
						break;
					case 'password':
						reg = /^\w{6,32}$/;
						break;
				}
				var r = reg.test(val);
				if (r && this.name == 'username') {
					this.flag = 1;
				} else if (!r && this.name == 'username') {
					prompt.innerHTML = '请输入正确的手机号';
					this.flag = 0;
				}
				if (r && this.name == 'password') {
					if (!reg.test(inputs[this.index - 1].value)) {
						prompt.innerHTML = '请输入正确的手机号';
					}
					this.flag = 1;
					if (this.flag == 1 && inputs[this.index - 1].flag == 1) {
						pr.innerHTML = '<a href="#">免费获取短信</a>';
					}
				} else if (!r && this.name == 'username') {
					prompt.innerHTML = '请输入6-32位英文、数字和符号的组合密码';
					this.flag = 0;
				}
			}
			// console.log(this.flag);
		};
	}

	inputs[1].onkeyup = function() {
		reg = /^[0-9a-z]{9,32}$/;
		reg1 = /(?=.*[0-9])(?=.*[a-zA-Z]){6,32}/;
		reg2 = /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,32}/;
		reg3 = /^[a-z0-9_-]{6,32}$/;
		if (!inputs[0].value) {
			prompt.innerHTML = '请输入正确的手机号';
		} else {
			if (reg.test(this.value)) {
				strong.style.background = 'url(images/logoicon.png) -67px -67px no-repeat';
			} else if (reg1.test(this.value)) {
				strong.style.background = 'url(images/logoicon.png) -97px -67px no-repeat';
			} else if (reg2.test(this.value)) {
				strong.style.background = 'url(images/logoicon.png) -127px -67px no-repeat';
			}
		}
	};

	//页面加载时，生成随机验证码
	window.onload = function() {
		createCode(4);
	};

	//生成验证码的方法
	function createCode(length) {
		var code = '';
		var codeLength = parseInt(length); //验证码的长度
		var checkCode = tools.getById('checkCode');
		////所有候选组成验证码的字符，当然也可以用中文的
		var codeChars = new Array(
			0,
			1,
			2,
			3,
			4,
			5,
			6,
			7,
			8,
			9,
			'a',
			'b',
			'c',
			'd',
			'e',
			'f',
			'g',
			'h',
			'i',
			'j',
			'k',
			'l',
			'm',
			'n',
			'o',
			'p',
			'q',
			'r',
			's',
			't',
			'u',
			'v',
			'w',
			'x',
			'y',
			'z',
			'A',
			'B',
			'C',
			'D',
			'E',
			'F',
			'G',
			'H',
			'I',
			'J',
			'K',
			'L',
			'M',
			'N',
			'O',
			'P',
			'Q',
			'R',
			'S',
			'T',
			'U',
			'V',
			'W',
			'X',
			'Y',
			'Z'
		);
		//循环组成验证码的字符串
		for (var i = 0; i < codeLength; i++) {
			//获取随机验证码下标
			var charNum = Math.floor(Math.random() * 62);
			//组合成指定字符验证码
			code += codeChars[charNum];
		}
		if (checkCode) {
			// //为验证码区域添加样式名
			// checkCode.className = "code";
			//将生成验证码赋值到显示区
			checkCode.innerHTML = code;
		}
	}

	//检查验证码是否正确
	inputs[2].onkeyup = function() {
		//获取显示区生成的验证码
		var checkCode = tools.getById('checkCode').innerHTML;
		//获取输入的验证码
		var inputCode = inputs[2].value;
		// console.log(inputCode);
		if (inputCode.length <= 0) {
			prompt.innerHTML = '请输入正确的验证码';
		} else if (inputCode.length >= 4 && inputCode.toUpperCase() != checkCode.toUpperCase()) {
			prompt.innerHTML = '验证码错误';
			this.flag = 0;
			createCode(4);
		} else {
			prompt.innerHTML = '验证码正确';
			this.flag = 1;
		}
	};

	reflash.onclick = function() {
		this.style.background = 'url(images/logoicon.png) -150px -30px no-repeat';
		createCode(4);
	};
	reflash.onmouseleave = function() {
		this.style.background = 'url(images/logoicon.png) -120px -30px no-repeat';
	};

	agree.flag = 0;
	agree.onclick = function() {
		if (this.flag == 0) {
			item.style.background = 'url(images/logoicon.png) -20px -66px no-repeat';
			this.flag = 1;
		} else {
			item.style.background = 'url(images/logoicon.png) 0 -66px no-repeat';
			this.flag = 0;
		}
	};
})();
