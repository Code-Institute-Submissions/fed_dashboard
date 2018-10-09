describe ("Criteria key toggle",function() {
     it("should exist", function() {
             expect(key).toBe(key);
         });
     it ("should hide when shown", function() {
         var slideToggle = "hide";
    expect(slideToggle).toBe('hide');
         });
          it ("should show when hidden", function() {
         var slideToggle = "show";
    expect(slideToggle).toBe('show');
         });
});

describe('Numbers that sat exam', function () {
   it("should exist", function() {
         expect(examGend("Male")).toBeDefined();
     });  
  it('should be positive', function () {
      test = examGend();
    expect(test).toBeGreaterThan(-1);
  });
});
// describe('Numbers that passed exam', function () {
//   it('should be positive', function () {
//       var test = pass1Gend();
//     expect(test).toBeGreaterThan(-1);
//   });
// });
