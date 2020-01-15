import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class ExportService {
  constructor(private httpClient: HttpClient) {}

  generateDocumentReport(restaurantId: number): Observable<any> {
    return this.httpClient.post('https://localhost:8080/main/daily-orders/' + restaurantId + '/export', {},
      { responseType: 'arraybuffer'});
  }

}
