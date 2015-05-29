'use strict';

describe('about route', function () {

  beforeEach(function () {
    browser.get('/about');
  });

  it('should have a basic content', function () {
    expect(element.all(by.css('div')).first().getText()).toBe('AboutCtrl');
  });

});
