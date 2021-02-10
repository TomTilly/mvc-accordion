console.log('it works');

function test(testArg = 'hello') {
  return function () {
    console.log(testArg);
  };
}

test()();
