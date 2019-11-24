export class Company {
  public id: number;
  public address: string;
  public name: string;
  public phoneNumber: string;

  constructor(address: string, name: string, phoneNumber: string) {
    this.address = address;
    this.name = name;
    this.phoneNumber = phoneNumber;
  }
}
