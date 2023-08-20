import { ChangeImageSizePipe } from './change-image-size.pipe';

describe('ChangeImageSizePipe', () => {
  const pipe = new ChangeImageSizePipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms image url to have 200 as width and height', () => {
    expect(pipe.transform('https://picsum.photos/id/12/2500/1667')).toBe('https://picsum.photos/id/12/200');
  });

});
