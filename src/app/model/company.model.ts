export class Company {
  public id: number;
  public address: string;
  public name: string;
  public phoneNumber: string;

  public Company(id: number, address: string, name: string, phoneNumber: string) {
    this.id = id;
    this.address = address;
    this.name = name;
    this.phoneNumber = phoneNumber;
  }
}
