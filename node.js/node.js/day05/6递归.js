/*
    权限:所有权限，销售的增删改查权限，用户的增删改成权限，报表的统计权限...
    角色:超级管理员，普通管理员，销售人员，老板
    用户:admin,root,zhnangsan,boss

    每个不同的角色拥有不同的权限
    每个用户又拥有不同的角色

    用户登录成功后，后台返回token（可选）和用户权限列表
*/
// 递归要符合两个要素：
/*
    1、规模要越来越小（越来越接近出口）
    2、一定要有出口
*/
// 递归求阶乘
// 5! = 5 * 4!;4! = 4 * 3!...
// f(n) = n * f(n-1)
// function Factorial(n) {
// 	if (n == 1 || n == 2) {
// 		return n;
// 	} else {
// 		return n * Factorial(n - 1);
// 	}
// }
// console.log(Factorial(5));

// 递归求菲波那切数列
//  F(n)=F(n-1)+F(n-2)（n>=3，n∈N*）
// function Fibonacci(n) {
// 	if (n == 1 || n == 2) {
// 		return 1;
// 	} else {
// 		return Fibonacci(n - 1) + Fibonacci(n - 2);
// 	}
// }
// console.log(Fibonacci(7));
