const DynamicForm = () => {
  return <div>dynDmic-foF</div>;
};

const user = {
  fn() {
    // console.log('=== ===>', this);
    setTimeout(() => {
      console.log('=== setTimeout  ===>', this);
    });
  },
};

// user.fn();
// const newFN = user.fn;
// newFN();

// setTimeout(() => {
//   console.log('=== ===>', this);
// });

// class MyClass {
//   name: string;
//   constructor(name: string) {
//     this.name = name;
//   }
//   greet1 = () => {
//     setTimeout(() => {
//       console.log(this);
//     });
//   };
// }
// const instance = new MyClass('Alice');
// instance.greet1(); //

export default DynamicForm;
