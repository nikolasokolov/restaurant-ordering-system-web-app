import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class ExportService {
  constructor(private httpClient: HttpClient) {}

  generateDocumentReport(restaurantId: number): Observable<any> {

    let headers = new HttpHeaders();
    headers.append('Accept', 'application/pdf');
    let requestOptions: any = { headers: headers, responseType: 'blob' };

    return this.httpClient.post('https://localhost:8080/main/daily-orders/' + restaurantId + '/export', '', requestOptions)
      .pipe(map((response)=>{
        return {
          filename: 'dailyOrdersReport.pdf',
          data: new Blob([response], {type: 'application/pdf'})
        };
    }));
  }

}
