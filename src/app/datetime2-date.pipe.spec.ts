import { Datetime2DatePipe } from './datetime2-date.pipe';

describe('Datetime2DatePipe', () => {
  it('create an instance', () => {
    const pipe = new Datetime2DatePipe();
    expect(pipe).toBeTruthy();
  });
});
