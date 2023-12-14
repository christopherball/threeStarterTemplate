export class Utilities {
  constructor() {}
  static lerp = (a, b, t) => (b - a) * t + a;
  static unlerp = (a, b, t) => (t - a) / (b - a);
  static map = (a1, b1, a2, b2, t) => this.lerp(a2, b2, this.unlerp(a1, b1, t));
}
