import { AwearPage } from './app.po';

describe('awear App', () => {
  let page: AwearPage;

  beforeEach(() => {
    page = new AwearPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
