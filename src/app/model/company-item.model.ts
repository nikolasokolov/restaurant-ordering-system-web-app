export class CompanyItem {
  public id: number;
  public address: string;
  public name: string;
  public phoneNumber: string;
  public logo: ArrayBuffer | string;
  public logoImage: any;

  constructor(id: number, name: string, address: string, phoneNumber: string, logo: ArrayBuffer | string, logoImage: any) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.logo = logo;
    this.logoImage = logoImage;
  }
}
