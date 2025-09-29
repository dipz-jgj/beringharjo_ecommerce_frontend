// Abstact Class
export abstract class BaseEntity {
  protected id: string;
  protected createdAt: Date;

  constructor(id: string) {
    this.id = id;
    this.createdAt = new Date();
  }

  abstract getInfo(): string;

  // Static member
  static generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
