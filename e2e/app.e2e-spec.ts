import { Sitzplan2017Page } from './app.po';

describe('sitzplan2017 App', function() {
  let page: Sitzplan2017Page;

  beforeEach(() => {
    page = new Sitzplan2017Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
