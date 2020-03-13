// var obj = {
// 		id: "a",
// 		cool: function coolFn() {
// 			var that = this
// 		console.log( that.id );
// 		}
// 		};
// 		var id = "b"
// 		obj.cool(); // a
// 		setTimeout( obj.cool, 100 ); // b
var fn;
function foo() {
  var a = 2;
  function baz() {
    console.log(a);
  }
  fn = baz;
}
function bar() {
  fn();
}

foo();
bar(); // 2
