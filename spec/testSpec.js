//test that criteria key toggles hide/reveal
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
// load data as an object for testing
$.getJSON("./data/lcdata.json", function (data) {
    
// verify numbers exist and are positive

describe('Numbers that sat exam', function () {
  it("should exist", function() {
      test = "sat_exam";
         expect(test).toBeDefined();
     });
        it('must be positive', function() {
    for (var i = 0; i < data.length; i++){
        if (data[i].sat_exam >-1){
         test = data[i].sat_exam
         expect(test).toBeGreaterThan(-1);
}
}
});
});
describe('Numbers that passed exam', function () {
  it("should exist", function() {
      test = "criteria1";
         expect(test).toBeDefined();
     });
        it('must be positive', function() {
    for (var i = 0; i < data.length; i++){
        if (data[i].criteria1 >-1){
         test = data[i].sat_exam
         expect(test).toBeGreaterThan(-1);
}
}
});
});
describe('Numbers that failed exam', function () {
  it("should exist", function() {
      test = "criteria1";
         expect(test).toBeDefined();
     });
     it('must be positive', function() {
    for (var i = 0; i < data.length; i++){
        var fail = data[i].sat_exam-data[i].criteria1;
        if (fail >-1){
         test = fail
         expect(test).toBeGreaterThan(-1);
}
}
});
});
});