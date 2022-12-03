import { QuantityMaskPipe } from './quantity.pipe';

describe('QuantityMaskPipe', () => {
  it('create an instance', () => {
    const pipe = new QuantityMaskPipe();
    expect(pipe).toBeTruthy();
  });
});
